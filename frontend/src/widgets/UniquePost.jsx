import { Alert, AlertIcon, Box, List, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Answer from "../components/Answer";
import Comment from "../components/Comment";
import Comments from "../components/Comments";
import CreateComment from "../components/CreateComment";
import Post from "../components/Post";

export default function UniquePost({ postId }) {
    const [post, setPost] = useState({})
    const [error, setError] = useState('')
    const [comments, setComments] = useState([])
    const [cookies, setCookie] = useCookies(['auth', 'token'])
    const refresh = useSelector((state) => state.refresh)

    const getPost = async () => {
        const response = await fetch(`https://api-forume.herokuapp.com/posts/one/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const postData = await response.json()
        return postData
    }

    const getComments = async () => {
        const response = await fetch(`https://api-forume.herokuapp.com/comments/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
            }
        })
        const data = await response.json()
        setComments(data)
    }

    useMemo(() => {
        const fetchData = async () => {
            setPost(await getPost())
        }
        fetchData()
        getComments()
    }, [refresh])

    const listRef = useRef(null)

    useEffect(() => {
        if(listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight
        }
    }, [listRef])

    return (
        <Box css={{
            '&::-webkit-scrollbar': {
                width: '0',
                height: '0'
            },
            '&::-webkit-scrollbar-thumb': {
                display: 'none'
            } 
        }} overflowY={'scroll'} h={'70vh'} listRef={listRef}>
            {Object.keys(post).length !== 0 ? (
                <List>
                    <Post data={post} unique={true} />
                    { error && (
                        <Alert ml={'4rem'} status="error">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    <CreateComment data={post} postId={postId} setError={setError} />
                    <Comments comments={comments} />
                </List>
            ) : (
                <div>Carregando...</div>
            )}
        </Box>
    )
}