// Importar el componente TaskItem
import { TaskItem } from './TaskItem';

// Definir el componente funcional TaskList
export const TaskList = ({ tasks, onTaskCompleted, onTaskDeleted }) => {
  return (
    // Contenedor principal de la lista de tareas
    <div className='container'>
      {/* Fila de Bootstrap */}
      <div className='row'>
        {/* Columna de Bootstrap */}
        <div className='col'>
          {/* Tabla con estilos de Bootstrap para tabla oscura y efecto hover */}
          <table className='table table-dark table-hover'>
            {/* Encabezado de la tabla */}
            <thead>
              {/* Fila de encabezado con columnas "NOMBRE" y "ACCIONES" */}
              <tr>
                {/* Celda de encabezado "NOMBRE" con estilo de fondo negro */}
                <th className="text-center" style={{ backgroundColor: 'black' }}>NOMBRE</th>
                {/* Celda de encabezado "ACCIONES" con estilo de fondo negro */}
                <th className="text-center" style={{ backgroundColor: 'black' }}>ACCIONES</th>
              </tr>
            </thead>
            {/* Cuerpo de la tabla que contiene las filas de tareas */}
            <tbody>
              {/* Mapear cada tarea a un componente TaskItem */}
              {tasks.map((task) => (
                <TaskItem
                  key={task.id} // Propiedad única para React
                  task={task} // Datos de la tarea actual
                  onTaskCompleted={onTaskCompleted} // Función para marcar como completada
                  onTaskDeleted={onTaskDeleted} // Función para eliminar tarea
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
