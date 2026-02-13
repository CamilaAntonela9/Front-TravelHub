import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { obtenerVuelos, eliminarVuelo } from "../../services/vuelo.service";
import { COLORS } from "../../styles/constants/colors";

export default function BuscarVuelosScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarVuelos = async () => {
    try {
      setLoading(true);
      const data = await obtenerVuelos();
      setVuelos(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los vuelos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarVuelos();
  }, []);

  const confirmarEliminar = (id) => {
    Alert.alert(
      "Eliminar vuelo",
      "¿Seguro que deseas eliminar este vuelo?",
      [
        { text: "Cancelar" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminar(id),
        },
      ]
    );
  };

  const eliminar = async (id) => {
    try {
      await eliminarVuelo(id);
      cargarVuelos();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el vuelo");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.origen} → {item.destino}
      </Text>
      <Text>Fecha: {item.fecha}</Text>
      <Text>Precio: ${item.precio}</Text>

      {/* USER */}
      {user.rol === "USER" && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("Pasajero", { vuelo: item })
          }
        >
          <Text style={styles.btnText}>Reservar</Text>
        </TouchableOpacity>
      )}

      {/* ADMIN */}
      {user.rol === "ADMIN" && (
        <View style={styles.adminActions}>
          <TouchableOpacity
            style={styles.edit}
            onPress={() =>
              navigation.navigate("AdminCrearVuelo", { vuelo: item })
            }
          >
            <Text>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.delete}
            onPress={() => confirmarEliminar(item.id)}
          >
            <Text style={{ color: "white" }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Vuelos disponibles</Text>

      {user.rol === "ADMIN" && (
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate("AdminCrearVuelo")}
        >
          <Text style={styles.createText}>+ Crear vuelo</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={vuelos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={cargarVuelos}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.primaryDark,
  },
  screenTitle: {
    color: COLORS.white,
    fontSize: 20,
    marginBottom: 12,
  },
  createBtn: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  createText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  btn: {
    backgroundColor: COLORS.primary,
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  adminActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  edit: {
    padding: 8,
  },
  delete: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 6,
  },
});