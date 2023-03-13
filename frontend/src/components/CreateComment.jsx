import { Box, Button, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { Refresh } from "../state";
import CreateCommentModal from "./CreateCommentModal";
import ErrorLogarModal from "./ErrorLogarModal";

export default function CreateComment({ data, setError, postId }) {
    
    const [comment, setComment] = useState('')
    const [cookies, setCookie] = useCookies(['auth', 'token'])
    const dispatch = useDispatch()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const user = useSelector((state) => state.user)
    const [showError, setShowError] = useState(false)
    return (
        <Box mt={3} display={'flex'} w='100%' flexDirection={'column'}>
            <Button onClick={() => user ? onOpen() : setShowError(true)} color={'main'} bg={'white'} _hover={{ color: 'white', bg: 'main' }} alignSelf={'end'}>
                Comentar
                <CreateCommentModal postId={postId} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            </Button>
            <ErrorLogarModal showError={showError} setShowError={setShowError} />
        </Box>
    )
}