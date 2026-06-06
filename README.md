# Diagrama de Comunicación: Agendamiento de Cita de Vacunación

## Descripción General

El diagrama de comunicación representa el proceso de creación de una cita de vacunación. Se utiliza un controlador 
artificial denominado **Controlador**, que actúa como intermediario entre el actor y las clases del dominio, aplicando
el patrón **GRASP Controlador**. Su responsabilidad es recibir la solicitud de agendamiento y coordinar las interacciones necesarias
para completar el caso de uso.

## Supuestos del Escenario

Se asume que el usuario ya ha seleccionado previamente la campaña en la que desea vacunarse. Además,
los datos de la persona ya se encuentran registrados en el sistema y han sido localizados y obtenidos antes de iniciar el proceso de agendamiento.

Al momento de invocar la operación de agendamiento, se dispone de la siguiente información:

- Punto de vacunación donde será atendido el usuario.
- Fecha y hora deseadas para la atención.
- Vacuna que el usuario desea recibir.

Estos elementos son entregados como parámetros al controlador.

## Verificación de Disponibilidad

Para determinar si es posible agendar la cita, el controlador consulta al **Punto de Vacunación**, el cual 
obtiene la información de disponibilidad desde los objetos **Horario** asociados.

En esta interacción se aplica el patrón **GRASP Experto en Información**, ya que la clase **Horario** posee 
los datos necesarios para conocer los cupos disponibles y la disponibilidad correspondiente a la fecha y hora solicitadas.

## Creación de la Cita

Una vez verificada la disponibilidad, la creación de la cita es delegada a la clase **Campaña**.

Esta decisión aplica el patrón **GRASP Creador**, debido a que una campaña administra e incluye múltiples citas
dentro de su contexto. Por ello, resulta natural asignarle la responsabilidad de crear nuevas instancias de **Cita** y
registrarlas dentro del proceso de vacunación.
