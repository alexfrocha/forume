import { Avatar, AvatarGroup, Button, HStack, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import { AiOutlineUser } from 'react-icons/ai'
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import AuthModal from "../scenes/auth";
import { useDispatch, useSelector } from "react-redux";
import ErrorLogarModal from "./ErrorLogarModal";
import { Refresh, setLogout } from "../state";

export default function UserMenu() {
    const [cookies, setCookie, removeCookie] = useCookies(['auth', 'token'])
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [showError, setShowError] = useState(false)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    return (
        <HStack>
            { cookies.auth ? (
                
                <Menu>
                    <MenuButton>
                        <AvatarGroup>
                            <Avatar size={'sm'} icon={<AiOutlineUser fontSize={'1rem'} />} />
                        </AvatarGroup>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => {
                            dispatch(setLogout())
                            removeCookie('auth', {path: '/'})
                            removeCookie('token', {path: '/'})
                            dispatch(Refresh())
                        }}>Sair</MenuItem>
                    </MenuList>
                </Menu>
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