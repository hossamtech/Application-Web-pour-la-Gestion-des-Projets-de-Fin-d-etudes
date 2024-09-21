package com.soutLink.file;

import com.soutLink.user.User;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.io.File.separator;
import static java.lang.System.currentTimeMillis;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileStorageService {

    @Value("${application.file.upload.photos-output-path}")
    private String fileUploadPath;

    public String saveFile(
            @NonNull Object sourceFile,
            @NonNull User user,
            @NonNull String folder) {

        String fileUploadSubPath = "users" + separator + capitalizeFirstLetter(user.getFirstName()) + "_" +
                capitalizeFirstLetter(user.getLastName()) + "_" + user.getId() + separator + folder;

        if (sourceFile instanceof MultipartFile) {
            return uploadFile((MultipartFile) sourceFile, fileUploadSubPath);
        } else if (sourceFile instanceof byte[]) {
            return uploadFile((byte[]) sourceFile, fileUploadSubPath);
        } else {
            throw new IllegalArgumentException("Unsupported file type");
        }
    }

    private String uploadFile(
            @NonNull MultipartFile sourceFile,
            @NonNull String fileUploadSubPath) {

        final String finalUploadPath = fileUploadPath + separator + fileUploadSubPath;
        File targetFolder = new File(finalUploadPath);
        if (!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdirs();
            if (!folderCreated) {
                log.warn("Failed to create the target folder");
                return null;
            }
        }

        String originalFilename = sourceFile.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            log.warn("Original filename is missing");
            return null;
        }

        String sanitizedFilename = sanitizeFilename(originalFilename);

        // Create target path using the sanitized filename
        String targetFilePath = finalUploadPath + separator + sanitizedFilename;
        Path targetPath = Paths.get(targetFilePath);

        try {
            Files.write(targetPath, sourceFile.getBytes());
            log.info("File saved to " + targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("File was not saved", e);
        }
        return null;
    }

    private String uploadFile(
            byte @NonNull [] imageBytes,
            @NonNull String fileUploadSubPath) {

        final String finalUploadPath = fileUploadPath + separator + fileUploadSubPath;
        File targetFolder = new File(finalUploadPath);
        if (!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdirs();
            if (!folderCreated) {
                log.warn("Failed to create the target folder");
                return null;
            }
        }

        String fileExtension = "jpg"; // Assume jpg for simplicity or dynamically detect if needed
        String targetFilePath = finalUploadPath + separator + currentTimeMillis() + "." + fileExtension;
        Path targetPath = Paths.get(targetFilePath);

        try {
            Files.write(targetPath, imageBytes);
            log.info("File saved to " + targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("File was not saved", e);
        }
        return null;
    }


    private String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return "";
        }
        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex == -1) {
            return "";
        }
        return fileName.substring(lastDotIndex + 1).toLowerCase();
    }

    private String capitalizeFirstLetter(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        return input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
    }

    private String sanitizeFilename(String filename) {
        // Replace illegal characters with an underscore or other safe character
        return filename.replaceAll("[^a-zA-Z0-9._-]", "_");
    }
}
