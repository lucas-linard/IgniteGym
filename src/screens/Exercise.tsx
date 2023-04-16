import { Image, HStack, Heading, Icon, Text, VStack, Box, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRouteProps } from "@routes/auth.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";

export function Exercise() {
  const navigation = useNavigation<AuthNavigationRouteProps>();

  function handleGoBack() {
    navigation.goBack();
  }

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
            Remada
          </Heading>
          <HStack>
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
      <VStack p={8}>
        <Image
        source={{ uri: "https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-2.jpg"}}
        alt="Nome do exercício"
        w="full"
        h={80}
        mb={3}
        resizeMode="cover"
        rounded="lg"
        />
        <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack justifyContent="space-around" alignItems="center" mb={6} mt={5}>
                <HStack alignItems="center">
                    <SeriesSvg />
                    <Text color="gray.200" ml={2}>
                        3 séries
                    </Text>
                </HStack>
                <HStack alignItems="center">
                    <RepetitionsSvg />
                    <Text color="gray.200" ml={2}>
                        10 repetições
                    </Text>
                </HStack>
            </HStack>
            <Button title="Marcar como realizado"/>
        </Box>
      </VStack>
      </ScrollView>
    </VStack>
  );
}
