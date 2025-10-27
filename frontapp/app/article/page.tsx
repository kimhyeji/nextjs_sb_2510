'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import api from '@/app/utils/api'

export default function Article() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = () => {
    api
      .get('/articles')
      .then((response) => setArticles(response.data.data.articles))
      .catch((err) => console.log(err))
  }

  const handleDelete = async (id) => {
    await api.delete(`/articles/${id}`).then(() => fetchArticles())
  }

  return (
    <>
      <ArticleForm fetchArticles={fetchArticles} />

      <h4>번호 / 제목 / 작성자 / 생성일 / 삭제여부</h4>
      {articles.length == 0 ? (
        <p>현재 게시물이 없습니다.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              {article.id} /
              <Link href={`/article/${article.id}`}>{article.subject}</Link> /
              {article.author} / {article.createdDate}
              <button onClick={() => handleDelete(article.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

function ArticleForm({ fetchArticles }) {
  const [article, setArticle] = useState({ subject: '', content: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()

    await api
      .post('/articles', article)
      .then(function (res) {
        alert('success')
        fetchArticles()
        setArticle({ subject: '', content: '' })
      })
      .catch(function (err) {
        alert('fail')
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setArticle({ ...article, [name]: value })
  }

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
  )
}
