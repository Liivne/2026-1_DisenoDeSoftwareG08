# 💉 VacunaGest

Sistema web para la gestión de campañas de vacunación desarrollado como proyecto para la asignatura **Ingeniería de Software**.

El sistema permite administrar campañas de vacunación, usuarios, vacunas, citas e historial de vacunación mediante una arquitectura cliente-servidor utilizando React, Node.js, Express, Prisma y PostgreSQL.

---

# Integrantes

- Martín Henríquez
- (Agregar integrantes del equipo)

---

# Tecnologías utilizadas

## Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router

## Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

---

# Arquitectura

El proyecto se encuentra dividido en dos aplicaciones independientes.

```
Aplicación
│
├── backend
└── frontend
```

- **Frontend:** interfaz de usuario desarrollada en React.
- **Backend:** API REST encargada de la lógica de negocio y acceso a la base de datos.

---

# Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js 20 o superior
- PostgreSQL
- Git
- npm

---

# Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd Aplicación
```

---

# Configuración del Backend

Entrar al directorio:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` utilizando `.env.example` como referencia.

Ejemplo:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/vaccination_db"
JWT_SECRET="super_secret_key"
PORT=3000
```

Generar Prisma Client:

```bash
npx prisma generate
```

Ejecutar las migraciones:

```bash
npx prisma migrate dev
```

Si el proyecto posee datos iniciales:

```bash
npx prisma db seed
```

Iniciar el servidor:

```bash
npm run dev
```

El backend quedará disponible en:

```
http://localhost:3000
```

---

# Configuración del Frontend

Abrir otra terminal.

Entrar al directorio:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` utilizando `.env.example` como referencia.

Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api
```

Ejecutar:

```bash
npm run dev
```

Abrir:

```
http://localhost:5173
```

---

# Orden de ejecución

El proyecto requiere ejecutar ambos servicios.

Terminal 1:

```bash
cd backend
npm install
npm run dev
```

Terminal 2:

```bash
cd frontend
npm install
npm run dev
```

---

# Funcionalidades implementadas

## Administrador

- Dashboard administrativo
- Gestión de campañas
- Gestión de vacunas
- Gestión de usuarios
- Gestión de notificaciones

## Personal de Salud

- Dashboard operativo
- Agenda diaria de vacunación
- Confirmar citas
- Iniciar atención
- Completar vacunación
- Registrar pacientes ausentes

## Paciente

- Dashboard personal
- Agendar citas
- Cancelar citas
- Historial de vacunación
- Notificaciones

---

# Base de datos

La aplicación utiliza PostgreSQL administrado mediante Prisma ORM.

Para aplicar cambios al esquema:

```bash
npx prisma migrate dev
```

Si únicamente se modificó el esquema y no existen migraciones nuevas:

```bash
npx prisma generate
```

---

# Variables de entorno

Por seguridad, los archivos `.env` no forman parte del repositorio.

Cada integrante debe crear:

```
backend/.env
frontend/.env
```

utilizando los archivos:

```
backend/.env.example
frontend/.env.example
```

como referencia.

---

# Estado del proyecto

Actualmente el sistema implementa las funcionalidades principales requeridas para la gestión de campañas de vacunación y continúa en desarrollo con mejoras orientadas a experiencia de usuario, reportes y funcionalidades complementarias.

---

# Licencia

Proyecto desarrollado con fines exclusivamente académicos.