# 📬 Node.js + Express + hMailServer + IIS Integration

Esta es una app web con un formulario para registrar correos, construida con **Node.js** y **Express**, diseñada para ejecutarse en **Windows Server** mediante **IIS** usando `iisnode`. Utiliza la librería **winax** para interactuar con **hMailServer** a través de objetos COM.

---

## 🛠️ Tecnologías Utilizadas

- 🟢 Node.js
- 🚂 Express.js
- 💾 hMailServer (a través de `winax`)
- 🧠 winax (ActiveX desde Node.js)
- 🖥️ IIS + iisnode
- 🧩 HTML + JS (Frontend básico)
- 🛢 MySQL

---
![Formulario](formulario_web.png)

## 📁 Estructura del Proyecto

```
node+express+hmailserver/
├── 📦 node_modules/         → Librerías instaladas con `npm`
├── 🗂️ src/
│   └── 📁 iisnode/          → Carpeta usada por IIS + iisnode (para logs/config)
├── 🌐 public/               → Archivos del frontend
│   ├── 📜 front.js         → JS del cliente (lógica en el navegador)
│   ├── 🧾 index.html       → Página principal del frontend
├── 🚀 app.js                → Servidor principal con Express
├── 🔌 con_db.js             → Archivo para conectar con la base de datos
├── 📄 package.json          → Configuración del proyecto y dependencias
├── 📄 package-lock.json     → Versiones exactas de las dependencias
├── 📘 README.md             → Documentación del proyecto
├── ⚙️ web.config            → Configuración para IIS + iisnode
```
---

## 🚀 Cómo Ejecutar el Proyecto

### 1. Clona este repositorio o descarga los archivos

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar hMailServer

Asegúrate de que hMailServer esté correctamente instalado en Windows. El módulo `winax` accede a objetos COM del sistema como este:

```javascript
const hMailServer = new ActiveXObject("hMailServer.Application");
```

⚠️ Ejecuta el servidor con permisos suficientes si vas a controlar servicios del sistema.

---

### 4. Ejecutar localmente (modo desarrollo)

```bash
node src/app.js
```

Accede en [http://localhost:3000](http://localhost:3000)

---

### 5. Ejecutar con IIS (iisnode)

#### Requisitos:

- IIS habilitado
- [iisnode](https://github.com/Azure/iisnode) instalado
- Archivo `web.config` en el directorio raíz del sitio

Configura un sitio IIS con la ruta al proyecto, y asegúrate de apuntar al `app.js`.

---

## 📦 Dependencias clave

```json
"dependencies": {
  "express": "^4.x",
  "winax": "^2.x"
}
```
---

## 🧪 Pruebas

Puedes usar la carpeta `iisnode/` para verificar errores (`stderr`) y salidas (`stdout`) cuando el servidor esté corriendo en IIS.

---
## 📬 uso de cuentas

inicia sesion en la app thunderbird o en la que prefieras con la informacion proporcionada despues de registrar tu cuenta.

---

---

## ⚠️ Licencia

Este proyecto es solo para fines educativos y de prueba. Uso bajo tu propio riesgo si se conecta a servidores reales.
