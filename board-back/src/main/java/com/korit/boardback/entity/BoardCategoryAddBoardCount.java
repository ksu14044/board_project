package com.korit.boardback.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardCategoryAddBoardCount {
    private int boardCategoryId;
    private String boardCategoryName;
    private int boardCount;
}
