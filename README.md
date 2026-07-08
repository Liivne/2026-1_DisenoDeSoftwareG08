# 💉 VacunaGest

Sistema web para la gestión de campañas de vacunación desarrollado como proyecto para la asignatura **Ingeniería de Software**.

El sistema permite administrar campañas de vacunación, usuarios, vacunas, citas e historial de vacunación mediante una arquitectura cliente-servidor utilizando React, Node.js, Express, Prisma y PostgreSQL.

---

# Integrantes

- Martín Henríquez
- Ignacio Soto
- Leonardo Guerrero
- Martín Henriquez

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
- PostgreSQL 18
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

Debe tener los siguientes datos:

```env
DATABASE_URL="postgresql://neondb_owner:npg_w6dePV5rqkpa@ep-frosty-frog-ad1kbxxu-pooler.c-2.us-east-1.aws.neon.tech/vaccination_db?sslmode=require&channel_binding=require"
JWT_SECRET="un texto cualquiera" 
PORT=3000

BREVO_API_KEY="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"
```
Si no funciona poner un texto cualquiera en JWT_SECRET poner el del owner, aunque no debería ser necesario: 
dafdasf2vr32vrwvaf23vrrvfeafsddfawcfedvdsafdsd

Luego ejecutar

npx prisma generate
npx prisma migrate deploy
npm run dev

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

Crear un archivo `.env` utilizando `.env.example` como referencia. Solo es necesario renombrarlo, el contenido es el mismo.

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

## Funcionalidades generales

- Autenticación y registro de usuarios con JWT.
- Gestión de roles y control de acceso por tipo de usuario.
- Panel de inicio con métricas y resumen general.
- Gestión de campañas de vacunación con estado activo/inactivo.
- Gestión de vacunas, stock y detalles de cada vacuna.
- Gestión de puntos de vacunación y horarios disponibles.
- Gestión de citas de vacunación con estados de pendiente, confirmada, en proceso, completada, cancelada y ausente.
- Registro de vacunaciones y historial por usuario.
- Envío de notificaciones y correos de recordatorio.

## Administrador

- Dashboard administrativo con resumen del sistema.
- Gestión de usuarios, incluyendo creación y visualización por rol.
- Gestión de campañas de vacunación.
- Gestión de vacunas y stock.
- Gestión de puntos de vacunación.
- Gestión de notificaciones y mensajes del sistema.

## Personal de Salud

- Dashboard operativo para seguimiento de atención.
- Visualización de agenda de vacunación.
- Confirmación de citas agendadas.
- Inicio y seguimiento de atención en vacunación.
- Completar registros de vacunación.
- Registrar pacientes ausentes.
- Acceso a información de pacientes y registros asociados.

## Paciente

- Dashboard personal con información relevante.
- Agendamiento de citas de vacunación.
- Cancelación de citas pendientes.
- Consulta de historial de vacunación.
- Recepción de notificaciones del sistema.

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

#Video Demostración 
[Vídeo](https://youtu.be/QMB8HTJhgyw)
