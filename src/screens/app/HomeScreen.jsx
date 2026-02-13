import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { COLORS } from "../../styles/constants/colors";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TravelHub</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>
          Bienvenido, <Text style={styles.userName}>{user?.nombre || "Usuario"}</Text>
        </Text>
        <View style={[styles.badge, { backgroundColor: user?.rol === "ADMIN" ? "#D32F2F" : COLORS.primary }]}>
          <Text style={styles.badgeText}>{user?.rol}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("BuscarVuelos")}
      >
        <Text style={styles.cardTitle}>Buscar vuelos</Text>
        <Text style={styles.cardText}>Explora vuelos disponibles</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("MisReservas")}
      >
        <Text style={styles.cardTitle}>Mis reservas</Text>
        <Text style={styles.cardText}>Consulta tus reservas actuales</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Perfil")}
      >
        <Text style={styles.cardTitle}>Perfil</Text>
        <Text style={styles.cardText}>Configura tus datos personales</Text>
      </TouchableOpacity>

      {user?.rol === "ADMIN" && (
        <View style={styles.adminSection}>
          <Text style={styles.sectionHeader}>Panel de Administración</Text>
          
          <TouchableOpacity
            style={styles.adminCard}
            onPress={() => navigation.navigate("GestionVuelos")}
          >
            <Text style={styles.adminTitle}>✈️ Gestión de Vuelos</Text>
            <Text style={styles.adminText}>Crear, editar o eliminar ofertas de vuelo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.adminCard, { backgroundColor: '#B3E5FC' }]}
            onPress={() => navigation.navigate("ReportePasajeros")}
          >
            <Text style={[styles.adminTitle, { color: '#01579B' }]}>👥 Reporte de Pasajeros</Text>
            <Text style={[styles.adminText, { color: '#0277BD' }]}>Ver quiénes han realizado reservas</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark || "#1A1A1A",
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    color: COLORS.white || "#FFF",
    fontSize: 26,
    fontWeight: "bold",
  },
  logout: {
    color: "#FF5252",
    fontWeight: "700",
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    flexWrap: 'wrap'
  },
  welcome: {
    color: "#EEE",
    fontSize: 18,
  },
  userName: {
    fontWeight: 'bold',
    color: COLORS.white
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 10
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  sectionHeader: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  cardText: {
    color: "#666",
    marginTop: 4,
  },
  adminSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#444",
    paddingTop: 20,
  },
  adminCard: {
    backgroundColor: "#FFE082",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5D4037",
  },
  adminText: {
    color: "#6D4C41",
    marginTop: 4,
  },
});