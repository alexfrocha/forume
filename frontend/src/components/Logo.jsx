import { Box, Heading, Highlight, Text } from "@chakra-ui/react";
import React from "react";
import { GiSoundWaves } from 'react-icons/gi'
import { useNavigate } from "react-router-dom";

export default function Logo() {

    const navigate = useNavigate()

    return (
        <Box 
        _hover={{
            cursor: 'pointer'
        }}
        onClick={() => {
            navigate("/")
        }} display={'flex'} alignItems={'center'}>
            <Box color={'main'} fontSize='65px' mr={3}>
                <GiSoundWaves />
            </Box>
            <Text fontWeight='bold' fontSize={'xl'}>
                <Highlight query={'me'} styles={{
                    color: 'main',
                }}>forume</Highlight>
            </Text>
        </Box>
    )
}