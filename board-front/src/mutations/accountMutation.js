import { useMutation } from "@tanstack/react-query";
import { sendVerifyEmailApi, updateEmailApi, updateNicknameApi, updatePasswordApi, updateProfileImg } from "../apis/userApi";

export const useUpdateProfileImgMutation = () => useMutation({
    mutationKey: ["useUpdateProfileImgMutation"],
    mutationFn: updateProfileImg,
    retry: 0,
});

export const useUpdateNicknameMutation = () => useMutation({
    mutationKey: ["useUpdateNicknameMutation"],
    mutationFn: updateNicknameApi,
    retry: 0,
})

export const useUpdatePasswordMutation = () => useMutation({
    mutationKey: ["useUpdatePasswordMutation"],
    mutationFn: updatePasswordApi,
    retry: 0,
})

export const useSendVerifyEmailMutation = () => useMutation({
    mutationKey: ["useSendVerifyEmailMutation"],
    mutationFn: sendVerifyEmailApi,
    retry: 0,
})

export const useUpdateEmailMutation = () => useMutation({
    mutationKey: ["useUpdateEmailMutation"],
    mutationFn: updateEmailApi,
    retry: 0,
})