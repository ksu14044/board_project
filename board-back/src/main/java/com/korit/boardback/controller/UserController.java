package com.korit.boardback.controller;

import com.korit.boardback.security.principal.PrincipalUser;
import com.korit.boardback.service.EmailService;
import com.korit.boardback.service.FileService;
import com.korit.boardback.service.UserService;
import jakarta.mail.MessagingException;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    @GetMapping("/user/me")
    public ResponseEntity<?> getLoginUser(@AuthenticationPrincipal PrincipalUser principalUser) {
//        PrincipalUser principalUser1 =
//                (PrincipalUser) SecurityContextHolder
//                        .getContext()
//                        .getAuthentication()
//                        .getPrincipal();
//
//        int userId = principalUser.getUser().getUserId();
        if(principalUser.getUser().getProfileImg() == null) {
            principalUser.getUser().setProfileImg("default.png");
        }
        return ResponseEntity.ok().body(principalUser.getUser());
    }
    @PostMapping("/user/profile/img")
    public ResponseEntity<?> changeProfileImg(@AuthenticationPrincipal PrincipalUser principalUser, @RequestPart MultipartFile file) {
        userService.updateProfileImg(principalUser.getUser(), file);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/user/profile/nickname")
    public ResponseEntity<?> changeNickname(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody Map<String, String> requestBody
            ) {
        String nickname = requestBody.get("nickname");
        userService.updateNickname(principalUser.getUser(), nickname);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/user/profile/password")
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody Map<String, String> requestBody
    ) {
        String password = requestBody.get("password");
        userService.updatePassword(principalUser.getUser(), password);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/user/profile/email/send")
    public ResponseEntity<?> sendEmailChangeVerification(
            @RequestBody Map<String, String> requestBody
    ) throws MessagingException {
        String email = requestBody.get("email");
        String code = emailService.generateEmailCode();
        emailService.sendChangeEmailVerification(email, code);
        return ResponseEntity.ok().body(code);
    }

    @PutMapping("/user/profile/email")
    public ResponseEntity<?> changeEmail(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody Map<String, String> requestBody
    ) {
        String email = requestBody.get("email");
        userService.updateEmail(principalUser.getUser(), email);
        return ResponseEntity.ok().build();
    }
}
