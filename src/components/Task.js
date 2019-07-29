import React from 'react';
import PropTypes from 'prop-types'

const Task = ({ 
    task, 
    dragTask, 
    taskDragOver }) => {

    return <li className="task"
                draggable="true"
                id={`task${task.id}`}
                onDragStart={event=> dragTask(event, task.id)} 
                onDragOver={e => taskDragOver(e, task.id)}
                >{task.text}</li>
}
        
Task.prototype = {
    task: PropTypes.object.isRequired,
    dragTask: PropTypes.func.isRequired, 
    taskDragOver: PropTypes.func.isRequired,
    onTaskDrop: PropTypes.func.isRequired
}

export default Task;
