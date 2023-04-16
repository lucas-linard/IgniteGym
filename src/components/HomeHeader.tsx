import { HStack, VStack, Text, Heading, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        alt="Foto do usuário"
        source={{
          uri: "https://instagram.fssa20-1.fna.fbcdn.net/v/t51.2885-19/235455129_229264355750651_6579950562147653022_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fssa20-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=Hux_7mUMd-cAX8vP8eL&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfC5W5AmNdi78XQjZqNNA1lvUASkjDzZDmu_QxqXjYx7_Q&oe=643C97AA&_nc_sid=1527a3",
        }}
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Lucas
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
