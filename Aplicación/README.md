# Agenda de Vacunación

Proyecto Django base para simular un flujo de agendamiento de vacunación con datos mock, validaciones en consola y pantallas alineadas al BPMN descrito.

## Incluye

- Inicio, login y registro.
- Pantalla principal con campañas, vacunas, puntos y horarios.
- Selección de campaña y cita.
- Confirmación de reserva o mensaje de no disponibilidad.
- Simulación de consultas y almacenamiento en memoria.

## Requisitos

- Python 3.10 o superior.
- pip.

## Instalación y ejecución

### Windows (PowerShell)

1. Crear entorno virtual:

```powershell
py -m venv .venv
```

2. Activar entorno virtual:

```powershell
.\.venv\Scripts\Activate.ps1
```

3. Instalar dependencias:

```powershell
pip install -r requirements.txt
```

4. Aplicar migraciones iniciales:

```powershell
python manage.py migrate
```

5. Levantar servidor:

```powershell
python manage.py runserver
```

6. Abrir en navegador:

http://localhost:8000/

### macOS / Linux

1. Crear entorno virtual:

```bash
python3 -m venv .venv
```

2. Activar entorno virtual:

```bash
source .venv/bin/activate
```

3. Instalar dependencias:

```bash
pip install -r requirements.txt
```

4. Aplicar migraciones iniciales:

```bash
python manage.py migrate
```

5. Levantar servidor:

```bash
python manage.py runserver
```

6. Abrir en navegador:

http://localhost:8000/

## Cómo probar el flujo BPMN

1. Entrar a Inicio.
2. Probar Login con usuario demo:
	Correo: demo@vacunacion.cl
	Clave: Demo1234
3. También puedes probar Registro creando una cuenta nueva.
4. Ir a Pantalla principal, luego Campañas y Agendamiento.
5. Confirmar una reserva y revisar la pantalla de Confirmación.
6. Probar escenario sin cupos con esta combinación:
	Campaña: COVID-19
	Vacuna: Spikevax
	Punto: Centro Comunitario Sur
	Resultado esperado: mensaje de no disponibilidad.

## Evidencia de simulación

Las validaciones y consultas a "base de datos" son simuladas y se muestran por consola con mensajes tipo:

- [Sistema] ...
- [DB] ...

## Notas

- No se requiere una base de datos real para esta primera versión.
- La capa de servicio usa estructuras en memoria para simular usuarios, campañas y reservas.
