import { Box, HStack, Stack, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Logo from "../components/Logo";
import Search from "../components/Search";
import UserMenu from "../components/UserMenu";

export default function Navbar() {
    const [isNonMobileScreens] = useMediaQuery('(min-width: 768px)');
    return (
        <Box>
            <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Logo />
                {isNonMobileScreens ? 
                (    
                <>
                    <Search />
                    <UserMenu />
                </>
                ) : (
                    <>
                        <Box display={'flex'} alignItems={'center'}>
                            <Search />
                            <UserMenu />
                        </Box>
                    </>
                )    
            }
            </HStack>
        </Box>
    )
}