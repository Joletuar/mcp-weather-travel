# MCP Weather Travel Assistant

## Descripción

Este proyecto es un asistente basado en el protocolo Model Context Protocol (MCP) que proporciona herramientas y recursos para consultar información sobre el clima, vuelos y destinos turísticos. Su objetivo principal es explorar e implementar todo lo relacionado con los MCPs. Actualmente, el proyecto está en desarrollo y no está terminado.

## Características

### Herramientas

1. **get_weather**

   - **Descripción**: Obtiene el clima actual y el pronóstico para una ciudad específica.
   - **Esquema de entrada**:
     - `city` (string, requerido): Nombre de la ciudad.

2. **fetch_flights**

   - **Descripción**: Recupera vuelos disponibles para una ruta específica.
   - **Esquema de entrada**:
     - `from` (string, requerido): Ciudad de origen.
     - `to` (string, requerido): Ciudad de destino.
     - `date` (string, formato de fecha, requerido): Fecha del viaje en formato YYYY-MM-DD.

3. **travel_suggestions**

   - **Descripción**: Proporciona sugerencias de viaje basadas en preferencias del usuario y datos disponibles.
   - **Esquema de entrada**:
     - `preferences` (object, opcional): Preferencias del usuario como tipo de clima, actividades, etc.

4. **weather_analysis**

   - **Descripción**: Analiza patrones climáticos históricos para una región específica.
   - **Esquema de entrada**:
     - `region` (string, requerido): Nombre de la región.
     - `date_range` (object, requerido): Rango de fechas para el análisis.

5. **distance**

   - **Descripción**: Calcula la distancia entre dos ubicaciones geográficas.

6. **recommendations**
   - **Descripción**: Genera recomendaciones personalizadas basadas en datos de usuario y contexto.

### Recursos

1. **airports**

   - **Descripción**: Base de datos de aeropuertos.
   - **MIME**: `application/json`
   - **URI**: `airports`

2. **cities**

   - **Descripción**: Base de datos de ciudades con información relevante para viajes.
   - **MIME**: `application/json`
   - **URI**: `cities`

3. **tourist**
   - **Descripción**: Base de datos de atracciones turísticas y actividades recomendadas.
   - **MIME**: `application/json`
   - **URI**: `tourist`

## Estado del Proyecto

Este proyecto está en proceso de desarrollo y aún no está terminado. Algunas características pueden estar incompletas o sujetas a cambios.

## Cómo Ejecutar

1. Asegúrate de tener instaladas las dependencias necesarias utilizando `pnpm install`.
2. Ejecuta el servidor MCP con el siguiente comando:
   ```bash
   pnpm start
   ```

## Estructura del Proyecto

- `src/index.ts`: Archivo principal que configura el servidor MCP y define las herramientas y recursos.
- `src/tools/weather.ts`: Implementación de la herramienta para obtener el clima.
- `src/tools/flights.ts`: Implementación de la herramienta para buscar vuelos.
- `src/resources/airports.ts`: Implementación del recurso de base de datos de aeropuertos.

## Requisitos

- **Plataforma**:
  - Node.js
  - pnpm
- **Dependencias**:
  - `@modelcontextprotocol/sdk`: SDK para trabajar con el protocolo MCP.
  - `axios`: Biblioteca para realizar solicitudes HTTP.
- **Dependencias de desarrollo**:
  - `@types/node`: Tipos para Node.js.
  - `typescript`: Compilador de TypeScript.

## Comandos Disponibles

### Desarrollo

- `pnpm dev`: Ejecuta el servidor en modo de desarrollo con soporte para recarga en caliente y variables de entorno desde el archivo `.env`.

### Construcción

- `pnpm build`: Compila el proyecto TypeScript a JavaScript en la carpeta `dist`.

### Producción

- `pnpm start`: Construye el proyecto y ejecuta el servidor desde la carpeta `dist`.

### Inspector

- `pnpm inspector`: Ejecuta el inspector de Model Context Protocol para depurar el servidor.
