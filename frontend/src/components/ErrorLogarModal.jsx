import React, { useRef } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'

export default function ErrorLogarModal({ showError, setShowError }) {
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    return (
    <Modal
        isOpen={showError}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
    >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Erro ao executar essa ação</ModalHeader>
            <ModalCloseButton onClick={() => setShowError(false)} />
            <ModalBody py={10} textAlign={'center'}>
                Você precisa logar para que possa executar essa ação.
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}