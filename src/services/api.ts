import { ApiResponse } from '@/lib/types/common';
import { LoginUserData } from '@/lib/types/login';
import { SignUpUserData } from '@/lib/types/signup';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL,
});

export async function signUpUser(data: SignUpUserData) {
  try {
    return (await axiosInstance.post<ApiResponse>('users/sign-up', data)).data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw error.response!.data;
    }

    throw error;
  }
}

export async function loginInUser(data: LoginUserData) {
  try {
    return (await axiosInstance.post<ApiResponse>('users/sign-in', data)).data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw error.response!.data;
    }

    throw error;
  }
}
