import { Box, Highlight, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import { AnimatePresence, motion } from 'framer-motion'
import NewTopic from "../components/NewTopic";

export default function Posts({ isProfile, profileId }) {

    const [cookies, setCookie] = useCookies(['auth', 'token'])
    const [profile, setProfile] = useState({})

    const getPosts = async () => {
        const reponse = await fetch(`http://localhost:3001/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        const data = await reponse.json()
        setPosts(data)
    }

    const getPostsByProfile = async () => {
        const response = await fetch(`http://localhost:3001/posts/${profileId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        setPosts(data)
    }

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${profileId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        setProfile(data)
    }

    const listRef = useRef(null)
    const [isNonMobileScreens] = useMediaQuery('(min-width: 1000px)')

    const [posts, setPosts] = useState([])
    const refresh = useSelector((state) => state.refresh)

    useMemo(() => {
        if(isProfile) {
            getPostsByProfile()
            getUser()
        }
        else getPosts()
    }, [isProfile ? profileId : refresh])

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
                { isProfile && (
                    <Box fontSize={'20px'} textAlign={'center'} my={3}>
                        <Highlight 
                        styles={{
                            color: 'main700',
                            fontWeight: '700'
                        }}
                        query={[`${profile.firstName}`, `${profile.lastName}`]}>
                            {`Tópicos do usuário ${profile.firstName} ${profile.lastName}`}
                        </Highlight>
                    </Box>

                )}
                {posts.slice(0).reverse().map(post => (
                    <motion.div
                        key={post._id}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <Post isProfile={true} data={post} />
                    </motion.div>
                ))}
            </AnimatePresence>

        </Box>
    )
}