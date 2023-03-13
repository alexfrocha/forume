import { Alert, AlertIcon, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { Refresh } from "../state";

export default function AnswerModal({ isOpen, onOpen, onClose, commentId }) {
    const [content, setContent] = useState('')
    const handleContentChange = (e) => {
        setContent(e)
    }
    const user = useSelector((state) => state.user)
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const dispatch = useDispatch()

    const addAnswer = async () => {
        const response = await fetch('http://localhost:3001/comments/answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                userId: user._id,
                commentId
            })
        })
        const data = await response.json()
        dispatch(Refresh())
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
                <ModalCloseButton onClick={onClose} />
                <ModalBody>
                    <FormControl mt={5} height={'350px'}>
                        <FormLabel>Conteúdo</FormLabel>
                        <ReactQuill style={{ height: '80%'}} value={content} onChange={handleContentChange} />
                    </FormControl>
                    <Button type="submit" bg={'blue'} color='white' _hover={{ color: 'black', bg: 'white' }} mt={10} onClick={addAnswer}>
                        Responder
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}