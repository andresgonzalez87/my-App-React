// Importar el hook useState de React
import { useState } from 'react';
// Importar el archivo de estilos del componente TaskForm
import '../styles/TaskForm.css';

// Definir el componente funcional TaskForm
export const TaskForm = ({ onAddTask }) => {
    // Estado local para almacenar el nombre de la tarea
    const [taskName, setTaskName] = useState('');

    // Manejar cambios en la entrada de texto
    // Declaración de una función llamada handleInputChange que toma un evento (e) como parámetro
const handleInputChange = (e) => {
    // Utilizar la función setTaskName para actualizar el estado taskName con el valor del campo de entrada (input) en el evento
    setTaskName(e.target.value);
  };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        // Prevenir el comportamiento predeterminado del evento
        e.preventDefault();
        // Verificar si el nombre de la tarea está vacío o solo contiene espacios
        if (!taskName.trim()) return;
        // Llamar a la función proporcionada para agregar la tarea
        onAddTask(taskName);
        // Limpiar el campo de entrada después de agregar la tarea
        setTaskName('');
    };

    // Renderizar el componente TaskForm
    return (
        // Contenedor principal del formulario con clases de Bootstrap
        <div className='container mb-3 d-flex justify-content-center'>
            {/* Formulario con manejo de eventos onSubmit */}
            <form 
                onSubmit={handleSubmit}
                className="text-center"
            >
                {/* Contenedor del campo de entrada */}
                <div className="mb-3">
                    {/* Etiqueta invisible para mejorar accesibilidad */}
                    <label className="form-label"></label>
                    {/* Campo de entrada de texto con estilos de Bootstrap */}
                    <input
                        type="text"
                        placeholder="Nombre de la tarea"
                        value={taskName}
                        onChange={handleInputChange}
                        className='form-control input-css'
                    />
                </div>
                {/* Botón de submit con estilos de Bootstrap */}
                <button type="submit" className="btn btn-dark mb-5 btn-sm">Agregar</button>
            </form>
        </div>
    );
};
