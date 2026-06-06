Resumen del modelo de dominio

Este documento sintetiza la estructura y las reglas principales para la gestión del proceso de vacunación, organizado en tres flujos: actores, planificación y atención clínica.

1. Actores y roles

La clase Persona agrupa los atributos comunes (nombre, RUT, contacto) y se especializa en Coordinador, Funcionario y Ciudadano. La navegabilidad de la herencia va desde las clases especializadas hacia Persona.

Coordinador: gestiona campañas y registra puntos de vacunación. La navegabilidad apunta a las entidades que administra; multiplicidad 1..1 exige un responsable para cada campaña y punto.

Funcionario: aplica vacunaciones y registra ciudadanos. La navegabilidad desde Vacunacion permite identificar al aplicador; multiplicidad 0..* admite múltiples acciones por funcionario.

Ciudadano: agenda citas y recibe vacunaciones; las relaciones bidireccionales permiten consultar historial y citas desde ambas direcciones.

2. Planificación y disponibilidad

Campaña organiza las vacunaciones y las citas durante su vigencia y se ejecuta en uno o más PuntoVacunacion. La relación muchos-a-muchos con PuntoVacunacion usa la asociación PlanificacionLocal (atributos: stock, meta_adhesion) para datos específicos campaña–punto.

La disponibilidad se modela con Horario. Un PuntoVacunacion define varios horarios con cupos y una Cita se reserva en un horario concreto; en ambos casos la navegabilidad se dirige hacia Horario.

3. Agendamiento y ejecución clínica

Cita vincula ciudadano, punto, horario y campaña. Las multiplicidades 1..1 hacia PuntoVacunacion y Horario garantizan lugar y momento definidos. Se separa el acto administrativo (Cita) del clínico (Vacunacion): no toda cita termina en vacunación, pero toda Vacunacion debe referenciar una cita previa.

Vacunacion registra punto, vacuna administrada (1..1), funcionario aplicador y ciudadano receptor, asegurando trazabilidad (vacuna, laboratorio, dosis) y permitiendo auditoría.

4. Control y Comportamiento Dinámico (Integración de Casos de Uso)
Para satisfacer el comportamiento modelado en los diagramas de comunicación ("Consultar Historial" y "Agendar Cita") sin comprometer la pureza del modelo de dominio, se establecieron las siguientes decisiones de diseño y asignación de responsabilidades:

Patrón Controlador: Se incorporó la clase lógica SistemaVacunacion <<Controller>> para actuar como punto de entrada de las peticiones del actor. Esta clase carece de atributos (no tiene estado permanente) y se vincula con el modelo estructural mediante relaciones de dependencia temporal (<<use>>) hacia Persona, Campaña y PuntoVacunacion. Al ser dependencias transitorias, estas no poseen multiplicidad.

Distribución de Métodos (Consulta de Historial): Aplicando el principio de alta cohesión y aprovechando la herencia, la responsabilidad de ubicar a un individuo recae en el método estático buscarPersona(rut) de la clase padre Persona. Sin embargo, la obtención clínica del historial (getVacunaciones()) se asignó específicamente a la clase hija Ciudadano, por ser esta la entidad que posee la asociación estructural con la vacunación. Para acceder al detalle del acto clínico, la clase transaccional Vacunacion expone los métodos de acceso a su contexto (getVacuna(), getCampaña(), getPuntoVacunacion()).

Distribución de Métodos (Agendamiento): El flujo de creación de citas se delega en cascada. El controlador inicia el proceso enviando el mensaje agendarCita(fechaDeseada, puntoV, vacuna) a Campaña. La validación física se delega a PuntoVacunacion (verificarDisponibilidadPunto(...)) y a Horario (cuposDisponibles(...)). Finalmente, si existe disponibilidad, la instanciación se refleja mediante la llamada al método constructor <<create>> Cita(hr, puntoV, vacuna) en la clase Cita.