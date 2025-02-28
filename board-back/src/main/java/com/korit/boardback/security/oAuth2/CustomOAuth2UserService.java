package com.korit.boardback.security.oAuth2;

import com.korit.boardback.entity.User;
import com.korit.boardback.repository.UserRepository;
import com.korit.boardback.security.principal.PrincipalUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DefaultOAuth2UserService defaultOAuth2UserService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println(getDefaultOAuth2User(userRequest));

        User user = null;

        return PrincipalUser.builder()
                .user(user)
                .name(null)
                .attributes(null)
                .build();
    }

    private OAuth2User getDefaultOAuth2User(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
         return defaultOAuth2UserService.loadUser(userRequest);
    }
}
