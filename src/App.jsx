// Importar las dependencias necesarias de React y otros módulos
import React, { useState, useEffect } from 'react';
import { TaskList } from './components/TaskList'; // Importar el componente TaskList
import { TaskForm } from './components/TaskForm'; // Importar el componente TaskForm
import Swal from 'sweetalert2'; // Importar SweetAlert2 para mensajes de alerta
import withReactContent from 'sweetalert2-react-content'; // Integrar SweetAlert2 con React

// Crear una instancia de SweetAlert2 con React
const mySwal = withReactContent(Swal);

// Definir el componente principal de la aplicación
export const App = () => {
  // Obtener tareas almacenadas en localStorage o usar un array vacío si no hay ninguna
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Definir el estado de las tareas usando el hook useState
  const [tasks, setTasks] = useState(storedTasks);

  // Manejar la acción de completar una tarea
  // Declaración de una función llamada handleTaskCompleted que toma un parámetro taskId
const handleTaskCompleted = (taskId) => {
  // Llamada a la función setTasks proporcionada por el hook useState para actualizar el estado tasks
  setTasks((prevTasks) => 
    // Utilización del método map para crear un nuevo array basado en el array anterior (prevTasks)
    prevTasks.map((task) => 
      // Operador ternario que verifica si la id de la tarea actual coincide con la id proporcionada (taskId)
      task.id === taskId 
        // Si la id coincide, crea un nuevo objeto tarea copiando las propiedades existentes y cambiando el valor de la propiedad completed
        ? { ...task, completed: !task.completed } 
        // Si la id no coincide, devuelve la tarea sin cambios
        : task
    )
  );
};


  // Manejar la acción de eliminar una tarea
  // Declaración de una función llamada handleTaskDeleted que toma un parámetro taskId
const handleTaskDeleted = (taskId) => {
  // Llamada a la función setTasks proporcionada por el hook useState para actualizar el estado tasks
  setTasks((prevTasks) => 
    // Utilización del método filter para crear un nuevo array que excluye la tarea con la id proporcionada (taskId)
    prevTasks.filter((task) => task.id !== taskId)
  );
};


  // Mostrar un cuadro de confirmación antes de eliminar una tarea
  const confirmDelete = (taskId) => {
    mySwal.fire({
      title: '¿Estás seguro de eliminar la tarea?',
      text: 'No podrás revertirlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleTaskDeleted(taskId);
        // Mostrar un mensaje de éxito después de eliminar la tarea
        Swal.fire('Eliminada!', 'La tarea ha sido eliminada con éxito.', 'success');
      }
    });
  };

  // Manejar la acción de agregar una nueva tarea
  // Declaración de una función llamada handleAddTask que toma un parámetro taskName
const handleAddTask = (taskName) => {
  // Crear una nueva tarea con un objeto que tiene una id única, el nombre de la tarea y se establece como no completada
  const newTask = {
    id: new Date().getTime(),  // Se utiliza la marca de tiempo actual como id para asegurar unicidad
    name: taskName,            // Nombre de la tarea proporcionado como parámetro
    completed: false,          // Nueva tarea se establece como no completada por defecto
  };
  // Actualizar el estado de las tareas utilizando la función setTasks proporcionada por el hook useState
  // Se utiliza una función de flecha con la forma (prevTasks) => [...] para garantizar la correcta actualización del estado basado en el estado anterior (prevTasks)
  setTasks((prevTasks) => [...prevTasks, newTask]);
};


  // Efecto secundario que se ejecuta cuando el estado de las tareas cambia
  useEffect(() => {
    // Guardar tareas en localStorage cuando cambian
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('La lista de tareas se ha actualizado:', tasks);
  }, [tasks]);

  // Renderizar la interfaz de usuario de la aplicación
  return (
    <div>
      <h1 className='text-center'>Aplicación de Tareas</h1>
      {/* Componente para agregar nuevas tareas */}
      <TaskForm onAddTask={handleAddTask} />
      {/* Componente para mostrar la lista de tareas */}
      <TaskList
        tasks={tasks}
        onTaskCompleted={handleTaskCompleted}
        onTaskDeleted={confirmDelete}
      />
    </div>
  );
};

