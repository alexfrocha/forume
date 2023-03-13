import { Box, List, ListIcon, ListItem, Text, useMediaQuery } from "@chakra-ui/react";
import { ImHome } from 'react-icons/im'
import React, { useState } from "react";
import { VscCommentDiscussion, VscHome, VscPinned, VscPinnedDirty } from "react-icons/vsc";
import Adviser from "../components/Adviser";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorLogarModal from "../components/ErrorLogarModal";
import NewTopic from "../components/NewTopic";

export default function Sidemenu({ activePage, setActivePage }) {

    const [isNonMobileScreens] = useMediaQuery('(min-width: 1000px)')
    const user = useSelector((state) => state.user)
    const [showError, setShowError] = useState(false)
    const navigate = useNavigate()
    const adData = {
        name: 'MikasCosméticos',
        link: 'mikacosmeticos.com.br',
        url: 'anuncio2.jpeg'
    }
    
    return (
        <>
            {isNonMobileScreens ? (
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width={'300px'}>
                        <Box mb={5}>
                            <Text ml={'47px'} fontSize={'13px'} color={'text'} fontWeight='700' letterSpacing={'1px'}>MENU</Text>
                            <List>
                                <ListItem 
                                _hover={{
                                    bgColor: 'black100',
                                    cursor: 'pointer',
                                    transition: '.3s'
                                }} 
                                onClick={() => {
                                    setActivePage('home')
                                    navigate('/')
                                }}
                                sx={{ bgColor: activePage === 'home' ? 'main100' : 'white' }} 
                                borderLeftWidth='8px' 
                                borderLeftColor={activePage === 'home' ? 'main700' : 'white'} 
                                py={3} 
                                pl={3} 
                                color={'text'} 
                                display={'flex'} 
                                alignItems={'center'}
                                >
                                    <ListIcon sx={{ color: activePage === 'home' ? 'main700' : 'darkText' }} fontSize={'20px'} as={VscHome} />
                                    <Text sx={{ color: activePage === 'home' ? 'main700' : 'darkText' }} fontWeight={'600'} fontSize={'16px'}>Página Inicial</Text>
                                </ListItem>
            
                                <ListItem 
                                _hover={{
                                    bgColor: 'black100',
                                    cursor: 'pointer',
                                    transition: '.3s'
                                }} 
                                onClick={() => {
                                    if(!user) return setShowError(true)
                                    setActivePage('topics')
                                    navigate('/topics/' + user._id)
                                }}
                                sx={{ bgColor: activePage === 'topics' ? 'main100' : 'white' }} 
                                borderLeftWidth='8px' 
                                borderLeftColor={activePage === 'topics' ? 'main700' : 'white'}
                                py={3} 
                                pl={3} 
                                color={'text'} 
                                display={'flex'} 
                                alignItems={'center'}
                                >
                                    <ListIcon sx={{ color: activePage === 'topics' ? 'main700' : 'darkText' }} fontSize={'20px'} as={VscPinned} />
                                    <Text sx={{ color: activePage === 'topics' ? 'main700' : 'darkText' }} fontWeight={'600'} fontSize={'16px'}>Tópicos</Text>
                                </ListItem>
            
                            </List>
                <ErrorLogarModal showError={showError} setShowError={setShowError} />
                        </Box>
                            <Box marginTop={'180px'}></Box>
                            <Adviser data={adData} />
                    </Box>
            ): (
                <Box bg={'white'} boxShadow={'sm'} zIndex={2} position={'absolute'} left="0" bottom="0" w='100%' h='60px'>
                    <Box h='100%'>
                        <List display={'flex'} h='100%' alignItems={'center'} justifyContent={'space-around'}>
                            <NewTopic isMobile={true} />
                            <ListItem 
                            borderBottomWidth='3px'
                            paddingBottom={1}
                            transition='.6s'
                            onClick={() => {
                                setActivePage('home')
                                navigate('/')
                            }}
                            borderBottomColor={activePage === 'home' ? 'main700' : 'white'}
                            display={'flex'} flexDirection='column' justifyContent={'center'} alignItems={'center'}>
                                <ListIcon sx={{ color: activePage === 'home' ? 'main700' : 'darkText' }} as={VscHome} fontSize={'20px'} />
                                <Text sx={{ color: activePage === 'home' ? 'main700' : 'darkText' }} fontSize={'14px'} fontWeight={'500'}>Início</Text>
                            </ListItem>

                            <ListItem 
                            display={'flex'} 
                            flexDirection='column' 
                            onClick={() => {
                                if(!user) return setShowError(true)
                                navigate('/topics/' + user._id)
                                setActivePage('topics')
                            }}
                            transition='.6s'
                            borderBottomWidth='3px'
                            paddingBottom={1}
                            borderBottomColor={activePage === 'topics' ? 'main700' : 'white'}
                            justifyContent={'center'} 
                            alignItems={'center'}>
                                <ListIcon sx={{ color: activePage === 'topics' ? 'main700' : 'darkText' }} as={VscPinnedDirty} fontSize={'20px'} />
                                <Text sx={{ color: activePage === 'topics' ? 'main700' : 'darkText' }} fontSize={'14px'} fontWeight={'500'}>Tópicos</Text>
                            </ListItem>
                        </List>
                    </Box>
                <ErrorLogarModal showError={showError} setShowError={setShowError} />
                </Box>
            )}
        </>
    )
}