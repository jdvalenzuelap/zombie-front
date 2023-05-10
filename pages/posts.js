import PostCard from '../components/PostCard'
import { useState, useEffect } from 'react'

const Posts = () => {
  const [postReadings, setPostReadings] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/v1/zombie/post', {
        method: 'GET'
      })

      if (response.ok) {
        const result = await response.json()
        const posts = result.map(post => ({
          title: post.title,
          content: post.content,
          date: post.date,
          id: post.id
        }))
        setPostReadings(posts)
      } else {
        console.log('Error')
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {postReadings.map(postReading => (
        <PostCard key={postReading.id} title={postReading.title} content={postReading.content} createdAt={postReading.date}/>
      ))}
      <div>posts</div>
    </div>
  )
}

export default Posts