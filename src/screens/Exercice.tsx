import React from 'react';
import { Image, VStack, Icon, HStack, Heading, Text, Box, ScrollView } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import BodySvg from '@assets/body.svg' 
import SeriesSvg from '@assets/series.svg' 
import RepetitionsSvg from '@assets/repetitions.svg' 
import { Button } from '@components/Button';

export function Exercice() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <VStack flex={1}>
            <VStack px={8} bg="gray.600" pt={12}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon
                        as={Feather}
                        name="arrow-left"
                        color="green.500"
                        size={6}
                    />
                </TouchableOpacity>

                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    mt={4}
                    mb={8}
                >
                    <Heading
                        color="gray.100"
                        fontSize="lg"
                        fontFamily="heading"
                        flexShrink={1}
                    >
                        Puxada frontal
                    </Heading>

                    <HStack alignItems="center">
                        <BodySvg />
                        <Text color="gray.100" ml={1} textTransform="capitalize">
                            Costas
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
            <ScrollView>
                <VStack p={8}>
                    <Image
                        w="full"
                        h={80}
                        source={{
                            uri: "https://i.ytimg.com/vi/JE3XUqMyHXo/mqdefault.jpg" 
                        }}
                        alt="Imagem do exercício"
                        mb={10}
                        resizeMode="cover"
                        rounded="lg"
                        overflow="hidden"
                    />

                    <Box
                        bg="gray.600"
                        rounded="md"    
                        pb={4}
                        px={4}
                    >
                        <HStack
                            alignItems="center"
                            justifyContent="space-around"
                            mb={6}
                            mt={5}
                        >
                            <HStack alignItems="center">
                                <SeriesSvg />
                                <Text
                                    color="gray.100"
                                    ml={2}
                                >
                                    3 séries
                                </Text>
                            </HStack>
                            <HStack alignItems="center">
                                <RepetitionsSvg />
                                <Text
                                    color="gray.100"
                                    ml={2}
                                >
                                    12 repetições
                                </Text>
                            </HStack>
                        </HStack>
                        <Button
                            title="Marcar como realizado"
                        />
                    </Box>
                </VStack>
            </ScrollView>
        </VStack>
    );
}