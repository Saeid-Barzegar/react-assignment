import React, {useEffect} from 'react';
import { connect } from "react-redux";
import Counter from "./components/TaskCounter";
import { initializeState, handleChange, addNewTask, changeCategotry } from "./store/actions/actions";
import List from './components/List';


const App = ({
    newTask,
    tasks,
    statuses,
    initializeState,
    handleChange,
    addNewTask,
    changeCategotry,
    changeOrder
}) => {

    useEffect(()=>{
        initializeState()
    }, [initializeState])

    const handleSubmit = event => event.key === 'Enter' && addNewTask(event.target.value);
    
    return(
        <div className="container">

            <div className="NewTaskForm">
                <label htmlFor="task">Add Task: </label>
                <input 
                    type="text" 
                    id="task" 
                    name="task" 
                    onChange={event=> handleChange(event)} 
                    onKeyPress={handleSubmit} 
                    value={newTask} />
            </div>

            <Counter count={tasks.length}/>

            <div className="statusContainer">
                {
                    statuses.map((stat, index)=> 
                        <List 
                            key={index} 
                            status={stat} 
                            statusId={index} 
                            tasks={tasks}
                            changeCategotry={changeCategotry}
                            changeOrder={changeOrder}/>
                    )
                }
                
            </div>
        </div>
    )
};

const mapStateToProps = state=>({
    newTask: state.tasks.newTask,
    tasks: state.tasks.tasks,
    statuses: state.tasks.statuses
})

const mapDispatchToProps = dispatch=>({
    initializeState: ()=> dispatch(initializeState()),
    handleChange: event => dispatch(handleChange(event)),
    addNewTask: text => dispatch(addNewTask(text)),
    changeCategotry: event=> dispatch(changeCategotry(event)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);