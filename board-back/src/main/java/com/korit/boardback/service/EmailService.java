package com.korit.boardback.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
public class EmailService {

    private final String FROM_EMAIL = "rlatldnr1234@gmail.com";

    @Autowired(required = false)
    private JavaMailSender javaMailSender;

    public void sendAuthMail(String to) throws MessagingException {
        final String SUBJECT = "[board_project] 계정 활성화 인증 메일입니다.";
        String content = """
                
                """;
        sendMail(to, SUBJECT, content);
    }

    public void sendMail(String to,String subject, String content) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, StandardCharsets.UTF_8.name());
        mimeMessageHelper.setFrom(FROM_EMAIL);
        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject(subject);
        mimeMessage.setText(content, StandardCharsets.UTF_8.name(), "html");
        javaMailSender.send(mimeMessage);
    }
}
