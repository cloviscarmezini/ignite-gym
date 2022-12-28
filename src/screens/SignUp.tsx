import React from 'react';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { useForm, Controller } from "react-hook-form";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

type formDataProps = {
    name: string
    email: string
    password: string
    password_confirm: string
}

const signUpSchema = Yup.object({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório').min(6, 'A senha deve ter pelo menos 6 dígitos').max(8, 'A senha deve ter no máximo 8 dígitos'),
    password_confirm: Yup.string().required('Campo obrigatório').oneOf([Yup.ref('password'), null], 'Senhas não coincidem'),
})

export function SignUp() {
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm<formDataProps>({
        resolver: yupResolver(signUpSchema)
    })

    function handleLogin() {
        navigation.goBack();
    }

    async function handleSignUp(values: formDataProps) {
        console.log(values)
    }

    return (
        <ScrollView
            _contentContainerStyle={{
                flexGrow: 1,
                pb: 32
            }}
            showsVerticalScrollIndicator={false}
        >
            <VStack
                flex={1}
                px={10}
            >
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode='contain'
                    position="absolute"
                />

                <Center my={24}>
                    <LogoSvg />

                    <Text color="gray.100" fontSize="sm">
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>

                <Center>
                    <Heading
                        color="gray.100"
                        fontSize="xl"
                        fontFamily="heading"
                        mb={6}
                    >
                        Crie sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder='Nome'
                                onChangeText={onChange}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder='E-mail'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder='Senha'
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password_confirm"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder='Confirme a Senha'
                                secureTextEntry
                                onChangeText={onChange}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType="send"
                                errorMessage={errors.password_confirm?.message}
                            />
                        )}
                    />

                    <Button
                        title="Criar e acessar"
                        onPress={handleSubmit(handleSignUp)}
                    />
                </Center>

                <Button
                    title="Voltar para o login"
                    variant="outline"
                    mt={12}
                    onPress={handleLogin}
                />
            </VStack>
        </ScrollView>
    );
}