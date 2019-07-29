import React from 'react';

const preventDrop = e => e.stopPropagation()

const taskCounter = ({count}) => {
    return(
        <div className="counter" onDragOver={preventDrop}>
            <p>{count}</p>
            <span>TASKS</span>
        </div>
    )
};

export default taskCounter;