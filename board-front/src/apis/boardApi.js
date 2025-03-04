import { api } from "../configs/axiosConfig";

export const createBoardApi = async (board) => await api.post(`/api/board/${board.categoryName}`, {title: board.title, content: board.content});