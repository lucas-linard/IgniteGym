
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { theme } from "./src/theme";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { Loading } from "@components/Loading";
import { AuthContext } from "@contexts/AuthContext";
import { Routes } from "./src/routes";
export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <AuthContext.Provider value={{
        id: 4,
        name: "Lucas Alencar",
        email: "lucasalencar@dev.com",
        avatar: "Lucas.png"
      }}>
      {fontsLoaded ? <Routes/> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
