import { Alert, AlertIcon, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { Refresh } from "../state";

export default function CreateCommentModal({ isOpen, onOpen, onClose, postId }) {
    const [error, setError] = useState('')
    const [comment, setComment] = useState('')
    const handleContentChange = (e) => {
        setComment(e)
    }
    const user = useSelector((state) => state.user)
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['auth', 'token'])

    
    const createComment = async () => {
        if(!comment) {
            setError('Campos vazios')
            setTimeout(() => {
                setError('')
            }, 5000);
            return
        }
        const response = await fetch(`http://localhost:3001/comments/create`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${cookies.token}`
            },
            body: JSON.stringify({
                content: comment,
                postId,
                userId: user._id
            })
        })
        const data =await response.json()
        dispatch(Refresh())
        setComment('')
        onClose()
    }

    return (
        <Modal
        isOpen={isOpen}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Comentário</ModalHeader>
                <ModalCloseButton onClick={onClose} />
                <ModalBody>
                { error && 
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                }
                    <FormControl mt={5} height={'350px'}>
                        <FormLabel>Conteúdo</FormLabel>
                        <ReactQuill style={{ height: '80%'}} value={comment} onChange={handleContentChange} />
                    </FormControl>
                    <Button type="submit" bg={'blue'} color='white' _hover={{ color: 'black', bg: 'white' }} mt={10} onClick={createComment}>
                        Comentar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}