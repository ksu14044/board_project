package com.korit.boardback.controller;

import com.korit.boardback.dto.request.ReqWriteBoardDto;
import com.korit.boardback.security.principal.PrincipalUser;
import com.korit.boardback.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping("/{categoryName}")
    public ResponseEntity<?> createBoard(
            @PathVariable String categoryName,
            @RequestBody ReqWriteBoardDto reqWriteBoardDto,
            @AuthenticationPrincipal PrincipalUser principalUser
            ) {

        return ResponseEntity.ok().body(boardService.createBoard(categoryName, principalUser.getUser(), reqWriteBoardDto));
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(@AuthenticationPrincipal PrincipalUser principalUser) {
        return ResponseEntity.ok().body(boardService.getBoardCategoriesByUserId(principalUser.getUser()));
    }
}
