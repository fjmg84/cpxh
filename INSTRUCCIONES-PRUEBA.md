# Instrucciones para Probar la Aplicación

## 🧪 Prueba con un Archivo de Ejemplo

Para probar la aplicación, necesitas crear un archivo Excel en Google Drive. Aquí te mostramos cómo:

### 1. Crear el archivo de prueba

#### Opción A: Crear en Google Sheets

1. Ve a [Google Drive](https://drive.google.com)
2. Haz clic en "Nuevo" > "Hojas de cálculo de Google"
3. Crea una hoja con estos datos:

| Fecha      | Horas Trabajadas | Monto Total |
| ---------- | ---------------- | ----------- |
| 01/03/2026 | 8                | 120         |
| 02/03/2026 | 7.5              | 112.50      |
| 03/03/2026 | 8                | 120         |
| 04/03/2026 | 6                | 90          |
| 05/03/2026 | 8.5              | 127.50      |
| 08/03/2026 | 8                | 120         |
| 09/03/2026 | 7                | 105         |
| 10/03/2026 | 8                | 120         |

4. Guárdalo con el nombre que prefieras (ej: "Mis Horas de Trabajo")

#### Opción B: Subir archivo Excel

1. Crea un archivo Excel (.xlsx) en tu computadora con los datos anteriores
2. Súbelo a Google Drive

### 2. Compartir el archivo

1. Abre el archivo en Google Drive
2. Haz clic en el botón **"Compartir"** (arriba a la derecha)
3. En la sección "Acceso general", haz clic en **"Restringido"**
4. Selecciona **"Cualquier persona con el enlace"**
5. Asegúrate de que el permiso sea **"Lector"** (no "Editor")
6. Haz clic en **"Copiar enlace"**
7. Haz clic en **"Listo"**

### 3. Usar en la aplicación

1. Crea `.env.local` en la raiz del proyecto
2. Agrega la variable:

```bash
GOOGLE_DRIVE_EXCEL_URL="https://drive.google.com/file/d/1AbC2dEf3GhI4jKl5MnO6pQr7StU8vWx9YzA/view?usp=sharing"
```

3. Inicia la aplicación: `npm run dev`
4. Abre http://localhost:3000

### 4. Probar funcionalidades

Una vez cargados los datos:

✅ **Ver resumen general** (banner azul con totales)
✅ **Cambiar a vista semanal** (botón "Por Semana")
✅ **Cambiar a vista mensual** (botón "Por Mes")
✅ **Actualizar datos**: Modifica el Excel en Drive y haz clic en "Actualizar"
✅ **Cambiar archivo**: actualiza `GOOGLE_DRIVE_EXCEL_URL` y reinicia el servidor

## 🔍 Ejemplo de URL válida

Una URL de Google Drive se ve así:

```
https://drive.google.com/file/d/1AbC2dEf3GhI4jKl5MnO6pQr7StU8vWx9YzA/view?usp=sharing
```

La aplicación automáticamente la convertirá al formato de descarga:

```
https://drive.google.com/uc?export=download&id=1AbC2dEf3GhI4jKl5MnO6pQr7StU8vWx9YzA
```

## ⚠️ Importante para la Prueba

- El archivo **DEBE** estar compartido como "Cualquier persona con el enlace"
- El formato del Excel debe tener **exactamente 3 columnas** en el orden especificado
- Las fechas deben ser reconocibles (DD/MM/AAAA es ideal)
- Los números pueden usar punto decimal (7.5)

## 🎯 Qué deberías ver

Con los datos de ejemplo anteriores verás:

### Vista Semanal

- **Semana 1** (01/03 - 07/03): 38 horas, €570
- **Semana 2** (08/03 - 14/03): 23 horas, €345

### Vista Mensual

- **Marzo 2026**: 61 horas, €915, promedio €15/hora

## 🐛 Si algo no funciona

1. Verifica que el archivo esté compartido correctamente
2. Comprueba que `GOOGLE_DRIVE_EXCEL_URL` tenga una URL correcta (`drive.google.com`)
3. Asegúrate de que el Excel tenga 3 columnas
4. Revisa la consola del navegador (F12) para ver errores detallados

---

**Listo para probar:** Una vez tengas `GOOGLE_DRIVE_EXCEL_URL` configurada, la aplicación funcionará sin pedir la URL en la interfaz.
