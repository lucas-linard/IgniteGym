import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(8, 'No mínimo 8 caracteres.'),
  passwordConfirmation: yup.string().required('Confirme a senha').oneOf([yup.ref('password'), "" ], 'As senhas não conferem.')

})
export function SignUp() {
  const navigation = useNavigation();
  const { control ,handleSubmit, formState: { errors} } = useForm<FormData>({
    resolver: yupResolver(signUpSchema)
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp(form: FormData) {
    console.log(form)
    //navigation.navigate("signIn");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center>
          <Heading
            color="gray.100"
            fontSize="xl"
            textAlign="center"
            mb={6}
            fontFamily="heading"
          >
            Acesse sua conta
          </Heading>
          <Controller
            control={control}
            name="name"
            
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
                />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input 
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { onChange, value } }) => (
              <Input 
              placeholder="Confirme a senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.passwordConfirmation?.message}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType="send"
              />
            )}
          />

          
          

          <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />
        </Center>

        <Button
          title="Voltar para login"
          variant="outline"
          mt={24}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
