import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signuprole" />
        <Stack.Screen name="user-signup" />
        <Stack.Screen name="driver-signup" />
      </Stack>
    </AuthProvider>
  );
}