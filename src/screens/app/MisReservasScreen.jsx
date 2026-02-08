import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { COLORS } from "../../styles/constants/colors";

export default function MisReservasScreen() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  const cargarReservas = async () => {
    try {
      const { data } = await api.get("/reservas");
      setReservas(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las reservas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis reservas</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Salir</Text>
        </TouchableOpacity>
      </View>

      {reservas.length === 0 ? (
        <Text style={styles.empty}>No tienes reservas aún</Text>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id_reserva.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.route}>
                {item.Vuelo?.origen} → {item.Vuelo?.destino}
              </Text>
              <Text>Fecha: {item.Vuelo?.fecha_salida}</Text>
              <Text>Estado: {item.estado}</Text>
              <Text style={styles.price}>$ {item.total}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
  },
  logout: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  route: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    marginTop: 6,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  empty: {
    color: COLORS.white,
    textAlign: "center",
    marginTop: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryDark,
  },
});