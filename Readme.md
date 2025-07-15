# MCP Weather Travel Assistant

## Descripción

Este proyecto es un asistente basado en el protocolo Model Context Protocol (MCP) que proporciona herramientas y recursos para consultar información sobre el clima y vuelos, así como una base de datos de aeropuertos. Actualmente, el proyecto está en desarrollo y no está terminado.

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

### Recursos

1. **airports**
   - **Descripción**: Base de datos de aeropuertos.
   - **MIME**: `application/json`
   - **URI**: `airports`

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

- Node.js
- pnpm
