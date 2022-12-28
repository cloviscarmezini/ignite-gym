import React, { useState } from 'react';
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Button } from '@components/Button';
import { TouchableOpacity } from 'react-native';
import { Input } from '@components/Input';
import * as ImagePicker from  'expo-image-picker';
import * as FileSystem from  'expo-file-system';

const PHOTO_SIZE = 33;

export function Profile() {
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [usePhoto, setUserPhoto] = useState('https://github.com/cloviscarmezini.png');

    const toast = useToast();

    async function handleUserPhotoSelect() {
        try {
            setPhotoIsLoading(true);
    
            const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true
            });
    
            if(selectedPhoto.cancelled) {
                return;
            }
            
            if(selectedPhoto.uri) {
                const photoInfo = await FileSystem.getInfoAsync(selectedPhoto.uri)
                if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5 ) {
                    return toast.show({
                        title: 'Essa imagem é muito grande, selecione uma de até 5MB',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }
                setUserPhoto(selectedPhoto.uri);
            }
        } catch(error) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false)
        }
    }

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil"/>

            <ScrollView
                _contentContainerStyle={{
                    pb: 10
                }}
            >
                <Center mt={6} px={10}>
                    { photoIsLoading ? (
                        <Skeleton
                            size={PHOTO_SIZE}
                            rounded="full"
                            startColor="gray.500"
                            endColor="gray.400"
                        />
                    ) : (
                        <UserPhoto
                            source={{
                                uri: usePhoto
                            }}
                            alt="Foto do usuário"
                            size={PHOTO_SIZE}
                        />
                    )}

                    <TouchableOpacity
                        onPress={handleUserPhotoSelect}
                    >
                        <Text
                            color="green.500"
                            fontFamily="heading"
                            fontSize="md"
                            mt={2}
                            mb={8}
                        >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Input
                        placeholder='Nome'
                        bg="gray.600"
                    />
                    <Input
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        isDisabled
                        bg="gray.600"
                    />

                    <Heading
                        color="gray.200"
                        fontFamily="heading"
                        fontSize="md"
                        mt={12}
                        mb={2}
                        alignSelf="flex-start"
                    >
                        Alterar senha
                    </Heading>
                    <Input
                        placeholder='Senha antiga'
                        secureTextEntry
                        bg="gray.600"
                    />
                    <Input
                        placeholder='Nova senha'
                        secureTextEntry
                        bg="gray.600"
                    />
                    <Input
                        placeholder='Confirme a nova senha'
                        secureTextEntry
                        bg="gray.600"
                    />

                    <Button
                        title="Atualizar"
                        mt={4}
                    />
                </Center>
            </ScrollView>
        </VStack>
    );
}