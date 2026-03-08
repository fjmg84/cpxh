# Calculadora de Pagos por Hora 💰

Aplicación web desarrollada con Next.js que lee automáticamente un archivo Excel desde Google Drive para calcular y analizar los pagos recibidos por un trabajador.

## 🌟 Características

- **Conexión con Google Drive**: Lee el Excel directamente desde Google Drive usando una URL configurada en variable de entorno
- **Sin ingreso manual de URL**: La aplicación nunca pide enlaces en la interfaz
- **Actualización en tiempo real**: Botón para refrescar los datos cuando el Excel cambia
- **Vista semanal**: Visualiza tus pagos agrupados por semanas
- **Vista mensual**: Analiza tus ingresos mensuales
- **Estadísticas generales**: Resumen con totales de horas, pagos y promedios
- **Interfaz intuitiva**: Diseño limpio y fácil de usar
- **Configuración centralizada**: La URL se define una sola vez en `.env.local`

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **XLSX** - Lectura de archivos Excel

## 📋 Archivo Excel en Google Drive

### Preparar tu archivo Excel:

1. **Crea un archivo Excel** en Google Drive (o sube uno existente)
2. El archivo debe contener **3 columnas** en este orden:
   - **Columna 1**: Fecha (formato: DD/MM/AAAA)
   - **Columna 2**: Horas Trabajadas (número decimal, ej: 8, 7.5, 10.25)
   - **Columna 3**: Monto Total Pagado (número decimal, ej: 120, 112.50, 200)

### Ejemplo de estructura:

| Fecha      | Horas Trabajadas | Monto Total |
| ---------- | ---------------- | ----------- |
| 01/03/2026 | 8                | 120         |
| 02/03/2026 | 7.5              | 112.50      |
| 03/03/2026 | 8                | 120         |

### 🔗 Compartir el archivo:

1. Abre tu archivo Excel en Google Drive
2. Haz clic en el botón **"Compartir"** (arriba a la derecha)
3. En "Acceso general", selecciona **"Cualquier persona con el enlace"**
4. Asegúrate de que el permiso sea **"Lector"** (o superior)
5. Copia el enlace generado
6. Guarda ese enlace en la variable de entorno `GOOGLE_DRIVE_EXCEL_URL`

**Importante:** Sin este paso, la aplicación no podrá leer tu archivo.

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn
- Una cuenta de Google Drive

### Pasos de instalación

1. Las dependencias ya están instaladas

2. Crea el archivo `.env.local` con la URL compartida:

```bash
GOOGLE_DRIVE_EXCEL_URL="https://drive.google.com/file/d/tu-id/view?usp=sharing"
```

3. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

4. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## 📱 Cómo usar la aplicación

### Primera vez:

1. **Prepara tu Excel** en Google Drive con 3 columnas (Fecha, Horas, Monto)
2. **Comparte el archivo** como "Cualquier persona con el enlace"
3. **Copia el enlace** del archivo
4. **Pega el enlace** en `GOOGLE_DRIVE_EXCEL_URL` dentro de `.env.local`
5. **Abre la aplicación** en http://localhost:3000

### Uso diario:

1. **Actualiza tu Excel** en Google Drive (agrega nuevos registros de trabajo)
2. **Abre la aplicación** (usará la URL configurada en entorno)
3. **Haz clic en "Actualizar"** si acabas de modificar el Excel
4. **Cambia entre vistas** (semanal/mensual) según necesites

### 🔄 Flujo de trabajo recomendado:

1. Cada día que trabajas, agrega una fila en tu Excel de Google Drive
2. Abre la aplicación web cuando quieras revisar tus estadísticas
3. Si cambias de archivo, actualiza `GOOGLE_DRIVE_EXCEL_URL` y reinicia el servidor
4. Haz clic en "Actualizar" para ver los últimos cambios del Excel

## 📊 Características de las vistas

### Vista Semanal

- Agrupa los datos por semana (Lunes a Domingo)
- Muestra el rango de fechas de cada semana
- Total de horas y pagos por semana
- Promedio por hora
- Detalle de cada día trabajado

### Vista Mensual

- Agrupa los datos por mes
- Muestra la cantidad de días trabajados
- Total de horas y pagos por mes
- Promedio por hora
- Detalle de cada día trabajado

### Resumen General

- Total de días trabajados
- Total de horas trabajadas
- Total pagado acumulado
- Promedio por hora global

## 🏗️ Estructura del Proyecto

```
yamila/
├── app/
│   ├── api/
│   │   └── datos/
│   │       └── route.ts      # API que descarga y procesa el Excel
│   ├── globals.css           # Estilos globales
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página principal con lógica
├── components/
│   ├── StatsSummary.tsx      # Resumen de estadísticas
│   ├── WeeklyView.tsx        # Vista semanal
│   └── MonthlyView.tsx       # Vista mensual
├── types/
│   └── index.ts              # Definiciones TypeScript
├── utils/
│   └── dataProcessing.ts     # Funciones de procesamiento
└── package.json
```

## 🔒 Seguridad y Privacidad

- **No se almacenan datos en el servidor**: Todo se procesa en tiempo real
- **URL en servidor**: La URL de Google Drive vive en variable de entorno
- **No hay base de datos**: No guardamos tu información en ningún servidor
- **Lectura directa**: Descargamos el Excel solo cuando lo solicitas
- **Sin autenticación**: No necesitas iniciar sesión con Google

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Iniciar en producción
npm start

# Linting
npm run lint
```

## 🎨 Personalización

Puedes personalizar la aplicación modificando:

- **Formato de moneda**: Edita la función `formatCurrency` en `utils/dataProcessing.ts`
- **Colores**: Modifica las clases de Tailwind en los componentes
- **Inicio de semana**: Ajusta la función `getStartOfWeek` en `utils/dataProcessing.ts`

## 🐛 Solución de Problemas

### "No se pudo descargar el archivo"

- **Verifica que el archivo esté compartido** como "Cualquier persona con el enlace"
- **Comprueba el permiso**: Debe ser al menos "Lector"
- **Revisa la URL**: Copia el enlace directamente desde el botón "Compartir" de Google Drive

### "Error al procesar el archivo Excel"

- Verifica que las columnas estén en el orden correcto (Fecha, Horas, Monto)
- Asegúrate de que los números no contengan caracteres especiales (excepto punto decimal)
- Revisa que las fechas estén en un formato reconocible (DD/MM/AAAA)
- No debe haber filas vacías al inicio del archivo

### Los datos no se actualizan

- Guarda los cambios en tu Excel de Google Drive
- Haz clic en el botón "Actualizar" en la aplicación
- Si el problema persiste, haz clic en "Cambiar Excel" e ingresa la URL nuevamente

### "URL de Google Drive no válida"

- Asegúrate de copiar la URL completa desde Google Drive
- La URL debe verse similar a: `https://drive.google.com/file/d/...`
- No uses URLs acortadas o modificadas
- Verifica el valor de `GOOGLE_DRIVE_EXCEL_URL`

## 🔄 Cambiar el archivo Excel

### Opción 1: Cambiar la variable de entorno

1. Edita `.env.local`
2. Cambia `GOOGLE_DRIVE_EXCEL_URL` por la nueva URL
3. Reinicia el servidor (`npm run dev`)

### Opción 2: Actualizar el mismo archivo

1. Edita tu Excel en Google Drive
2. Guarda los cambios
3. En la aplicación, haz clic en "Actualizar"

### Opción 3: Verificar configuración activa

1. Revisa que `.env.local` exista en la raiz del proyecto
2. Revisa que el nombre sea exactamente `GOOGLE_DRIVE_EXCEL_URL`
3. Reinicia el servidor después de cualquier cambio

---

Desarrollado con ❤️ usando Next.js y TypeScript
