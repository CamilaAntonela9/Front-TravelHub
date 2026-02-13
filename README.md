# TravelHub - Sistema de Gestión de Viajes y Reservas

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características Principales](#características-principales)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades por Rol](#funcionalidades-por-rol)
- [Seguridad y Autenticación](#seguridad-y-autenticación)
- [Gestión de Estado y Caché](#gestión-de-estado-y-caché)
- [Despliegue](#despliegue)
- [API Endpoints](#api-endpoints)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Descripción del Proyecto

La digitalización del transporte actual exige plataformas que gestionen información en tiempo real con altos estándares de seguridad. Bajo esta premisa, se desarrolló **TravelHub**, una solución integral diseñada para optimizar la logística de viajes y la administración de itinerarios. 

El sistema ha superado con éxito su fase de desarrollo e implementación, consolidándose como una plataforma operativa que integra un frontend móvil en **React Native** con un backend robusto en **Node.js**, logrando una arquitectura distribuida de alto desempeño.

Actualmente, el sistema se encuentra totalmente funcional y desplegado en la nube a través de **Railway**, utilizando **PostgreSQL** para la persistencia de datos. Durante este proceso, se validaron desafíos técnicos críticos como la sincronización de variables de entorno, la gestión multimedia con **Cloudinary** y la seguridad mediante protocolos **SSL/HTTPS**. La culminación de este despliegue garantiza que TravelHub cumple con las funcionalidades establecidas, ofreciendo una infraestructura escalable, segura y disponible para responder a las demandas dinámicas de la gestión turística moderna.

## Características Principales

### Para Usuarios (Pasajeros)

- Búsqueda Avanzada de Vuelos: Filtrado por origen, destino, fecha y rango de precios
- Reservas en Tiempo Real: Sistema de reservas instantáneo con confirmación automática
- Generación de QR de Abordaje: Código QR único para cada reserva
- Múltiples Métodos de Pago: Tarjeta, efectivo y transferencia
- Historial de Viajes: Visualización completa de reservas pasadas y futuras
- Gestión de Perfil: Actualización de datos personales y preferencias
- Modo Offline: Caché inteligente con sincronización automática

### Para Administradores

- Gestión Completa de Vuelos: CRUD de ofertas de vuelo con validaciones
- Validación de QR: Escaneo y verificación de códigos de abordaje
- Panel de Reservas: Vista global de todas las reservas del sistema
- Gestión de Usuarios: Registro y administración de otros administradores
- Análisis de Datos: Información sobre ocupación y métricas de vuelos

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                     CAPA DE PRESENTACIÓN                     │
│                    (React Native + Expo)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pantallas  │  │  Navegación  │  │  Componentes │      │
│  │     Auth     │  │    Stacks    │  │      UI      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   CAPA DE GESTIÓN DE ESTADO                  │
│  ┌──────────────────┐         ┌────────────────────┐        │
│  │  Context API     │         │  React Query       │        │
│  │  (AuthContext)   │         │  (Caché + Offline) │        │
│  └──────────────────┘         └────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   CAPA DE SERVICIOS (API)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Axios     │  │ Interceptors │  │  AsyncStorage│      │
│  │   Instance   │  │   (Auth)     │  │   (Tokens)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND API                           │
│               (Node.js + Express + Railway)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Controllers │  │   Services   │  │  Middleware  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE PERSISTENCIA                      │
│  ┌──────────────────────────────────────────────────┐       │
│  │            PostgreSQL Database                   │       │
│  │          (Railway Managed Instance)              │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Tecnologías Utilizadas

### Frontend (Mobile)

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React Native** | 0.81.5 | Framework principal de desarrollo móvil |
| **Expo** | ~54.0 | Herramientas y servicios para desarrollo |
| **React Navigation** | 7.x | Navegación entre pantallas |
| **React Query** | 5.x | Gestión de estado del servidor y caché |
| **Axios** | 1.13.4 | Cliente HTTP para peticiones API |
| **AsyncStorage** | 2.2.0 | Almacenamiento local persistente |
| **React Native QR Code SVG** | 6.3.21 | Generación de códigos QR |
| **Expo Camera** | ~17.0 | Acceso a cámara para escaneo QR |

### Backend

| Tecnología | Propósito |
|-----------|-----------|
| **Node.js** | Runtime del servidor |
| **Express.js** | Framework web |
| **PostgreSQL** | Base de datos relacional |
| **JWT** | Autenticación y autorización |
| **Cloudinary** | Gestión de imágenes |
| **Railway** | Plataforma de despliegue |

### Herramientas de Desarrollo

- **ESLint**: Linting y formateo de código
- **TypeScript**: Tipado estático (configurado)
- **Git**: Control de versiones
- **VS Code**: Editor recomendado

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.x o superior)
- **npm** o **yarn** (gestor de paquetes)
- **Expo CLI** (opcional, recomendado): `npm install -g expo-cli`
- **Android Studio** (para emulador Android) o **Xcode** (para iOS/macOS)
- **Expo Go** app (para testing en dispositivo físico)

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/front-travelhub.git
cd front-travelhub
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno

El proyecto ya está configurado para conectarse al backend desplegado en Railway:

**Archivo: `src/services/api.js`**
```javascript
baseURL: 'https://backend-travelhub-production.up.railway.app/api'
```

Si deseas usar un backend local, modifica esta URL:

```javascript
baseURL: 'http://localhost:3000/api'  // Para desarrollo local
```

### 4. Iniciar el Proyecto

```bash
# Desarrollo general
npm start

# Específico para Android
npm run android

# Específico para iOS (solo macOS)
npm run ios

# Para web
npm run web
```

### 5. Escanear QR con Expo Go

1. Descarga **Expo Go** desde Play Store (Android) o App Store (iOS)
2. Escanea el código QR que aparece en la terminal
3. La aplicación se cargará automáticamente en tu dispositivo

## Estructura del Proyecto

```
Front-TravelHub/
│
├── assets/                      # Recursos estáticos
│   └── images/                  # Iconos, splash screens
│
├── src/
│   ├── components/              # Componentes reutilizables
│   │   ├── CustomButton.jsx
│   │   ├── CustomInput.jsx
│   │   ├── InputField.jsx
│   │   └── PrimaryButton.jsx
│   │
│   ├── context/                 # Contextos de React
│   │   └── AuthContext.js       # Gestión de autenticación
│   │
│   ├── navigation/              # Configuración de navegación
│   │   ├── AppStack.jsx
│   │   ├── AuthStack.jsx
│   │   └── RootNavigator.jsx
│   │
│   ├── screens/                 # Pantallas de la aplicación
│   │   ├── auth/
│   │   │   ├── LoginScreen.jsx
│   │   │   └── RegisterScreen.jsx
│   │   └── app/
│   │       ├── HomeScreen.jsx
│   │       ├── BuscarVuelosScreen.jsx
│   │       ├── MisReservasScreen.jsx
│   │       ├── PasajeroScreen.jsx
│   │       ├── MetodoPagoScreen.jsx
│   │       ├── ReservaAgregadaScreen.jsx
│   │       ├── PerfilScreen.jsx
│   │       ├── AdminVuelosScreen.jsx
│   │       ├── FormVueloScreen.jsx
│   │       ├── GestionReservasScreen.jsx
│   │       └── ValidarQRScreen.jsx
│   │
│   ├── services/                # Servicios de API
│   │   ├── api.js               # Configuración de Axios
│   │   ├── auth.service.js      # Servicios de autenticación
│   │   ├── token.service.js     # Gestión de tokens
│   │   └── vuelo.service.js     # Servicios de vuelos
│   │
│   └── styles/                  # Estilos globales
│       └── constants/
│           └── colors.js        # Paleta de colores
│
├── App.jsx                      # Punto de entrada principal
├── app.json                     # Configuración de Expo
├── package.json                 # Dependencias del proyecto
└── README.md                    # Documentación
```

## Funcionalidades por Rol

### Rol: Usuario (USER)

#### 1. Búsqueda de Vuelos
```javascript
// Filtros disponibles
- Origen (ciudad)
- Destino (ciudad)
- Fecha de salida
- Precio mínimo
- Precio máximo
```

#### 2. Proceso de Reserva
```
1. Seleccionar vuelo
2. Ingresar datos del pasajero
3. Seleccionar método de pago
4. Confirmar reserva
5. Recibir código QR
```

#### 3. Gestión de Reservas
- Visualizar reservas activas
- Ver historial completo
- Descargar QR de abordaje
- Acceso offline a reservas

### Rol: Administrador (ADMIN)

#### 1. Gestión de Vuelos
```javascript
// Operaciones CRUD
- Crear nuevo vuelo
- Editar vuelo existente
- Eliminar vuelo
- Listar todos los vuelos
```

#### 2. Validación de Abordaje
```javascript
// Métodos de validación
- Escaneo de QR con cámara
- Ingreso manual de código
- Verificación en tiempo real
```

#### 3. Panel de Reservas
- Ver todas las reservas del sistema
- Filtrar por estado de pago
- Analizar ocupación de vuelos
- Exportar datos

## Seguridad y Autenticación

### Sistema de Autenticación JWT

```javascript
// Flujo de autenticación
1. Login → Servidor genera JWT
2. Token almacenado en AsyncStorage
3. Interceptor agrega token a cada request
4. Backend valida token en middleware
5. Respuesta autorizada/no autorizada
```

### Implementación del Interceptor

```javascript
// src/services/api.js
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Protección de Rutas

- **Rutas públicas**: Login, Register
- **Rutas protegidas USER**: Búsqueda, Reservas, Perfil
- **Rutas protegidas ADMIN**: Gestión de vuelos, Validación QR, Panel de reservas

### Almacenamiento Seguro

```javascript
// Datos almacenados localmente
- Token JWT (AsyncStorage)
- Datos de usuario (AsyncStorage)
- Caché de consultas (React Query Persister)
```

## Gestión de Estado y Caché

### React Query - Sistema de Caché Inteligente

#### Configuración

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,    // 24 horas en memoria
      staleTime: 1000 * 60 * 5,       // 5 min de frescura
      retry: 2,                        // 2 reintentos
    },
  },
});
```

#### Persistencia Offline

```javascript
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

persistQueryClient({
  queryClient,
  persister: asyncStoragePersister,
});
```

### Context API - Gestión de Autenticación

```javascript
// AuthContext proporciona:
- user: Datos del usuario actual
- login(token, userData): Función de login
- logout(): Función de logout
- actualizarDatosUsuario(newData): Actualización de perfil
- loading: Estado de carga inicial
```

### Sincronización de Datos

```javascript
// Estrategia de refresco
useFocusEffect(
  useCallback(() => {
    refetch(); // Actualiza datos al entrar a la pantalla
  }, [refetch])
);
```

## Despliegue

### Backend en Railway

El backend está desplegado en Railway con las siguientes características:

- **URL de Producción**: `https://backend-travelhub-production.up.railway.app`
- **Base de datos**: PostgreSQL gestionada por Railway
- **Variables de entorno**: Configuradas en el dashboard de Railway
- **SSL/HTTPS**: Habilitado por defecto
- **Auto-deploy**: Activado desde rama principal

### Frontend (Compilación)

#### Build para Android

```bash
# Desarrollo
npm run android

# Producción (APK)
eas build --platform android --profile production

# Producción (AAB para Play Store)
eas build --platform android --profile production --auto-submit
```

#### Build para iOS

```bash
# Desarrollo (solo macOS)
npm run ios

# Producción
eas build --platform ios --profile production
```

### Variables de Entorno Requeridas (Backend)

```env
DATABASE_URL=postgresql://...
JWT_SECRET=tu_secreto_jwt
CLOUDINARY_CLOUD_NAME=nombre_cloud
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret
PORT=3000
NODE_ENV=production
```

## API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/profile` | Obtener perfil | Sí |
| PUT | `/api/auth/profile` | Actualizar perfil | Sí |

### Vuelos

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | `/api/vuelos/buscar` | Buscar vuelos | USER, ADMIN |
| GET | `/api/vuelos` | Listar todos los vuelos | ADMIN |
| POST | `/api/vuelos` | Crear vuelo | ADMIN |
| PUT | `/api/vuelos/:id` | Actualizar vuelo | ADMIN |
| DELETE | `/api/vuelos/:id` | Eliminar vuelo | ADMIN |

### Reservas

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | `/api/reservas/mis-reservas` | Obtener reservas del usuario | USER |
| GET | `/api/reservas` | Listar todas las reservas | ADMIN |
| POST | `/api/reservas` | Crear nueva reserva | USER |
| GET | `/api/admin/validar-qr/:codigo` | Validar código QR | ADMIN |

## Sistema de Diseño

### Paleta de Colores

```javascript
export const COLORS = {
  primaryDark: "#1C2D41",   // Fondo principal y headers
  primary: "#2563EB",       // Botones principales y acentos
  lightGray: "#E4E9F0",     // Inputs y fondos de cards
  white: "#FFFFFF",         // Texto sobre fondos oscuros
  black: "#000000",         // Texto principal
  textGray: "#6B7280",      // Texto secundario
};
```

### Componentes Reutilizables

#### PrimaryButton

```javascript
<PrimaryButton 
  title="Confirmar" 
  onPress={handleSubmit} 
  loading={isLoading} 
/>
```

#### InputField

```javascript
<InputField
  placeholder="Correo electrónico"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
```

## Testing

### Pruebas Manuales Realizadas

- Flujo completo de registro y login
- Búsqueda de vuelos con filtros
- Proceso de reserva end-to-end
- Generación de código QR
- Validación de QR con cámara
- Sincronización offline/online
- Actualización de perfil
- CRUD de vuelos (admin)

## Solución de Problemas

### Error: "Network request failed"

```javascript
// Solución: Verifica la conectividad y la URL del backend
// Asegúrate de que el backend esté desplegado y accesible
```

### Error: "Token inválido"

```javascript
// Solución: Limpia el almacenamiento local
await AsyncStorage.clear();
// Luego vuelve a iniciar sesión
```

### Build Failed en Expo

```bash
# Limpia caché y reinstala dependencias
expo start --clear
rm -rf node_modules
npm install
```

## Contribución

Si deseas contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

