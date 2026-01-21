#  Sistema de Gestión para Productos Agrícolas (MERN Stack)

¡Bienvenido al **Sistema de Gestión Agrícola**! Una solución integral desarrollada con el stack **MERN** (MongoDB, Express, React, Node.js) diseñada para que los productores gestionen su perfil, seguridad y catálogo de productos de manera eficiente y moderna.

---

##  Descripción
Esta aplicación permite a los usuarios:
* **Registrarse e Iniciar Sesión** con altos estándares de seguridad.
* **Gestionar el Perfil Personal** con actualizaciones en tiempo real.
* **Administrar Productos** agrícolas de forma práctica.

---

##  Tecnologías Utilizadas
El proyecto utiliza las siguientes herramientas:

| Tecnología | Propósito |
| :--- | :--- |
| **MongoDB Atlas** | Base de Datos NoSQL en la nube |
| **Express.js** | Framework para el servidor (Backend) |
| **React.js** | Biblioteca para la interfaz de usuario (Frontend) |
| **Node.js** | Entorno de ejecución de JavaScript |
| **React-Bootstrap** | Framework de diseño UI/UX |
| **Axios** | Cliente HTTP para peticiones al servidor |
| **Bcrypt / JWT** | Encriptación y autenticación segura |

---

##  Cómo ejecutar la aplicación

### 1. Requisitos Previos
Antes de empezar, asegúrate de tener instalado:
* **Node.js** (Versión 14 o superior).
* **MongoDB Atlas** (La conexión ya está configurada en el código).
* **Git** (Opcional).

### 2. Configuración del Backend (Servidor)
Navega a la carpeta del servidor y ejecuta los siguientes comandos:

```bash
# Entrar a la carpeta
cd servidor

# Instalar dependencias
npm install express mongoose cors body-parser mongoose-unique-validator bcrypt jsonwebtoken

# Iniciar el servidor
node index.js

---
### Configuración del Frontend (React)

Abre una nueva terminal en la carpeta del frontend y ejecuta:

# Entrar a la carpeta
cd cliente

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
