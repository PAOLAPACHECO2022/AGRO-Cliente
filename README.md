#  Sistema de Gestión para Productos Agrícolas (MERN Stack)

¡Bienvenido al **Sistema de Gestión Agrícola**! Una solución integral diseñada para que los productores gestionen su perfil, seguridad y catálogo de productos de manera eficiente y moderna.

Este proyecto separa las responsabilidades en dos áreas principales: un **Backend** robusto encargado de la lógica y seguridad, y un **Frontend** dinámico para la interacción del usuario.

---

##  Tecnologías Utilizadas
El proyecto utiliza el stack **MERN** y herramientas complementarias:

* **Base de Datos:** MongoDB (Atlas)
* **Backend:** Express.js & Node.js
* **Frontend:** React.js
* **Diseño (UI/UX):** React-Bootstrap
* **Comunicación:** Axios (Peticiones HTTP)
* **Seguridad:** Bcrypt (Hash de claves) & JSON Web Tokens (JWT)



---

## 🚀 Cómo ejecutar la aplicación

### 1. Requisitos Previos
* **Node.js** instalado (versión 14 o superior).
* **MongoDB Atlas** (la conexión ya está configurada en el código).
* **Git** (opcional).

---

### 2. Configuración del Backend (Servidor)
Ubicado generalmente en la carpeta `/server` o `/backend`.

1.  Abre una terminal en la carpeta del servidor.
2.  Instala las dependencias necesarias:
    ```bash
    npm install express mongoose cors body-parser mongoose-unique-validator bcrypt jsonwebtoken
    ```
3.  **Conexión a la DB:** Verifica que el archivo use la siguiente URI:
    `mongodb+srv://agro_product:Jd3fL1NDPEWnP3Bn@cluster0.4akt0ql.mongodb.net/reactdb?appName=Cluster0`
4.  Inicia el servidor:
    ```bash
    node index.js
    ```
    > El servidor se ejecutará en el puerto **4000**.

---

### 3. Configuración del Frontend (React)
Ubicado generalmente en la carpeta `/client` o `/frontend`.

1.  Abre otra terminal en la carpeta del frontend.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia la aplicación:
    ```bash
    npm start
    ```
    > La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000).

---

##  Arquitectura y Funcionalidades
La aplicación está construida bajo una arquitectura de separación de responsabilidades:

* **Autenticación y Seguridad:** Sistema de registro e inicio de sesión con encriptación **Bcrypt** y protección de rutas mediante **JWT**.
* **Perfil de Usuario (CRUD):** Módulo para consultar y actualizar datos personales. Incluye lógica para cambio de contraseña (solo se actualiza si el usuario ingresa un nuevo valor).
* **Interfaz Moderna:** Uso de **React-Bootstrap** para una experiencia clara y adaptada al contexto agrícola.
* **Persistencia de Sesión:** Empleo de `localStorage` para mantener al usuario conectado y cargar su perfil usando la **cédula** tras el redireccionamiento.

---

## 📋 Supuestos Realizados
* **Cédula como ID Único:** Se considera que la cédula es un número único e inmutable, usado como parámetro principal en rutas de actualización (`/users/update/:cedula`).
* **Seguridad CORS:** El backend permite peticiones desde `localhost:3000`.
* **Estado de Autenticación:** Se asume el envío del token JWT en los encabezados de Axios (`auth-token`) para rutas protegidas.
* **Imágenes de Perfil:** Se utiliza una URL genérica para la foto de perfil ante la falta de un servidor de almacenamiento externo (como S3).
* **Conectividad:** Es indispensable contar con conexión estable a internet para comunicar con el clúster de **MongoDB Atlas**.

---
Desarrollado con ❤️ para la gestión del sector agrícola.
