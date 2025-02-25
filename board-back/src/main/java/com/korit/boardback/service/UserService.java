package com.korit.boardback.service;

import com.korit.boardback.dto.request.ReqJoinDto;
import com.korit.boardback.dto.request.ReqLoginDto;
import com.korit.boardback.entity.User;
import com.korit.boardback.exception.DuplicatedValueException;
import com.korit.boardback.exception.FieldError;
import com.korit.boardback.repository.UserRepository;
import io.swagger.v3.oas.annotations.media.Schema;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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
                .password(reqJoinDto.getPassword())
                .email(reqJoinDto.getEmail())
                .nickname(reqJoinDto.getUsername())
                .accountExpired(1)
                .accountLocked(1)
                .credentialsExpired(1)
                .accountEnabled(1)
                .build();

       return  userRepository.save(user);
    }

    public User login(ReqLoginDto reqLoginDto) throws NotFoundException {
        return userRepository.login(reqLoginDto.getUsername(), reqLoginDto.getPassword()).orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));
    }
}
