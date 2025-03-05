package com.korit.boardback.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardSearch {
    private int boardId;
    private String title;
    private String boardCategoryName;
    private String profileImg;
    private String nickname;
    private int viewCount;
    private int likeCount;
    private LocalDateTime createdAt;
}
