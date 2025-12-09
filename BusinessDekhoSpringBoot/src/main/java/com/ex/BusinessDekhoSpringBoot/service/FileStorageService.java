package com.ex.BusinessDekhoSpringBoot.service;


import com.ex.BusinessDekhoSpringBoot.exception.FileStorageException;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(@Value("${file.upload-dir}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir)
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create upload directory!", ex);
        }
    }

    public String storeFile(MultipartFile file, boolean cropImage) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (fileName.contains("..")) {
                throw new FileStorageException("Invalid file path: " + fileName);
            }

            String fileExtension = "";
            int lastDotIndex = fileName.lastIndexOf('.');
            if (lastDotIndex > 0) {
                fileExtension = fileName.substring(lastDotIndex);
            }

            String newFileName = UUID.randomUUID().toString() + fileExtension;
            Path targetLocation = this.fileStorageLocation.resolve(newFileName);

            if (cropImage && isImageFile(fileName)) {
                BufferedImage croppedImage = cropAndResizeImage(file, 450, 350);
                saveImage(croppedImage, targetLocation, fileExtension);
            } else {
                Files.copy(file.getInputStream(), targetLocation,
                        StandardCopyOption.REPLACE_EXISTING);
            }

            return newFileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName, ex);
        }
    }

    private boolean isImageFile(String fileName) {
        String lowerCaseFileName = fileName.toLowerCase();
        return lowerCaseFileName.endsWith(".jpg") ||
                lowerCaseFileName.endsWith(".jpeg") ||
                lowerCaseFileName.endsWith(".png") ||
                lowerCaseFileName.endsWith(".gif");
    }

    private BufferedImage cropAndResizeImage(MultipartFile file, int targetWidth,
                                             int targetHeight) throws IOException {
        BufferedImage originalImage = ImageIO.read(file.getInputStream());

        // Resize to target dimensions while maintaining aspect ratio
        BufferedImage resizedImage = Scalr.resize(originalImage,
                Scalr.Method.QUALITY,
                Scalr.Mode.FIT_TO_WIDTH,
                targetWidth,
                targetHeight,
                Scalr.OP_ANTIALIAS);

        // If needed, crop to exact dimensions
        if (resizedImage.getWidth() > targetWidth ||
                resizedImage.getHeight() > targetHeight) {
            resizedImage = Scalr.crop(resizedImage,
                    targetWidth,
                    targetHeight);
        }

        return resizedImage;
    }

    private void saveImage(BufferedImage image, Path targetLocation,
                           String fileExtension) throws IOException {
        String formatName = fileExtension.substring(1).toUpperCase();
        if (formatName.equals("JPG")) {
            formatName = "JPEG";
        }

        ImageIO.write(image, formatName, targetLocation.toFile());
    }

    public void deleteFile(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            throw new FileStorageException("Could not delete file " + fileName, ex);
        }
    }
}