import { TaskItem } from './TaskItem'


export const TaskList = ({ tasks, onTaskCompleted, onTaskDeleted }) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th className="text-center">NOMBRE</th>
                <th className="text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onTaskCompleted={onTaskCompleted}
                  onTaskDeleted={onTaskDeleted}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
};