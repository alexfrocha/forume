import { Avatar, AvatarGroup, Button, HStack, useDisclosure } from "@chakra-ui/react";
import { AiOutlineUser } from 'react-icons/ai'
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import AuthModal from "../scenes/auth";
import { useSelector } from "react-redux";
import ErrorLogarModal from "./ErrorLogarModal";

export default function UserMenu() {
    const [cookies, setCookie] = useCookies(['auth', 'token'])
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [showError, setShowError] = useState(false)
    const user = useSelector((state) => state.user)
    return (
        <HStack>
            { cookies.auth ? (
                
                <AvatarGroup>
                    <Avatar size={'md'} icon={<AiOutlineUser fontSize={'1.5rem'} />} />
                </AvatarGroup>
            ) : (
                <Button onClick={() => onOpen()}>
                    Entrar
                    <ErrorLogarModal showError={showError} setShowError={setShowError} />
                    <AuthModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}  />
                </Button>
            )}
        </HStack>
    )
}