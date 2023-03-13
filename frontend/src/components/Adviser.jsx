import { Box, Card, CardBody, CardHeader, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function Adviser({ data }) {
    return (
        <Box w={'100%'}>
            <Card boxShadow={'0px 3px 5px 5px rgba(0,0,0,.1)'}>
                <CardHeader display={'flex'} justifyContent='space-between' alignItems={'center'}>
                    <Heading fontSize={'16px'} color={'darkText'} fontWeight='500' size='md'>Patrocinado</Heading>
                    <Text _hover={{ color: 'darkTitle', cursor: 'pointer' }} fontSize={'14px'} color={'darkText'}>Criar Anúncio</Text>
                </CardHeader>
                <CardBody mt={-8}>
                    <Image borderRadius={5} src={`https://api-forume.herokuapp.com/assets/${data.url}`} />
                    <VStack alignItems={'flex-start'} w='100%'>
                        <Text mt={1} fontSize={'12px'} textAlign={'start'} textTransform='uppercase' letterSpacing={'1px'} color={'darkText'} fontWeight={'700'}>{data.name}</Text>
                        <Text fontSize={'12px'} color={'darkText'} fontWeight={'800'}>{data.link}</Text>
                    </VStack>
                </CardBody>
            </Card>

        </Box>
    )
}