// Importar los hooks useState y useEffect de React
import { useState, useEffect } from 'react';
// Importar la librería Swal para mostrar alertas interactivas
import Swal from 'sweetalert2';

// Definir el componente funcional TaskItem
export const TaskItem = ({ task, onTaskCompleted, onTaskDeleted }) => {
  // Estado local para el estado de completitud de la tarea
  const [completed, setCompleted] = useState(false);

  // Manejar el evento de completar tarea
  const handleComplete = () => {
    // Cambiar el estado de completed y llamar a la función proporcionada para marcar como completada
    setCompleted(!completed);
    onTaskCompleted(task.id);

    // Determinar el título del mensaje de Swal basado en el estado de completed
    const title = completed ? 'sin completar' : 'completada';

    // Mostrar alerta interactiva utilizando Swal
    Swal.fire({
      icon: 'success',
      title: `Tarea ${title}`,
      text: `La tarea "${task.name}" ha sido marcada como ${title}.`,
    });
  };

  // Manejar el evento de eliminar tarea
  const handleDelete = () => {
    // Llamar a la función proporcionada para eliminar la tarea
    onTaskDeleted(task.id);
  };

  // Efecto secundario que se ejecuta cuando cambia el estado de completitud
  useEffect(() => {
    // Mostrar mensaje en la consola cuando cambia el estado de completitud
    console.log(`Se cambió el estado de la tarea ${task.name} a ${completed}`);
  }, [completed]);

  // Renderizar una fila de la tabla con la información de la tarea
  return (
    <tr style={{ 
      textDecoration: completed ? 'line-through' : 'none', // Tachar el texto si la tarea está completada
      fontWeight: completed ? 'normal' : 'bold' }}>       {/* Cambiar el peso de la fuente según el estado de completitud */}
      {/* Celda para mostrar el nombre de la tarea centrado */}
      <td className="text-center">{task.name}</td>
      {/* Celda para acciones centradas, como completar y eliminar */}
      <td className="text-center" >
        {/* Botón para completar la tarea con icono condicional */}
        <button onClick={handleComplete}>
          {completed ? <i className="fa-solid fa-square-check"></i> : <i className="fa-regular fa-square-check"></i>}
        </button>
        {/* Botón para eliminar la tarea con icono */}
        <button
          onClick={handleDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  );
};

