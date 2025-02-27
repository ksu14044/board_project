import React, { useEffect } from 'react';
import LoginPage from '../../pages/LoginPage/LoginPage';
import JoinPage from '../../pages/JoinPage/JoinPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { useUserMeQuery } from '../../queries/userQuery';
import { useQueryClient } from '@tanstack/react-query';

function AuthRoute(props) {
    const navigate = useNavigate();
    // const loginUser = useUserMeQuery();
    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState(["userMeQuery"]);
   

    useEffect(() => {
        console.log(queryState);
        if(queryState.status === "success") {
            navigate("/");
        }
    }, [queryState])

    return  queryState.status === "error" &&
            <Routes>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/join" element={<JoinPage />}/>
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
}

export default AuthRoute;