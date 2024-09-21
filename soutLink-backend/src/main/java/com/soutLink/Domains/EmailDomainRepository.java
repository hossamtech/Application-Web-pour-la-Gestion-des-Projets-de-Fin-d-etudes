package com.soutLink.Domains;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailDomainRepository extends JpaRepository<EmailDomain, Long> {

    Optional<EmailDomain> findEmailDomainByDomain(String domain);
}
