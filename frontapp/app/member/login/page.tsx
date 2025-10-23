"use client";

import api from "@/app/utils/api";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/members/login", user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogout = async () => {
    await api.post("/members/logout");
  };

  return (
    <>
      <h4>로그인</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="아이디"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="비밀번호"
        />
        <input type="submit" value="로그인" />
      </form>

      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
}
