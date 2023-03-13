import { Alert, AlertIcon, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Refresh } from "../state";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


export default function NewTopicModal({ isOpen, onClose }) {
    const user = useSelector((state) => state.user)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['auth', 'token'])
    const [formValues, setFormValues] = useState({
        title: "",
        content: ""
    })
    const initialRef = useRef(null)
    const finalRef = useRef(null)


    const createTopic = async () => {
        if(!formValues.title || !formValues.content) {
            setError('Não deixe campos vazios')
            setTimeout(() => {
                setError('')
            }, 5000)
            return
        }
        const response = await fetch('http://localhost:3001/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.token
            },
            body: JSON.stringify({
                title: formValues.title,
                content: formValues.content,
                userId: user._id
            })
        })
        const data = await response.json()
        dispatch(Refresh())
        onClose()
        setFormValues({
            title: "",
            content: ""
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleContentChange = (e) => {
        setFormValues((prev) => ({
            ...prev,
            content: e
        }))
    }

    return (
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Novo Tópico</ModalHeader>
                <ModalCloseButton onClick={onClose} />
                <ModalBody>
                    {error && (
                        <Alert status="error" mb={3}>
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    <FormControl>
                        <FormLabel>Título</FormLabel>
                        <Input
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        type='text'
                        />   
                    </FormControl>
                    <FormControl mt={5} height={'350px'}>
                        <FormLabel>Conteúdo</FormLabel>
                        <ReactQuill style={{ height: '80%'}} value={formValues.content} onChange={handleContentChange} />
                    </FormControl>
                    <Button type="submit" bg={'blue'} color='white' _hover={{ color: 'black', bg: 'white' }} mt={10} onClick={createTopic}>
                        Criar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}