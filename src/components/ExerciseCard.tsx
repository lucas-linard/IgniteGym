import { HStack, Image, VStack, Text, Heading, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ExerciseDTO } from "@dtos/exerciseDTO";
import { api } from "@services/api";
type Props = TouchableOpacityProps & {
  data: ExerciseDTO,
};

export function ExerciseCard({data,  ...rest }: Props) {
  return (
    <TouchableOpacity { ...rest }>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          alt="Remada unilateral com halter"
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading color="white" fontFamily="heading" fontSize="lg">
            {data.name}
          </Heading>
          <Text color="gray.200" fontSize="sm" numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>
        <Icon
        as={Entypo}
        name="chevron-thin-right"
        color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  );
}
