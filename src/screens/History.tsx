import React, { useState } from 'react';
import { Heading, SectionList, Text, VStack } from 'native-base';
import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';

export function History() {
    const [exercices, setExercices] = useState([
        {
            title: "26.08.22",
            data: [
                'Puxada frontal',
                'Remada curvada',
                'Remada unilateral'
            ]
        },
        {
            title: "29.08.22",
            data: [
                'Levantamento terra',
                'Levantamento jupter',
                'Levantamento nasa',
                'Levantamento Marte'
            ]
        }
    ])

    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de exercícios"/>

            <SectionList
                sections={exercices}
                keyExtractor={item=>item}
                renderItem={({ item }) => (
                    <HistoryCard />
                )}
                renderSectionHeader={({ section }) => (
                    <Heading color='gray.200' fontSize="md" mt={10} mb={3} fontFamily="heading">
                        { section.title }
                    </Heading>
                )}
                px={8}
                contentContainerStyle={!exercices.length && { flex: 1, justifyContent: 'center', alignItems: 'center' }}
                ListEmptyComponent={() => (
                    <Text color='gray.100' textAlign="center">
                        Não há exercícios registrados ainda. {'\n'}
                        Vamos fazer exercícios hoje?
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </VStack>
    );
}