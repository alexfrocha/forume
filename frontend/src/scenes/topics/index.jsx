import { Box, Container, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NewTopic from "../../components/NewTopic";
import Navbar from "../../widgets/Navbar";
import Posts from "../../widgets/Posts";
import Rightmenu from "../../widgets/Rightmenu";
import Sidemenu from "../../widgets/Sidemenu";

export default function TopicsPage() {

    const [activePage, setActivePage] = useState('topics')
    const {profileId} = useParams()
    const [isNonMobileScreens] = useMediaQuery('(min-width: 1000px)')

    return (
        <Box style={{ overflow: 'hidden' }}>
            <Container maxW={'8xl'}>
                <Navbar />
                <Box display={isNonMobileScreens ? 'flex' : undefined}  mt={isNonMobileScreens ? 20 : 5}>

                    <Box flexBasis={isNonMobileScreens ? '25%' : undefined}>
                        <Sidemenu activePage={activePage} setActivePage={setActivePage} />
                    </Box>

                    <Box flexBasis={isNonMobileScreens ? '48%' : undefined} mr={isNonMobileScreens && '5rem'}>
                        {!isNonMobileScreens && (
                            <>
                                {/* <NewTopic /> */}
                                <Box mb={3}></Box>
                            </>
                        )}
                        <Posts isProfile={true} profileId={profileId} />
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