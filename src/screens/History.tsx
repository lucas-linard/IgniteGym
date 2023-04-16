import { useState } from "react";
import { SectionList, VStack, Heading, Text } from "native-base";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "14.04.2023",
      data: ["Remada cavalinho", "Outro exercicios"],
    },
    {
      title: "15.04.2023",
      data: ["Remada", "levantamento terra"],
    },
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {title}
          </Heading>
        )}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        } 
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda.{'\n'}Vamos começar?
          </Text>
        )}
        px={8}
      />
    </VStack>
  );
}
