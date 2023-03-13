import { Box, Button, VStack } from "@chakra-ui/react";
import React from "react";
import Adviser from "../components/Adviser";
import FooterSide from "../components/FooterSide";
import NewTopic from "../components/NewTopic";

export default function Rightmenu() {

    const adData = {
        name: 'Mickey Lu',
        url: 'anuncio1.jpeg',
        link: 'mickey-lu.com.br/'
    }

    return (
        <VStack>
            <NewTopic />
            <Box mt={'3rem'}></Box>
            <Box mt={'3rem'}></Box>
            <Box mt={'3rem'}></Box>
            <Adviser data={adData} />
        </VStack>
    )
}