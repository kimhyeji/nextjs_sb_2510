"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ArticleDetail() {
  const params = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8090/api/v1/articles/${params.id}`)
      .then((result) => result.json())
      .then((result) => setArticle(result.data.article))
      .catch((err) => console.error(err));
  });

  return (
    <>
      <h4>게시물 상세 {params.id}번</h4>
      <div>{article.subject}</div>
      <div>{article.content}</div>
      <div>{article.createdDate}</div>
      <div>{article.modifiedDate}</div>
      <Link href={`/article/${params.id}/edit`}>수정</Link>
    </>
  );
}
