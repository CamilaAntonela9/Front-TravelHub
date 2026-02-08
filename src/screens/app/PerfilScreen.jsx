import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { COLORS } from "../../styles/constants/colors";

export default function PerfilScreen() {
  const { user, logout } = useContext(AuthContext);

  const cerrarSesion = () => {
    Alert.alert("Cerrar sesión", "¿Deseas salir de la aplicación?", [
      { text: "Cancelar" },
      { text: "Salir", onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{user?.nombre}</Text>

        <Text style={styles.label}>Correo</Text>
        <Text style={styles.value}>{user?.email}</Text>

        <Text style={styles.label}>Rol</Text>
        <Text style={styles.value}>{user?.rol}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={cerrarSesion}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  label: {
    color: COLORS.lightGray,
    fontSize: 13,
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 14,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
  },
});