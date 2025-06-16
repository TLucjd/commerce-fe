// lib/auth.ts
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

export const register = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, data, {
    withCredentials: true, // để gửi/nhận cookie (nếu BE dùng cookie)
  });
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post<AuthResponse>(`${BASE_URL}/auth/login`, data, {
    withCredentials: true,
  });

  const { access_token, refresh_token } = res.data;

  Cookies.set("access_token", access_token, { expires: 1 });
  Cookies.set("refresh_token", refresh_token, { expires: 7 });

  return res.data;
};

export const logout = async () => {
  const refreshToken = Cookies.get("refresh_token");

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const res = await axios.post(
    `${BASE_URL}/auth/logout`,
    { refresh_token: refreshToken },
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      withCredentials: true,
    }
  );

  return res.data;
};