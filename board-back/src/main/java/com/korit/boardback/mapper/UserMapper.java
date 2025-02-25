package com.korit.boardback.mapper;

import com.korit.boardback.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    User selectByUsername(String username);
    int insert(User user);
    User login(String username, String password);
}
