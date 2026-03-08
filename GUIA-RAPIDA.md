# Guía Rápida - Calculadora de Pagos por Hora

## 🎯 Concepto

Esta aplicación lee automáticamente un archivo Excel desde **Google Drive** mediante una URL compartida configurada en una variable de entorno.

## ☁️ Setup Inicial (Solo una vez)

### 1. Prepara tu Excel en Google Drive

**Crea o sube un archivo Excel con 3 columnas:**

| Fecha      | Horas Trabajadas | Monto Total |
| ---------- | ---------------- | ----------- |
| 01/03/2026 | 8                | 120         |
| 02/03/2026 | 7.5              | 112.50      |

### 2. Comparte el archivo

1. Abre el archivo en Google Drive
2. Clic en **"Compartir"**
3. Cambia a **"Cualquier persona con el enlace"**
4. Permiso: **"Lector"**
5. **Copia el enlace**

### 3. Configura la URL en entorno

1. Crea el archivo `.env.local` en la raiz del proyecto
2. Agrega:

```bash
GOOGLE_DRIVE_EXCEL_URL="https://drive.google.com/file/d/tu-id/view?usp=sharing"
```

3. Inicia la app: `npm run dev`
4. Abre: http://localhost:3000

✅ ¡Listo! La aplicación leerá siempre esa URL.

## 📅 Uso Diario

### Agregar nuevos registros:

1. Abre tu Excel en Google Drive
2. Agrega nueva fila: Fecha | Horas | Monto
3. Guarda (se guarda automáticamente en Drive)

### Ver estadísticas:

1. Abre http://localhost:3000
2. La app se conecta automáticamente usando `GOOGLE_DRIVE_EXCEL_URL`
3. Clic en **"Actualizar"** si acabas de modificar el Excel
4. Alterna entre **"Por Semana"** y **"Por Mes"**

## 🔄 Flujo de Trabajo

```
Trabajas hoy
    ↓
Abres Excel en Drive
    ↓
Agregas: 08/03/2026 | 8 | 120
    ↓
Se guarda automáticamente
    ↓
Abres la aplicación
    ↓
Clic en "Actualizar"
    ↓
Ves tus estadísticas actualizadas
```

## 📊 Lo que muestra

### Resumen General (Banner azul)

- ✅ Total días trabajados
- ✅ Total horas acumuladas
- ✅ Total pagado
- ✅ Promedio por hora

### Vista Semanal

- Lunes a Domingo
- Total de horas por semana
- Total pagado por semana
- Detalle diario

### Vista Mensual

- Mes completo
- Total de horas del mes
- Total pagado del mes
- Detalle diario

## ⚡ Tips Importantes

1. **Siempre 3 columnas**: Fecha, Horas, Monto (en ese orden)
2. **Formato fecha**: DD/MM/AAAA (01/03/2026)
3. **Números decimales**: Usa punto (7.5, no 7,5)
4. **Guarda antes**: Guarda el Excel antes de actualizar la app
5. **No símbolos**: No uses €, $, ni separadores de miles

## 🆘 Problemas Comunes

### "No se pudo descargar el archivo"

```
✅ Solución:
1. Ve a Google Drive
2. Botón "Compartir"
3. "Cualquier persona con el enlace"
4. Copia el enlace nuevamente
```

### "Error al procesar el archivo"

```
✅ Verifica:
- 3 columnas (Fecha, Horas, Monto)
- Fechas en formato DD/MM/AAAA
- Números sin símbolos
- Sin filas vacías al inicio
```

### No se actualiza

```
✅ Pasos:
1. Guarda el Excel en Drive
2. Clic en "Actualizar" en la app
3. Si no funciona: revisa `.env.local` y reinicia el servidor
```

## 🔧 Comandos Útiles

```bash
# Iniciar aplicación
npm run dev

# Ver en navegador
# http://localhost:3000

# Detener aplicación
# Ctrl + C en la terminal
```

## 💡 Ejemplo Completo

**Lunes:**

```
08/03/2026 | 8 | 120
```

**Martes:**

```
09/03/2026 | 7.5 | 112.50
```

**Miércoles:**

```
10/03/2026 | 8 | 120
```

**En la app verás:**

- Semana 10 (08/03 - 14/03): 23.5 horas, €352.50
- Promedio: €15/hora

## 🎓 Ventajas de Google Drive

✅ **Acceso desde cualquier lugar**: Edita desde móvil, tablet, PC  
✅ **Sin instalaciones**: Solo necesitas un navegador  
✅ **Guardado automático**: No pierdes datos  
✅ **Historial de versiones**: Google guarda versiones anteriores  
✅ **Seguridad**: Solo tú controlas quién accede

---

**¿Necesitas más detalles?** Revisa el [README.md](README.md) completo
