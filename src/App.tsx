import React, { useState } from 'react';
import './styles.css';
export interface ITask {
  id: number;
  taskName: string;
  state: boolean;
}
const App: React.FC = () =>{

  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState("All");

  function handleChangeValue(ev: React.ChangeEvent<HTMLInputElement>): void{
    setInputValue(ev.target.value);
  }


  function handleChangeSubmit(ev: React.FormEvent<HTMLFormElement>): void {
    ev.preventDefault();

    if(!inputValue){
      alert("Please enter tasks");
      return;
    }
    setTaskList((prevState) => {
      const newTask: ITask = {
        id: Math.random() * 100,
        taskName: inputValue,
        state: true
      } 
      const newList = [...prevState, newTask];
      return newList;
    })
    setInputValue(''); 
  }


  function handleRemoveValue(id: number){
    setTaskList((prevState) => {
      return prevState.filter((it) => it.id !== id)
    })
  }

  function handleChangeState(id: number): void {
    setTaskList((prevState) => {
      const newList = [...prevState];
      const task = newList.find((it) => it.id === id);
      if(task){
        task.state = !task.state
      }

      return newList
    })
  }

  function handleChangeSelect(ev: React.ChangeEvent<HTMLSelectElement>): void{
    console.log(ev)
    setFilter(ev.target.value);
  }

  
  return(
    <div className="container">
      <div className="header">
        <h1>TaskList</h1>
      </div>
      <div className="content">
        <div className="btns-boxes">
          <form onSubmit={handleChangeSubmit}>
          <input type="text" 
          placeholder='Set the task!' 
          value={inputValue} 
          onChange={handleChangeValue}
          />
            <button>Add #{taskList.length+1}</button>
            <select 
            defaultValue="all"
            onChange={handleChangeSelect} >
              <option value="all" selected>All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            </form>
          </div>
          <div className="list-box grid">
            <h2>Tasks</h2>
            {taskList.length === 0 ? (
              <p>No Tasks</p>
            ): (
              <div className="task-list">
                <ul>
                  {taskList.filter((item) =>{
                    if(filter === "all"){
                      return true
                    }else if (filter === "active"){
                      return item.state === true
                    }else if(filter === "inactive"){
                      return item.state === false
                    }
                  }).map((item) =>{
                    return (
                      <li>
                        <div className="spanDiv">
                          <span className={item.state ? "ativo" : "inativo"}>{item.taskName}</span>
                        </div>
                        <button type="button" onClick={() => {
                          handleRemoveValue(item.id)
                        }}>Remove</button>
                        <button type="button" onClick={() =>{
                          handleChangeState(item.id)
                        }}>{item.state ? "Inactive" : "Active"}</button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
      </div>
    </div>
  )
}

export default App;