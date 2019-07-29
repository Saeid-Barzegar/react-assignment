import React, {useState} from 'react';
import Counter from "./TaskCounter";
import Task from './Task'
import PropTypes from 'prop-types'

var placeholder = document.createElement("li");
placeholder.id = "placeholder";
placeholder.onDragOver = e => e.stopPropagation()

const List = ({
    status,
    statusId,
    tasks,
    changeCategotry
}) => {

    const [hostId, setHostId] = useState('')

    const filteredTasks = id => tasks && tasks.filter(task=> task.status === id)
    const statusTaskCount = filteredTasks(statusId).length
    const statusTasks = filteredTasks(statusId).sort((a,b)=> a.order > b.order ? 1 : -1)

    // when dragging a task
    const dragTask = (e, id) =>  {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("text", id)
        let dragged = document.getElementById(`task${id}`);
        event.dataTransfer.setDragImage(dragged, 150, 30);
    }

    // hide placeholder whan dragging finished
    const removePlaceHolder = ()=>{
        let element = document.getElementById('placeholder')
        element.parentNode.removeChild(element)
    }
    
    // dragging finished
    const dropTask = e => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text")
        removePlaceHolder()
        const Data = {
            clientId: Number(taskId),
            hostId: hostId
        }
        changeCategotry(Data)
    }

    // replace dragged task with hovering on another task
    const taskDragOver = (e, hostId) => {
        e.stopPropagation()
        e.target.parentNode.insertBefore(placeholder, e.target)
        setHostId(hostId)
    }

    return (
        
        <ul className="list" 
            id={`status${statusId}`} 
            onDragOver={e=> e.preventDefault()}
            onDrop={e => dropTask(e)}
            
            >
            <li className="header" >
                <span>{status}</span>
                <Counter count={statusTaskCount}/>
            </li>
               {
                    statusTasks.map(task=> 
                        <Task 
                            key={task.id} 
                            task={task}
                            onMouseUp={()=>removePlaceHolder()}
                            dragTask={dragTask} 
                            taskDragOver={taskDragOver}
                            statusId={statusId}
                        />)
                }
        </ul>
    );
}

List.prototype = {
    status: PropTypes.string.isRequired,
    statusId: PropTypes.number.isRequired,
    tasks: PropTypes.array.isRequired,
    changeCategotry: PropTypes.func.isRequired
}

export default List;