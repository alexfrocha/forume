import { background, Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdAdd } from 'react-icons/md'
import { useSelector } from "react-redux";
import ErrorLogarModal from "./ErrorLogarModal";
import NewTopicModal from "./NewTopicModal";

export default function NewTopic({ isMobile }) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [showError, setShowError] = useState(false)
    const user = useSelector((state) => state.user)
    return (
        <>
            {!isMobile ? (
                
                    <>
                    <Button sx={{ paddingY: '1.7rem' }} onClick={() => user ? onOpen() : setShowError(true)} w={'100%'} display='flex' alignItems={'center'} colorScheme={ 'black' } bgColor={'main'}>
                        <MdAdd color="white" style={{ marginRight: '5px', fontSize: '25px' }} />
                        <Text color={'white'} textTransform={'uppercase'} fontWeight={'800'}>Novo Tópico</Text>
                        <NewTopicModal isOpen={isOpen} onClose={onClose} />
                    </Button>
                    <ErrorLogarModal showError={showError} setShowError={setShowError} />
                </>
            ): (
                <Box position={'absolute'} top={'-20%'}>
                    <Button position={'relative'} bg={'blue'} borderRadius={'5rem'} w={'40px'} h={'40px'} sx={{ padding: '1rem' }} onClick={() => user ? onOpen() : setShowError(true)} display='flex' alignItems={'center'} justifyContent={'center'}>
                        <Box position={'absolute'} top={'50%'} left={'50%'} transform={'translate(-50%,-50%)'} style={{ fontSize: '30px' }}>
                            <MdAdd color="white" />
                        <NewTopicModal isOpen={isOpen} onClose={onClose} />
                        </Box>
                    </Button>
                    <ErrorLogarModal showError={showError} setShowError={setShowError} />
                </Box>
            )}
        </>
    )
}