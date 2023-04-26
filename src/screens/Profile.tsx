import { TouchableOpacity } from "react-native";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuth } from "@hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "As senhas não coincidem")
    .when("password", {
      is: (Field: any) => Field,
      then: yup
        .string()
        .nullable()
        .required("Informe a confirmação da senha.")
        .transform((value) => (!!value ? value : null)),
    }),
});
export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://instagram.fssa20-1.fna.fbcdn.net/v/t51.2885-19/235455129_229264355750651_6579950562147653022_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fssa20-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=Hux_7mUMd-cAX8vP8eL&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfC5W5AmNdi78XQjZqNNA1lvUASkjDzZDmu_QxqXjYx7_Q&oe=643C97AA&_nc_sid=1527a3"
  );
  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handlePickPhoto() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "A imagem deve ter no máximo 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }
        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user
      userUpdated.name = data.name;
      
      await api.put("/users", data );
      
      await updateUserProfile(userUpdated);
      
      toast.show({
        title: "Perfil atualizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const errorMessage = isAppError
        ? error.message
        : "Não foi possível atualizar o  perfil. Tente novamente mais tarde";

      toast.show({
        title: errorMessage,
        placement: "top",
        bgColor: "red.500",
      });
    } finally{
      setIsUpdating(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handlePickPhoto}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value } }) => (
              <Input
                bg="gray.600"
                placeholder="E-mail"
                isDisabled
                value={value}
              />
            )}
          />

          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
            alignSelf="flex-start"
            mt={12}
            fontFamily="heading"
          >
            Alterar senha
          </Heading>
          <Controller
            name="old_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
