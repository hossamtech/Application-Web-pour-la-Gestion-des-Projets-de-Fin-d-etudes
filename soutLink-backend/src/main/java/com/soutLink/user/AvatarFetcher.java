package com.soutLink.user;

import com.soutLink.file.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import kong.unirest.HttpResponse;
import kong.unirest.Unirest;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Random;



@RequiredArgsConstructor
@Slf4j
@Component
public class AvatarFetcher {

    @Value("${api.avatar.key}")
    private String API_KEY;

    private final FileStorageService fileStorageService;


    public String generateDefaultProfileImg(User user) throws IOException {
        String imageUrl = getImageUrl(user);

        HttpResponse<byte[]> response = Unirest.get(imageUrl).asBytes();

        if (response.getStatus() == 200 && response.getBody() != null) {
            byte[] imageData = response.getBody();

            String savedFilePath = fileStorageService.saveFile(imageData, user, "profileImg");

            if (savedFilePath != null) {
                return savedFilePath;
            } else {
                log.warn("Failed to save avatar image.");
                return null;
            }
        } else {
            log.warn("Failed to fetch avatar image. HTTP status code: " + response.getStatus());
            return saveFallbackProfileImage(user);

        }
    }

    private String getImageUrl(User user) {
        String[] colors = {"335eea", "f39c12", "8e44ad", "1abc9c", "2ecc71"};

        Random random = new Random();
        String backgroundColor = colors[random.nextInt(colors.length)];

        return String.format("https://avatars.abstractapi.com/v1?api_key=%s&name=%s%%20%s&image_size=512&font_size=0.67&background_color=%s",
                API_KEY, user.getFirstName(), user.getLastName(), backgroundColor);
    }

    private String saveFallbackProfileImage(User user) throws IOException {
        Resource resource = new ClassPathResource("static/profile.png");
        byte[] imageData = Files.readAllBytes(resource.getFile().toPath());

        String savedFilePath = fileStorageService.saveFile(imageData, user, "profileImg");

        if (savedFilePath != null) {
            return savedFilePath;
        } else {
            log.warn("Failed to save default profile image.");
            return null;
        }
    }
}