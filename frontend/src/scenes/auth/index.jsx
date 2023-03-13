import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, { useRef } from "react";
import Form from "./Form";

export default function AuthModal({isOpen, onOpen, onClose, pageType}) {
    
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    
    return (
        <Modal 
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{pageType === 'login' ? 'Entrar' : 'Criar'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Form onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}