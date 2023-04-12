import { VStack, Image } from "native-base";

import BackgroundImg from "@assets/background.png";

export function SignIn() {
  return (
    <VStack flex={1} bg={"gray.700"}>
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
      />
    </VStack>
  );
}
