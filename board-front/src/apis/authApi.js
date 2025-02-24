import axios from "axios"

export const joinApi = async (joinInfo) => {

    return await axios.post("/api/auth/join", joinInfo);
}