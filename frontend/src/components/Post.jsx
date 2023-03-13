import { Avatar, AvatarGroup, Badge, Box, Button, Heading, Highlight, HStack, Text, Tooltip, useMediaQuery, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineUser } from 'react-icons/ai'
import {VscComment} from 'react-icons/vsc'
import { useDispatch, useSelector } from "react-redux";
import { Refresh } from "../state";
import {MdDeleteOutline} from 'react-icons/md'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ErrorLogarModal from "./ErrorLogarModal";

export default function Post({ data, unique=false, isProfile=false }) {
    const user = useSelector((state) => state.user)
    const [cookies, setCookie] = useCookies(['auth', 'token'])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showError, setShowError] = useState(false)
    const [isNonMobileScreens] = useMediaQuery('(min-width: 1000px)')
    const likePost = async (data) => {
        const response = await fetch('http://localhost:3001/posts/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId: data._id,
                userId: user._id
            })
        })
        if(response.status !== 200) return console.log(response.status)
        const dataJson = await response.json()
        dispatch(Refresh())
    }

    

    const deslikePost = async (data) => {
        const response = await fetch('http://localhost:3001/posts/deslike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId: data._id,
                userId: user._id
            })
        })
        if(response.status !== 200) return console.log(response.status)
        const dataJson = await response.json()
        dispatch(Refresh())
    }

    const removePost = async () => {
        const response = await fetch('http://localhost:3001/posts/delete/' + data._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.token
            },
            body: JSON.stringify({
                userId: user._id
            })
        })
        await response.json()
        dispatch(Refresh())
    }

    let isLiked = false
    let isDesliked = false
    if(user) {
        isLiked = data.likes.includes(user._id)
        isDesliked = data.deslikes.includes(user._id)

    }

    return (
        <Box key={data._id} width={"full"} mb={!unique && '4rem'} display={'flex'} alignItems='flex-start'>
            <VStack alignItems={'center'} w={'30px'} marginRight={isNonMobileScreens ? '45px' : '10px'} justifyContent={'center'}>
                <Box _hover={{ color: 'main700', cursor: 'pointer'}} onClick={() => user ? likePost(data) : setShowError(true)} color={isLiked ? 'main' : 'text'} fontSize='25px'>
                    <AiOutlineArrowUp />
                </Box>
                
                
                {!isLiked && !isDesliked ? 
                <Text color={'text'} fontWeight='700'>{data.likes.length - data.deslikes.length}</Text>
                : 
                    <Text color={isLiked ? 'main' : 'desliked'} fontWeight='700'>{data.likes.length - data.deslikes.length}</Text>
                }


                <Box _hover={{ color: 'red.700', cursor: 'pointer'}} onClick={() => user ? deslikePost(data) : setShowError(true)} color={isDesliked ? 'desliked' : 'text'} fontSize='25px'>
                    <AiOutlineArrowDown />
                </Box>
            </VStack>
            <Box w={'100%'}>
                <HStack justifyContent={"space-between"} alignItems={'center'}>
                    {isNonMobileScreens ? (
                        <Heading _hover={{ color: 'main700', cursor: 'pointer' }}  onClick={() => !unique && navigate(`/post/${data._id}`)} mb={3} color='darkTitle' fontWeight={'600'} fontSize={isNonMobileScreens ? '28px' : '17px'}>{data.title} {unique && (
                            <Badge ml={2} px={'1rem'} py={'.3rem'} bg={'main'} color={'white'}>
                                TÓPICO
                            </Badge>
                        )}</Heading>
                    ): (
                        
                        <Box display={'flex'} flexDirection='column' justifyContent={'start'}>
                        { unique && (
                            <Badge px={'1rem'} w={'75px'} mb={2} py={'.3rem'} bg={'main'} color={'white'}>
                                TÓPICO
                            </Badge>
                        )}
                        <Heading _hover={{ color: 'main700', cursor: 'pointer' }}  onClick={() => !unique && navigate(`/post/${data._id}`)} mb={3} color='darkTitle' fontWeight={'600'} fontSize={isNonMobileScreens ? '28px' : '17px'}>{data.title}</Heading>
                        </Box>    
                    )}
                    { user && (
                        <>
                            { user._id === data.author._id ? (
                                <Button onClick={removePost} _hover={{ bg: 'red', color: 'white'}}>
                                    <MdDeleteOutline fontSize={'20px'} />
                                </Button>
                            ): (
                                <Box onClick={() => {navigate(`/topics/${data.author._id}`)}} > 
                                    <Tooltip label={`${data.author.firstName} ${data.author.lastName}`}>  
                                        <Avatar _hover={{ cursor: 'pointer' }} size={'sm'} src={`http://localhost:3001/assets/${data.author.picturePath}`} icon={<AiOutlineUser fontSize={'.8rem'} />} />
                                    </Tooltip>
                                </Box>
                            )}
                        </>
                        )
                    }

                    
                    {
                        !user && unique ? (
                            <Tooltip label={`${data.author.firstName} ${data.author.lastName}`}>  
                                <Avatar _hover={{ cursor: 'pointer' }} size={'sm'} src={`http://localhost:3001/assets/${data.author.picturePath}`} icon={<AiOutlineUser fontSize={'.8rem'} />} />
                            </Tooltip>
                        ) : (
                            <>
                            </>
                        )
                    }
                    

                </HStack>
                <Text w={'100%'} fontWeight={'500'} fontSize={isNonMobileScreens ? '14px' : '13px'} letterSpacing={'.8px'} color={'text'} lineHeight={isNonMobileScreens ? '30px' : '20px'}>
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </Text>
                {!unique && (
                    <HStack w={'100%'} display={'flex'} flexDirection={isProfile ? 'column' : 'row'}>
                    {!isProfile && (
                        <Box display={'flex'} color={'darkText'} fontSize={'14px'} alignItems='center'>
                            <Avatar icon={<AiOutlineUser fontSize={'1rem'} />} size={'sm'} mr={2} />
                            <Highlight styles={{
                                color: 'main700',
                                fontWeight: '700',
                                marginLeft: '3px'
                                }} query={`${data.author.firstName} ${data.author.lastName}`}>{`Postado por ${data.author.firstName} ${data.author.lastName}`}</Highlight>
                        </Box>
                    )}

                    <Button alignSelf={'flex-end'} onClick={() => navigate(`/post/${data._id}`)} color={'darkText'} _hover={{
                        color: 'darkTitle'
                    }} variant={'ghost'}>
                        <HStack>
                            <VscComment />
                            <Text>{data.comments.length}</Text>
                        </HStack>
                    </Button>

                </HStack>
                )}
            </Box>
            <ErrorLogarModal showError={showError} setShowError={setShowError} />
        </Box>
    )
}