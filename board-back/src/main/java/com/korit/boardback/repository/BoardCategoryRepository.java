package com.korit.boardback.repository;

import com.korit.boardback.entity.BoardCategory;
import com.korit.boardback.entity.BoardCategoryAddBoardCount;
import com.korit.boardback.mapper.BoardCategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BoardCategoryRepository {
    @Autowired
    private BoardCategoryMapper boardCategoryMapper;

    public BoardCategory save(BoardCategory boardCategory) {
        boardCategoryMapper.insertBoardCategory(boardCategory);
        return boardCategory;
    }

    public Optional<BoardCategory> findByName(String categoryName) {
        return Optional.ofNullable(boardCategoryMapper.selectBoardCategoryByName(categoryName));
    }

    public List<BoardCategoryAddBoardCount> findAllByUserId(int userId) {
        return boardCategoryMapper.selectBoardCategoryAddBoardCountByUserId(userId);
    }
}
