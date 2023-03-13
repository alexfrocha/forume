import { Avatar, Box, Button, HStack, Text, useMediaQuery, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineDelete, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Refresh } from "../state";
import ErrorLogarModal from "./ErrorLogarModal";

export default function Answer({ data }) {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [showError, setShowError] = useState(false)
    const [isNonMobileScreens] = useMediaQuery("(min-width: 1000px)")

    
    const removeAnswer = async () => {
        const response = await fetch(`https://api-forume.herokuapp.com/comments/answer/delete/${data._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        await response.json()
        dispatch(Refresh())
    }

    const likeComment = async (data) => {
        const response = await fetch('https://api-forume.herokuapp.com/comments/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                commentId: data._id,
                userId: user._id
            })
        })
        if(response.status !== 200) return console.log(response.status)
        const dataJson = await response.json()
        dispatch(Refresh())
    }

    

    const deslikeComment = async (data) => {
        const response = await fetch('https://api-forume.herokuapp.com/comments/deslike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                commentId: data._id,
                userId: user._id
            })
        })
        if(response.status !== 200) return console.log(response.status)
        const dataJson = await response.json()
        dispatch(Refresh())
    }

    let isLiked = false
    let isDesliked = false
    if(user) {
        isLiked = data.likes.includes(user._id)
        isDesliked = data.deslikes.includes(user._id)
    }

    return (
        <VStack ml={isNonMobileScreens ? '10rem' : '4rem'} mt={'1.5rem'} alignItems={'start'} justifyContent='start'>
            <HStack w={'100%'} justifyContent={'space-between'}>
                <HStack>
                    <Avatar w={'25px'} h={'25px'} icon={<AiOutlineUser />} />
                    <Text _hover={{ cursor: 'pointer' }} onClick={() => navigate('/topics/' + data.author._id)} fontWeight={'700'} color={'main700'} fontSize='14px'>{`${data.author.firstName} ${data.author.lastName}`}</Text>
                </HStack>
                {
                    user && 
                    (
                        <>
                            { user._id == data.author._id && 
                                (
                                    <Button _hover={{ color: 'red.700', cursor: 'pointer'}} onClick={removeAnswer}>
                                        <AiOutlineDelete />
                                    </Button>
                                )
                            }
                        </>
                    )
                }
            </HStack>
            <Box width={"full"} mb={'4rem'} display={'flex'} alignItems='flex-start'>
                <VStack alignItems={'center'} w={'30px'} marginRight={'15px'} justifyContent={'center'}>
                    <Box _hover={{ color: 'main700', cursor: 'pointer'}} onClick={() => user ? likeComment(data) : setShowError(true)} color={isLiked ? 'main' : 'text'} fontSize='15px'>
                        <AiOutlineArrowUp />
                    </Box>
                    {!isLiked && !isDesliked ? 
                        <Text color={'text'} fontWeight='700'>{data.likes.length - data.deslikes.length}</Text>
                    : 
                        <Text color={isLiked ? 'main' : 'desliked'} fontWeight='700'>{data.likes.length - data.deslikes.length}</Text>
                    }
                    <Box _hover={{ color: 'red.700', cursor: 'pointer'}} onClick={() => user ? deslikeComment(data) : setShowError(true)} color={isDesliked ? 'desliked' : 'text'} fontSize='15px'>
                        <AiOutlineArrowDown />
                    </Box>
                </VStack>
                <Box w={'100%'}>
                    <Text w={'100%'} fontWeight={'500'} fontSize={'14px'} letterSpacing={'.8px'} color={'text'} lineHeight={'30px'}>
                        <div dangerouslySetInnerHTML={{ __html: data.content }} />
                    </Text>
                </Box>
            </Box>
            <ErrorLogarModal showError={showError} setShowError={setShowError} />
        </VStack>
    )
}