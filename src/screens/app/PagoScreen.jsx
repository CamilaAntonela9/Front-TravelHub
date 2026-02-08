import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import api from "../../services/api";
import { COLORS } from "../../styles/constants/colors";

export default function PagoScreen({ route, navigation }) {
  const { reserva } = route.params;
  const [loading, setLoading] = useState(false);

  const confirmarPago = async () => {
    try {
      setLoading(true);

      await api.post("/pago", {
        id_reserva: reserva.id_reserva,
        total: reserva.total,
      });

      Alert.alert("Pago exitoso", "Tu reserva ha sido confirmada", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "No se pudo procesar el pago"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pago</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Ruta</Text>
        <Text style={styles.value}>
          {reserva.origen} → {reserva.destino}
        </Text>

        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>{reserva.fecha_salida}</Text>

        <Text style={styles.label}>Total a pagar</Text>
        <Text style={styles.price}>$ {reserva.total}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={confirmarPago}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Procesando..." : "Confirmar pago"}
        </Text>
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
  price: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});