"use client";

import { useEffect, useState } from "react";
import api from "../utils/api";

export default function About() {
  const [member, setMember] = useState({});

  useEffect(() => {
    api.get("/members/me").then((res) => setMember(res.data.data.memberDto));
  }, []);

  return (
    <>
      <h4>소개 페이지</h4>
      <ul>
        <li>id : {member.id}</li>
        <li>username : {member.username}</li>
      </ul>
    </>
  );
}
