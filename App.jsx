import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import { useContext } from "react";

import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";

import HomeScreen from "./src/screens/app/HomeScreen";
import BuscarVuelosScreen from "./src/screens/app/BuscarVuelosScreen";
import MisReservasScreen from "./src/screens/app/MisReservasScreen";
import PasajeroScreen from "./src/screens/app/PasajeroScreen";
import PagoScreen from "./src/screens/app/PagoScreen";
import PerfilScreen from "./src/screens/app/PerfilScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          {/* STACK PÚBLICO */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          {/* STACK PRIVADO */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BuscarVuelos" component={BuscarVuelosScreen} />
          <Stack.Screen name="MisReservas" component={MisReservasScreen} />
          <Stack.Screen name="Pasajero" component={PasajeroScreen} />
          <Stack.Screen name="Pago" component={PagoScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}