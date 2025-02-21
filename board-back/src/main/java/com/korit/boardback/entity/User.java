package com.korit.boardback.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int userId;
    private String userName;
    private String password;
    private String email;
    private String nickname;
    private String oauth2Name;
    private String oauth2Provider;
    private int accountExpired;
    private int accountLocked;
    private int credentialsExpired;
    private int accountEnabled;
    private LocalDateTime createdAt;
}
