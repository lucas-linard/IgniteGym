import {
  Image,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Box,
  ScrollView,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthNavigationRouteProps } from "@routes/auth.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/exerciseDTO";
import { useEffect, useState } from "react";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
  exerciseId: number;
};

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const navigation = useNavigation<AuthNavigationRouteProps>();

  const route = useRoute();
  const toast = useToast();
  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }
  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);

      setExercise(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            flexShrink={1}
            color="gray.100"
            fontSize="lg"
            fontFamily="heading"
          >
            {exercise.name}
          </Heading>
          <HStack>
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        {isLoading ? (
          <Loading />
        ) : (
          <VStack p={8}>
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt="Nome do exercício"
              w="full"
              h={80}
              mb={3}
              resizeMode="cover"
              rounded="lg"
            />
            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack
                justifyContent="space-around"
                alignItems="center"
                mb={6}
                mt={5}
              >
                <HStack alignItems="center">
                  <SeriesSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack alignItems="center">
                  <RepetitionsSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button title="Marcar como realizado" />
            </Box>
          </VStack>
        )}
      </ScrollView>
    </VStack>
  );
}
