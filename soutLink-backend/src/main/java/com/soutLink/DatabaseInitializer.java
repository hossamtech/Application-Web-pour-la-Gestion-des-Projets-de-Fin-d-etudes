//package com.soutLink;
//
//import jakarta.persistence.EntityManager;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//
//@Component
//public class DatabaseInitializer implements CommandLineRunner {
//
//    private final EntityManager entityManager;
//
//    public DatabaseInitializer(EntityManager entityManager) {
//        this.entityManager = entityManager;
//    }
//
//    @Override
//    @Transactional
//    public void run(String... args) {
//        entityManager.createNativeQuery(
//                "INSERT INTO email_domain (domain, role_type) VALUES ('etu.uae.ac.ma', 'ETUDIANT'), ('uae.ac.ma', 'ENCADRANT') " +
//                        "ON DUPLICATE KEY UPDATE domain=VALUES(domain), role_type=VALUES(role_type)"
//        ).executeUpdate();
//    }
//}
