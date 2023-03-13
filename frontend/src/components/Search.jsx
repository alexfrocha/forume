import { Button, Input, InputGroup, InputRightElement, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from 'react-icons/bs'

export default function Search() {
    const [isNonMobileScreens] = useMediaQuery("(min-width: 768px)")
    return (
        <>
        {
            isNonMobileScreens ?
            (
                <InputGroup w={'30%'}>
                    <Input 
                    type='text'
                    placeholder='Pesquisar'
                    _placeholder={{
                        color: 'text'
                    }}
                    />
                    <InputRightElement>
                        <Button h='1.7rem' color={'text'} size={'sm'} onClick={() => console.log('Pesquisei')}>
                            <BsSearch />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            ) : (
                <Button mr={3}>
                    <BsSearch />
                </Button>
            )
        }
        </>
    )
}