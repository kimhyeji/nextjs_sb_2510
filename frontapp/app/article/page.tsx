"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Article() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    fetch("http://localhost:8090/api/v1/articles")
      .then((result) => result.json())
      .then((result) => setArticles(result.data.articles))
      .catch((err) => console.error(err));
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `http://localhost:8090/api/v1/articles/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("success");
      fetchArticles();
    } else {
      alert("fail");
    }
  };

  return (
    <>
      <ArticleForm fetchArticles={fetchArticles} />

      <h4>번호 / 제목 / 생성일</h4>
      {articles.length == 0 ? (
        <p>현재 게시물이 없습니다.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              {article.id} /
              <Link href={`/article/${article.id}`}>{article.subject}</Link> /
              {article.createdDate}
              <button onClick={() => handleDelete(article.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function ArticleForm({ fetchArticles }) {
  const [article, setArticle] = useState({ subject: "", content: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8090/api/v1/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });

    if (response.ok) {
      alert("success");
      fetchArticles();
      setArticle({ subject: "", content: "" });
    } else {
      alert("fail");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  return (
    <>
      <h4>게시물 작성</h4>
      <form onSubmit={handleSubmit}>
        <label>
          제목 :
          <input
            type="text"
            name="subject"
            onChange={handleChange}
            value={article.subject}
          />
        </label>
        <br />
        <label>
          내용 :
          <input
            type="text"
            name="content"
            onChange={handleChange}
            value={article.content}
          />
        </label>
        <input type="submit" value="등록" />
      </form>
    </>
  );
}
