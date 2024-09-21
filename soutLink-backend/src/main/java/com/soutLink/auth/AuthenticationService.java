package com.soutLink.auth;

import com.soutLink.Domains.EmailDomainRepository;
import com.soutLink.Domains.EmailUtil;
import com.soutLink.email.EmailService;
import com.soutLink.email.EmailTemplateName;
import com.soutLink.enums.SummaryStatus;
import com.soutLink.enums.UserRole;
import com.soutLink.exception.ActivationTokenException;
import com.soutLink.exception.EmailAlreadyExistsException;
import com.soutLink.exception.OperationNotPermittedException;
import com.soutLink.file.FileUtils;
import com.soutLink.security.JwtService;
import com.soutLink.supervisor.project.ListProjects;
import com.soutLink.supervisor.project.ListProjectsRepository;
import com.soutLink.user.AvatarFetcher;
import com.soutLink.user.Student.Student;
import com.soutLink.user.Supervisor.Supervisor;
import com.soutLink.user.Token.Token;
import com.soutLink.user.Token.TokenRepository;
import com.soutLink.user.User;
import com.soutLink.user.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;
    private final ListProjectsRepository listProjectsRepository;
    private final EmailDomainRepository emailDomainRepository;
    private final AvatarFetcher avatarFetcher;


    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;

    public void register(RegistrationRequest request)
            throws MessagingException, IOException {


        String domain = EmailUtil.getDomain(request.getEmail());
        var emailDomain = emailDomainRepository.findEmailDomainByDomain(domain)
                .orElseThrow(() -> new OperationNotPermittedException("Domain not exist!"));

        UserRole role = mapRoleType(emailDomain.getRoleType());
        if (request.getTypeForm() != role) {
            throw new EmailAlreadyExistsException("Enter your email as a " + request.getTypeForm() .toString().toLowerCase());
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email is already registered");
        }


        User user = switch (role) {
            case ETUDIANT -> Student.builder()
                    .email(request.getEmail())
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .apogeeCode(request.getApogeeCode())
                    .sector(request.getSector())
                    .userRole(UserRole.ETUDIANT)
                    .profileImg(null)
                    .enabled(false)
                    .accountLocked(false)
                    .build();
            case ENCADRANT -> Supervisor.builder()
                    .email(request.getEmail())
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .department(request.getDepartment())
                    .userRole(UserRole.ENCADRANT)
                    .profileImg(null)
                    .enabled(false)
                    .accountLocked(false)
                    .build();
            default -> throw new IllegalStateException("Unexpected role: " + role);
        };

        String profileImgPath = avatarFetcher.generateDefaultProfileImg(userRepository.save(user));

        user.setProfileImg(profileImgPath);
        User createdUser = userRepository.save(user);


        if (role == UserRole.ENCADRANT) {
            Supervisor supervisor = (Supervisor) createdUser;
            var summary = ListProjects.builder()
                    .status(SummaryStatus.Pending)
                    .supervisor(supervisor)
                    .build();
            listProjectsRepository.save(summary);
        }

        sendValidationEmail(user);

    }



    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var claims = new HashMap<String, Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("userRole", user.getUserRole());

        var jwtToken = jwtService.generateToken(claims, (User) auth.getPrincipal());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public UserDetailsResponse getUserDetails(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        return userRepository.findByEmail(user.getEmail())
                .map(userEntity -> UserDetailsResponse.builder()
                        .firstName(userEntity.getFirstName())
                        .lastName(userEntity.getLastName())
                        .fullName(userEntity.getFullName())
                        .email(userEntity.getEmail())
                        .profileImg(FileUtils.readFileFromLocation(userEntity.getProfileImg()))
                        .build())
                .orElseThrow(() -> new EntityNotFoundException("No user found with the email: " + user.getEmail()));

    }

    public void activateAccount(String token) throws MessagingException {
        if (token.equals("number")) {
            throw new ActivationTokenException("You will be enter the code sent in your email");
        }
        Token savedToken = tokenRepository.findByToken(token)
                // todo exception has to be defined
                .orElseThrow(() -> new ActivationTokenException("Invalid token"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiredAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new ActivationTokenException("Activation token has expired. A new token has been send to the same email " +
                    "address");
        }

        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);

        emailService.sendEmail(
                user.getEmail(),
                user.getFullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateAndSaveActivationToken(User user) {
        // Generate a token
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiredAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);

        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }

    public UserRole mapRoleType(String roleType) {
        return switch (roleType.toUpperCase()) {
            case "ETUDIANT" -> UserRole.ETUDIANT;
            case "ENCADRANT" -> UserRole.ENCADRANT;
            default -> throw new IllegalArgumentException("Unknown role type: " + roleType);
        };
    }
}
