# Descripción de Seguridad Básica

## Esquema de Seguridad del Sistema de Gestión de Campañas de Vacunación

### Identificación

Cada usuario posee una identidad única dentro del sistema, representada por su RUT. El RUT permite identificar al  usuario antes del proceso de autenticación.

### Autenticación

El sistema requiere que todos los usuarios se autentiquen antes de acceder a funcionalidades protegidas. Cada usuario dispone de un identificador único (RUT) y una contraseña almacenada de forma segura mediante algoritmos de hash.

Durante el inicio de sesión, el sistema valida las credenciales ingresadas y verifica que correspondan a un usuario registrado. Si la autenticación es exitosa, se genera un token de sesión.

---

### Gestión de Sesión mediante Token

La gestión de sesiones se realiza mediante **JSON Web Tokens (JWT)**.

Una vez autenticado, el usuario recibe un token firmado digitalmente que contiene información relevante para la autorización:

* Identificador del usuario.
* Rol asignado.
* Fecha y hora de expiración.

El token debe enviarse en cada solicitud a recursos protegidos. Antes de procesar la petición, el sistema valida:

* Integridad del token.
* Firma digital.
* Fecha de expiración.
* Estado del usuario.

Si el token no es válido o ha expirado, el acceso es rechazado.

---

### Roles del Sistema

El sistema utiliza un esquema de control de acceso basado en roles.

#### Ciudadano

Permisos:

* Consultar su historial de vacunación.
* Consultar campañas activas.
* Descargar certificados de vacunación.

#### Funcionario de Salud

Permisos:

* Registrar vacunaciones.
* Consultar historiales de vacunación.
* Actualizar información relacionada con campañas.

#### Coordinador

Permisos:

* Crear y gestionar campañas de vacunación.
* Gestionar centros de vacunación.
* Gestionar usuarios del sistema.
* Consultar estadísticas.

---

### Control de Acceso

El acceso a los recursos se controla mediante la combinación de autenticación y roles.

Antes de ejecutar cualquier operación protegida, el sistema verifica:

1. Que el usuario esté autenticado.
2. Que el token sea válido.
3. Que el rol posea los permisos necesarios.
4. Que el usuario tenga autorización sobre el recurso solicitado.

#### Reglas de acceso específicas

* Un ciudadano solo puede acceder a su propio historial de vacunación.
* Un funcionario puede consultar historiales de pacientes para fines autorizados.
* Solo el coordinador puede gestionar campañas, supervisar vacunadores y administrar usuarios del sistema.

Si un usuario intenta realizar una operación que no corresponde a su rol, el acceso es denegado.

---

### Auditoría

Las acciones relevantes quedan registradas para asegurar trazabilidad y control.

Se almacenan eventos tales como:

* Inicio de sesión.
* Cierre de sesión.
* Consulta de historiales.
* Registro de vacunaciones.
* Creación o modificación de campañas.
* Gestión de usuarios.

Cada registro incluye:

* Usuario responsable.
* Fecha y hora.
* Acción realizada.
* Resultado de la operación.

---

## Secuencia de Autenticación

```text
Usuario
   |
   | 1. Ingresa RUT y contraseña
   v
Sistema
   |
   | 2. Verifica credenciales
   v
Base de Datos
   |
   | 3. Devuelve información del usuario
   v
Sistema
   |
   | 4. Genera JWT
   v
Usuario
   |
   | 5. Solicita recurso protegido
   |    enviando JWT
   v
Control de Acceso
   |
   | 6. Valida token
   | 7. Verifica rol y permisos
   |
   +--> Acceso permitido
   |         |
   |         v
   |     Recurso solicitado
   |
   +--> Acceso denegado
             |
             v
      Mensaje de error
```

### Resumen

La seguridad del sistema se basa en autenticación mediante credenciales, gestión de sesiones mediante JWT, control de acceso basado en roles y validaciones específicas sobre recursos sensibles. Este enfoque permite proteger la información médica de los ciudadanos, garantizar que cada usuario acceda únicamente a las funcionalidades autorizadas y mantener trazabilidad sobre todas las operaciones realizadas dentro del sistema.
