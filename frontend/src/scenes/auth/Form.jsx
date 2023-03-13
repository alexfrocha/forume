import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { setLogin } from "../../state";
import { useCookies} from 'react-cookie'
import { useDispatch } from "react-redux";

export default function Form({ onClose }) {
    
    const [pageType, setPageType] = useState('login')
    const [error, setError] = useState('')
    const [cookies, setCookie] = useCookies(['auth', 'token'])
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const isLogin = pageType === 'login'
    const isRegister = pageType ==='register'
    
    const register = async () => {
        const response = await fetch('http://localhost:3001/auth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
        console.log(formValues)
        const data = await response.json()
        setPageType('login')
    }

    const login = async () => {
        const emailLowerCase = formValues.email.toLowerCase()
        const loggedIn = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailLowerCase,
                password: formValues.password
            })
        })

        if(loggedIn.status !== 200) return console.log(loggedIn.status)

        const data = await loggedIn.json()
        dispatch(setLogin(data))
        console.log(data)
        setCookie('auth', data.user._id, {path: '/'})
        setCookie('token', data.token, {path: '/'})
        onClose()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(isLogin) await login()
        if(isRegister) await register()
    }

    return (
        <Box p={'2rem'}>
            <form onSubmit={handleSubmit}>
            {isLogin ? (
                <>
                    <FormControl mb={3}>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            value={formValues.email}
                            onChange={handleChange}
                            name="email"
                            type="email"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Senha</FormLabel>
                        <Input 
                            value={formValues.password}
                            onChange={handleChange}
                            name="password"
                            type="password"
                        />
                    </FormControl>
                </>
            ) : (
                <>
                    <FormControl mb={3}>
                        <FormLabel>Nome</FormLabel>
                        <Input 
                            value={formValues.firstName}
                            onChange={handleChange}
                            name="firstName"
                            type="text"
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Sobrenome</FormLabel>
                        <Input 
                            value={formValues.lastName}
                            onChange={handleChange}
                            name="lastName"
                            type="text"
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            value={formValues.email}
                            onChange={handleChange}
                            name="email"
                            type="email"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Senha</FormLabel>
                        <Input 
                            value={formValues.password}
                            onChange={handleChange}
                            name="password"
                            type="password"
                        />
                    </FormControl>
                </>
            )}
            <Button type="submit" w={'100%'} _hover={{ bg: 'blue.700' }} mt={5} mb={3} color={'white'} bg={'blue'}>
                {isLogin ? 'Entrar' : 'Criar'}
            </Button>
            <Text textAlign={'center'} _hover={{ color: 'darkTitle', cursor: 'pointer' }} onClick={() => setPageType(isLogin ? 'register' : 'login')} color='text'>
                {isLogin ? 'Não tem uma conta? Criar uma' : 'Já tem uma conta? Entrar'}
            </Text>
            </form>
        </Box>
    )
}