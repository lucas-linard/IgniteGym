import { Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./src/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { StatusBar } from "expo-status-bar";

import { Loading } from "@components/Loading";

import { SignIn } from "@screens/SignIn";
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {fontsLoaded ? <SignIn/> : <Loading />}
    </NativeBaseProvider>
  );
}
