import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import api from "../../services/api";
import { COLORS } from "../../styles/constants/colors";

export default function PagoScreen({ route, navigation }) {
  const { vuelo, pasajero } = route.params;
  const [loading, setLoading] = useState(false);

  const pagarYReservar = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/reservas", {
        id_vuelo: vuelo.id_vuelo,
        total: vuelo.precio,
        pasajero,
      });

      Alert.alert("Éxito", "Reserva confirmada", [
        {
          text: "OK",
          onPress: () => navigation.replace("MisReservas"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "No se pudo completar la reserva"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar pago</Text>

      <View style={styles.card}>
        <Text style={styles.route}>
          {vuelo.origen} → {vuelo.destino}
        </Text>

        <Text>Pasajero: {pasajero.nombre} {pasajero.apellido}</Text>
        <Text>Cédula: {pasajero.cedula}</Text>

        <Text style={styles.price}>Total: $ {vuelo.precio}</Text>

        <PrimaryButton
          title="Pagar y reservar"
          onPress={pagarYReservar}
          loading={loading}
        />
      </View>
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
    padding: 20,
    borderRadius: 20,
  },
  route: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});