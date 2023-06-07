import PostCard from '../components/PostCard'
import CreatePostCard from '../components/CreatePostCard'
import { useState, useEffect } from 'react'
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";

const Posts = () => {
  const [postReadings, setPostReadings] = useState([])



  useEffect(() => { 
    fetchData()
  }, [])


  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;

  const authorization = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  let ipfs = IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  const fetchData = async () => {
    const response = await fetch('http://localhost:3001/api/v1/zombie/post', {
      method: 'GET'
    })

    const result = await response.json()

    if (response.ok) {
      const posts = result.map(post => ({
        title: post.title,
        content: post.content,
        date: new Date(post.date),
        isImage: post.isImage,
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
      content: content,
      isImage: false
    }

    const response = await fetch('http://localhost:3001/api/v1/zombie/post', {
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

    const result = await ipfs.add(image);
    const cid = CID.parse(result.path);
    const path = cid.toString();

    const data = {
      title: title,
      content: path,
      isImage: true
    }

    const response = await fetch('http://localhost:3001/api/v1/zombie/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result2 = await response.json()

    if (response.ok) {
      console.log(result2)
      fetchData()
    }
    else {
      console.log(result2)
    } 
  }

  return (
    <div className='post-background'>
      <CreatePostCard onPublishClick={handleNewPost} onImagePublishClick={handleNewImagePost}/>
      {/* If post is image display the image if not then display text */}
      {postReadings.map(post => (
         <PostCard key={post.id} title={post.title}  isImage={post.isImage} content={post.content} createdAt={post.date.toLocaleString()}/>
      ))}
      {ipfs ? <>Powered by IPFS</> : <>IPFS is not working</>}
    </div>
  )
}

export default Posts