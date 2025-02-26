package com.korit.boardback.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class FileService {

    @Value("${user.dir}")
    private String rootPath;

    public String saveFile(String path, MultipartFile file) {
        if(file.isEmpty()) {
            return null;
        }
        String newFileName = null;
        try {
            String originFileName = file.getOriginalFilename();
            newFileName = UUID.randomUUID().toString().replaceAll("-", "") + "_" + originFileName;
            File newFilePath = new File(rootPath + "/" + path);
            if(!newFilePath.exists()) {
                newFilePath.mkdirs();
            }
            System.out.println("rootPath:" +rootPath);
            System.out.println("path: " + path);
            System.out.println("newFileName: "+newFileName);
            File newFile = new File(rootPath + "/" + path + "/" + newFileName);
            file.transferTo(newFile);

        } catch ( Exception e ) {
            e.printStackTrace();
        }
        return newFileName;
    }

    public void deleteFile(String path) {
        File file = new File(rootPath + "/" + path);
        if(file.exists()) {
            file.delete();
        }
    }
}
