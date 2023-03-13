import { Avatar, Box, Button, HStack, Text, useDisclosure, useMediaQuery, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineDelete, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Refresh } from "../state";
import AnswerModal from "./AnswerModal";
import ErrorLogarModal from "./ErrorLogarModal";

export default function Comment({ data }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [isNonMobileScreens] = useMediaQuery("(min-width: 1000px)")
    const [showError, setShowError] = useState(false)

    const removeComment = async () => {
        const response = await fetch(`https://api-forume.herokuapp.com/comments/delete/${data._id}`, {
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
        <VStack ml={isNonMobileScreens ? '5rem' : '2rem'} mt={'1rem'} alignItems={'start'} justifyContent='start'>
            <HStack display={'flex'} justifyContent={'space-between'} w='100%'>
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
                                    <Button _hover={{ color: 'red.700', cursor: 'pointer'}} onClick={removeComment}>
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
                    <Button onClick={onOpen} p={'0'} color='darkTitle' fontSize={'14px'} variant={'ghost'}>
                        Responder
                        <AnswerModal commentId={data._id} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
                    </Button>
                </Box>
            </Box>
            <ErrorLogarModal showError={showError} setShowError={setShowError} />
        </VStack>
    )
}