import type { JwtUserData } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { AUTH_TOKEN, REFRESH_TOKEN } from "./constants";

export const getToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN, token);
};

export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN);
};

export const decodeToken = (token: string): JwtUserData | null => {
  try {
    return jwtDecode<JwtUserData>(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = decodeToken(token);
    if (!decodedToken) return true;

    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch {
    return true;
  }
};

export const checkAuthStatus = () => {
  const token = getToken();

  if (!token) {
    return { isAuthenticated: false, userData: null };
  }

  const decodedToken = decodeToken(token);
  if (!decodeToken || isTokenExpired(token)) {
    removeToken();
    return { isAuthenticated: false, userData: null };
  }

  return { isAuthenticated: true, userData: decodedToken };
};
