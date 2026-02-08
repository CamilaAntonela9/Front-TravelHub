import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { COLORS } from "../../styles/constants/colors";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TravelHub</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Salir</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.welcome}>
        Bienvenida, {user?.nombre}
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("BuscarVuelos")}
      >
        <Text style={styles.cardTitle}>Buscar vuelos</Text>
        <Text style={styles.cardText}>Explora destinos y precios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("MisReservas")}
      >
        <Text style={styles.cardTitle}>Mis reservas</Text>
        <Text style={styles.cardText}>Consulta tus vuelos reservados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Perfil")}
      >
        <Text style={styles.cardTitle}>Perfil</Text>
        <Text style={styles.cardText}>Datos personales y puntos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  logout: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  welcome: {
    color: COLORS.white,
    fontSize: 18,
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primaryDark,
  },
  cardText: {
    color: COLORS.gray,
    marginTop: 4,
  },
});