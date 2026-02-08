import { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import api from "../../services/api";
import { COLORS } from "../../styles/constants/colors";

export default function BuscarVuelosScreen({ navigation }) {
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  logout();
  const cargarVuelos = async () => {
    try {
      const { data } = await api.get("/vuelos");
      setVuelos(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarVuelos();
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
      <Text style={styles.title}>Vuelos disponibles</Text>

      <FlatList
        data={vuelos}
        keyExtractor={(item) => item.id_vuelo.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.route}>
              {item.origen} → {item.destino}
            </Text>
            <Text>Fecha: {item.fecha_salida}</Text>
            <Text style={styles.price}>$ {item.precio}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Pasajero", { vuelo: item })
              }
            >
              <Text style={styles.buttonText}>Reservar</Text>
            </TouchableOpacity>
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
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    marginTop: 6,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  button: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryDark,
  },
});