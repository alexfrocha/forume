import { Box, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import { AnimatePresence, motion } from 'framer-motion'
import NewTopic from "../components/NewTopic";

export default function Posts() {

    const [cookies, setCookie] = useCookies(['auth', 'token'])

    const getPosts = async () => {
        const reponse = await fetch(`http://localhost:3001/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        const data = await reponse.json()
        setPosts(data)
        console.log(data)
    }

    const listRef = useRef(null)
    const [isNonMobileScreens] = useMediaQuery('(min-width: 1000px)')

    const [posts, setPosts] = useState([])
    const refresh = useSelector((state) => state.refresh)

    useMemo(() => {
        getPosts()
    }, [refresh])

    useEffect(() => {
        if(listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight
        }
    }, [listRef])
    
    return (
        <Box w={'100%'} overflowY={'scroll'} height={'80vh'} ref={listRef} css={{
            '&::-webkit-scrollbar': {
                width: '0',
                height: '0'
            },
            '&::-webkit-scrollbar-thumb': {
                display: 'none'
            }
        }}>
            <AnimatePresence>
                {posts.map(post => (
                    <motion.div
                        key={post._id}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <Post data={post} />
                    </motion.div>
                ))}
            </AnimatePresence>

        </Box>
    )
}