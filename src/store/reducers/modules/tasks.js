import * as actionType from "../../actions/actionTypes";

const initState = {
    newTask: '',
    tasks: [],
    statuses : []
}

const tasks = (state = initState, action)=>{
    switch (action.type) {
        case actionType.LOAD_INITIAL_STATE:
            return{
                ...state,
                tasks: action.payload.cards,
                statuses: Object.values(action.payload.MAP_STATUS)
            }

        case actionType.HANDLE_NEW_TASK_CHANGE:
            return{
                ...state,
                newTask: action.payload.target.value
            }

        case actionType.ADD_NEW_TASK:
            let order = state.tasks.filter(task=> task.status === 0)
            return{
                ...state,
                tasks: [
                    ...state.tasks,
                    {
                        id: state.tasks.length,
                        text: action.payload,
                        status : 0,
                        order : order.length
                    }
                ],
                newTask: ''
            }

        case actionType.CHANGE_CARD_CATEGORY:

                const {clientId, hostId} = action.payload

                const hostTask = state.tasks.filter(task=> task.id === hostId)
                const host = hostTask[0]
                
                const hostStatus = host.status
                const hostOrder = host.order

                return{
                    ...state,
                    tasks: state.tasks.filter(task=>{
                        if(task.id === clientId){
                            task.status = hostStatus
                            task.order = hostOrder
                        }else if( task.order >= hostOrder && task.status === hostStatus ){
                            task.order++
                        }
                        return task
                    })
                }

    
        default:
            return state;
    }
}

export default tasks
