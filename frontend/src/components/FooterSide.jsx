import { Text, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

export default function FooterSide() {
    return (
        <Wrap color={'darkText'} display='flex' justifyContent={'space-between'} fontWeight={'600'}>
            <WrapItem w={'35%'} fontSize={'14px'}>
                <Text _hover={{ color: 'darkTitle', cursor: 'pointer' }}>Ajuda</Text>
            </WrapItem>
            <WrapItem w={'35%'} fontSize={'14px'}>
                <Text _hover={{ color: 'darkTitle', cursor: 'pointer' }}>Forume Pro</Text>
            </WrapItem>
            <WrapItem w={'35%'} fontSize={'14px'}>
                <Text _hover={{ color: 'darkTitle', cursor: 'pointer' }}>Tópicos</Text>
            </WrapItem>
            <WrapItem w={'35%'} fontSize={'14px'}>
                <Text _hover={{ color: 'darkTitle', cursor: 'pointer' }}>Top Tópicos</Text>
            </WrapItem>
            <WrapItem w={'35%'} fontSize={'14px'}>
                <Text _hover={{ color: 'darkTitle', cursor: 'pointer' }}>Blog</Text>
            </WrapItem>
            <WrapItem w={'35%'} fontSize={'14px'}>
                <Text _hover={{ color: 'darkTitle', cursor: 'pointer' }}>Anunciar</Text>
            </WrapItem>
            <WrapItem w={'35%'} fontSize={'14px'}>
                <Text _hover={{ color: 'darkTitle', cursor: 'pointer' }}>Sobre</Text>
            </WrapItem>
            <WrapItem w={'35%'} fontSize={'14px'}>
                <Text _hover={{ color: 'darkTitle', cursor: 'pointer' }}>Empregos</Text>
            </WrapItem>
            <WrapItem w={'35%'} fontSize={'14px'}>
                <Text _hover={{ color: 'darkTitle', cursor: 'pointer' }}>Termos</Text>
            </WrapItem>
            <WrapItem w={'35%'} fontSize={'14px'}>
                <Text _hover={{ color: 'darkTitle', cursor: 'pointer' }}>Política de Privacidade</Text>
            </WrapItem>
        </Wrap>
    )
}