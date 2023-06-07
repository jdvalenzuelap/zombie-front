import PostCard from '../components/PostCard'
import CreatePostCard from '../components/CreatePostCard'
import { useState, useEffect } from 'react'

const Posts = () => {
  const [postReadings, setPostReadings] = useState([])

  useEffect(() => { 
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('/api/v1/zombie/post', {
      method: 'GET'
    })

    const result = await response.json()

    if (response.ok) {
      const posts = result.map(post => ({
        title: post.title,
        content: post.content,
        date: new Date(post.date),
        id: post.id
      }))
      console.log(posts)
      setPostReadings(posts)
    } else {
      console.log(result)
    }
  }

  const handleNewPost = async (title, content) => {
    const data = {
      title: title,
      content: content
    }

    const response = await fetch('/api/v1/zombie/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (response.ok) {
      console.log(result)
      fetchData()
    } else {
      console.log(result)
    }
  }

  const handleNewImagePost = async (title, image) => {
    console.log(image)
  }

  return (
    <div className='post-background'>
      <CreatePostCard onPublishClick={handleNewPost} onImagePublishClick={handleNewImagePost}/>
      {postReadings.map(postReading => (
        <PostCard key={postReading.id} title={postReading.title} content={postReading.content} createdAt={postReading.date.toLocaleString()}/>
      ))}
    </div>
  )
}

export default Posts