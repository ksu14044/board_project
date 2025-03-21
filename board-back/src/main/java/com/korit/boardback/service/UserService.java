package com.korit.boardback.service;

import com.korit.boardback.dto.request.ReqJoinDto;
import com.korit.boardback.dto.request.ReqLoginDto;
import com.korit.boardback.entity.User;
import com.korit.boardback.entity.UserRole;
import com.korit.boardback.exception.DuplicatedValueException;
import com.korit.boardback.exception.FieldError;
import com.korit.boardback.repository.UserRepository;
import com.korit.boardback.repository.UserRoleRepository;
import com.korit.boardback.security.jwt.JwtUtil;
import io.swagger.v3.oas.annotations.media.Schema;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.NotAcceptableStatusException;

import java.util.Date;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private FileService fileService;

    @Autowired
    private EmailService emailService;

    public User getUserByUsername(String username) throws Exception {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("사용자를 찾지 못했습니다."));
    }

    public boolean duplicatedUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    @Transactional(rollbackFor = Exception.class)
    public User join(ReqJoinDto reqJoinDto) {
        if(duplicatedUsername(reqJoinDto.getUsername())) {
            throw new DuplicatedValueException(List.of(FieldError.builder()
                            .field("username")
                            .message("이미 존재하는 사용자 이름입니다.")
                            .build()));
        }
        User user = User.builder()
                .username(reqJoinDto.getUsername())
                .password(bCryptPasswordEncoder.encode(reqJoinDto.getPassword()))
                .email(reqJoinDto.getEmail())
                .nickname(reqJoinDto.getUsername())
                .accountExpired(1)
                .accountLocked(1)
                .credentialsExpired(1)
                .accountEnabled(0)
                .build();
        userRepository.save(user);
        UserRole userRole = UserRole.builder()
                .userId(user.getUserId())
                .roleId(1)
                .build();
        userRoleRepository.save(userRole);
        try{
            emailService.sendAuthMail(reqJoinDto.getEmail(), reqJoinDto.getUsername());
        } catch (Exception e) {
            e.printStackTrace();
        }
       return  user;
    }

    public String login(ReqLoginDto reqLoginDto) {

        User foundUser = userRepository.findByUsername(reqLoginDto.getUsername()).orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        if(!bCryptPasswordEncoder.matches(reqLoginDto.getPassword(), foundUser.getPassword())) {
            throw new BadCredentialsException("사용자를 찾을 수 없습니다.");
        }
        // 이메일 인증 여부 확인
        if(foundUser.getAccountEnabled() == 0) {
            throw new DisabledException("이메일 인증이 필요합니다.");
        }
        Date expires = new Date(new Date().getTime() + 1000l * 60 * 60 * 24 * 7);


        return jwtUtil.generateToken(
                foundUser.getUsername(),
                Integer.toString(foundUser.getUserId()),
                expires);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateProfileImg(User user, MultipartFile file) {
        final String PROFILE_IMG_FILE_PATH = "/upload/user/profile";
        String saveFileName = fileService.saveFile(PROFILE_IMG_FILE_PATH, file);
        userRepository.updateProfileImg(user.getUserId(), saveFileName);
        if(user.getProfileImg() == null) { return; }
        fileService.deleteFile(PROFILE_IMG_FILE_PATH + "/" + user.getProfileImg());
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateNickname(User user, String nickname) {
        userRepository.updateNickname(user.getUserId(), nickname);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updatePassword(User user, String password) {
        String encodedPassword = bCryptPasswordEncoder.encode(password);
        userRepository.updatePassword(user.getUserId(), encodedPassword);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateEmail(User user, String email) {
        userRepository.updateEmail(user.getUserId(), email);
    }
}
