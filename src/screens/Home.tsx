import React, { useState } from 'react';
import { FlatList, Heading, HStack, Text, VStack } from 'native-base';
import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';
import { ExerciceCard } from '@components/ExerciceCard';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Home() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    const [groups, setGroups] = useState([
        'Costas',
        'Bíceps',
        'Tríceps',
        'Ombro',
    ])
    const [exercices, setExercices] = useState([
        'Puxada frontal',
        'Remada curvada',
        'Remada unilateral',
        'Levantamento terra',
        'Levantamento jupter',
        'Levantamento nasa',
        'Levantamento Marte',
    ])
    const [groupSelected, setGroupSelected] = useState('costas')

    function handleOpenExerciceDetails() {
        navigation.navigate('exercice')
    }

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item=>item}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{
                    px: 8
                }}
                my={10}
                maxH={10}
                renderItem={({ item })=>(
                    <Group
                        name={item}
                        isActive={groupSelected === item}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
            />

            <VStack
                px={8}
                flex={1}
            >
                <HStack
                    justifyContent="space-between"
                    mb={5}
                >
                    <Heading color="gray.200" fontSize="md" fontFamily="heading">
                        Exercícios
                    </Heading>
                    <Text color="gray.200" fontSize="sm">
                        { exercices.length }
                    </Text>
                </HStack>

                <FlatList
                    data={exercices}
                    keyExtractor={item=>item}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{
                        pb: 20
                    }}
                    renderItem={({ item })=>(
                        <ExerciceCard
                            onPress={handleOpenExerciceDetails}
                            name={item}
                        />
                    )}
                />
            </VStack>
        </VStack>
    );
}