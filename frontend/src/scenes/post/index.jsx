import { Box, Container, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { BsBox } from "react-icons/bs";
import { useParams } from "react-router-dom";
import NewTopic from "../../components/NewTopic";
import Navbar from "../../widgets/Navbar";
import Rightmenu from "../../widgets/Rightmenu";
import Sidemenu from "../../widgets/Sidemenu";
import UniquePost from "../../widgets/UniquePost";

export default function PostPage() {

    const [activePage, setActivePage] = useState('home')
    const {postId} = useParams()
    const [isNonMobileScreens] = useMediaQuery("(min-width: 1000px)")

    return (
        <Box style={{ overflow: 'hidden' }}>
            <Container maxW={'8xl'}>
                <Navbar />
                <Box display={isNonMobileScreens ? 'flex' : undefined}  mt={isNonMobileScreens ? 20 : 5}>

                    {isNonMobileScreens && (
                        <Box flexBasis={isNonMobileScreens ? '25%' : undefined}>
                            <Sidemenu activePage={activePage} setActivePage={setActivePage} />
                        </Box>
                    )}

                    <Box overflowY={'scroll'} flexBasis={isNonMobileScreens ? '48%' : undefined} mr={isNonMobileScreens && '5rem'}>
                        {!isNonMobileScreens && (
                            <>
                                <NewTopic />
                                <Box mb={3}></Box>
                            </>
                        )}
                        <UniquePost postId={postId} />
                    </Box>

                    {isNonMobileScreens && (    
                        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
                            <Rightmenu />
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    )
}