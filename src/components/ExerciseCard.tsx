import { HStack, Image, VStack, Text, Heading, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";
type Props = TouchableOpacityProps & {

};

export function ExerciseCard({ ...rest }: Props) {
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
            uri: "https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-2.jpg",
          }}
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading color="white" fontFamily="heading" fontSize="lg">
            Remada unilateral com halter
          </Heading>
          <Text color="gray.200" fontSize="sm" numberOfLines={2}>
            3 séries de 10 repetições
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
