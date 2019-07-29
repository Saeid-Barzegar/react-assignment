import * as actionType from "./actionTypes";


const loadTasks = tasks =>{
    return{
        type: actionType.LOAD_INITIAL_STATE,
        payload: tasks
    }
}


export const initializeState = () => {
    return async dispatch => {
        await fetch('/dist/api/tasks.json', {
            method: 'GET'
        })
        .then(response=> response.json())
        .then(data => dispatch(loadTasks(data)))
        .catch(error => console.log(error))
    }
}


export const handleChange = payload=>{
    return{
        type: actionType.HANDLE_NEW_TASK_CHANGE,
        payload
    }
}

export const addNewTask = payload=>{
    return{
        type: actionType.ADD_NEW_TASK,
        payload
    }
}


export const changeCategotry = payload=>{
    return{
        type: actionType.CHANGE_CARD_CATEGORY,
        payload
    }
}
