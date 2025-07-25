# Proyecto Angular + API REST

Este repositorio contiene una aplicación web completa compuesta por un **frontend en Angular** y un **backend API REST** desarrollado con Node.js, Express y MongoDB. El sistema permite autenticación de usuarios, gestión de productos y roles (admin/user), y una interfaz moderna para la administración y visualización de productos.

---

## Estructura del Proyecto

- `/API REST/` — Backend: API RESTful con autenticación JWT, CRUD de productos y gestión de usuarios.
- `/frontend-angular/` — Frontend: Aplicación Angular para la interacción de usuarios con la API.

---

## Requisitos Generales
- Node.js >= 14
- npm >= 6
- MongoDB (local o Atlas)

---

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Proyecto-Angular
```

### 2. Configurar y ejecutar el Backend (API REST)

```bash
cd "API REST"
npm install
```

Crea un archivo `.env` con el siguiente contenido:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/api_rest
JWT_SECRET=tu_jwt_secreto
REFRESH_SECRET=tu_refresh_secreto
```

Inicia el servidor:

```bash
npm start
```

La API estará disponible en `http://localhost:3000/`

### 3. Configurar y ejecutar el Frontend (Angular)

En otra terminal, desde la raíz del proyecto:

```bash
cd frontend-angular
npm install
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

---

## Funcionalidades principales

### Backend (API REST)
- Registro e inicio de sesión de usuarios
- Autenticación con JWT y refresh tokens
- CRUD completo de productos
- Roles de usuario: admin y user
- Protección de rutas según autenticación y rol

#### Endpoints principales
- `POST /api/auth/register` — Registro de usuario
- `POST /api/auth/login` — Login y obtención de tokens
- `POST /api/auth/refresh` — Renovación de tokens
- `GET /api/products` — Listar productos (protegido)
- `POST /api/products` — Crear producto (admin)
- `PUT /api/products/:id` — Editar producto (admin)
- `DELETE /api/products/:id` — Eliminar producto (admin)

#### Estructura del backend
- `/controllers` — Lógica de negocio
- `/routes` — Definición de rutas
- `/models` — Modelos de datos (Mongoose)
- `/middlewares` — Middlewares de autenticación y roles
- `/config` — Configuración de base de datos y variables

### Frontend (Angular)
- Interfaz moderna para login, registro y gestión de productos
- Protección de rutas según autenticación y rol
- Consumo de la API REST
- Generado con [Angular CLI](https://github.com/angular/angular-cli)

#### Comandos útiles
- `ng serve` — Levanta el servidor de desarrollo
- `ng build` — Compila la aplicación para producción
- `ng test` — Ejecuta tests unitarios
- `ng e2e` — Ejecuta tests end-to-end (requiere configuración)

---

## Licencia
MIT 