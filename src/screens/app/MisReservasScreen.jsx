import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import api from "../../services/api";
import { COLORS } from "../../styles/constants/colors";

export default function MisReservasScreen() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarReservas = async () => {
    try {
      const { data } = await api.get("/reservas/mis-reservas");
      setReservas(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
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
      <Text style={styles.title}>Mis Reservas</Text>

      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id_reserva.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.route}>
              {item.Vuelo.origen} → {item.Vuelo.destino}
            </Text>
            <Text>Fecha: {item.Vuelo.fecha_salida}</Text>
            <Text style={styles.status}>Estado: {item.estado}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
    padding: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  route: {
    fontWeight: "bold",
  },
  status: {
    marginTop: 6,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryDark,
  },
});