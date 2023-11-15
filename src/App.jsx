import React, { useState, useEffect } from 'react';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mySwal = withReactContent(Swal);

export const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const confirmDlete = (taskId) => {
    mySwal.fire({
      title:`¿Estás seguro de eliminar la tarea?`,
      text: "No podrás revertirlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: 'Cancelar' 
    }).then((result) => {
      if (result.isConfirmed) {
        handleTaskDeleted(taskId)
        Swal.fire(
          'Eliminada!',
          `La tarea ha sido eliminada con éxito.`,
          'success'
        )
      }
    })
  }

  const handleAddTask = (taskName) => {
    const newTask = {
      id: new Date().getTime(),
      name: taskName,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    console.log('La lista de tareas se ha actualizado:', tasks);
  }, [tasks]);

  return (
    <div>
      <h1>Aplicación de Lista de Tareas</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onTaskCompleted={handleTaskCompleted}
        onTaskDeleted={confirmDlete}
      />
    </div>
  );
};