import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './paper.css';

function App() {
  const [ tasks, setTasks ] = useState([])
  const [ input, setInput ] = useState('')
  const [ filterOptions, setFilterOptions ] = useState('')

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const addTask = (e) => {
    e.preventDefault();
    let task = input
    let date = new Date()
    let newTask = {
      task: task,
      time: date.toString(),
      status: 'incompleted',
      id: uuidv4()
    }
    setTasks([...tasks, newTask])
    setInput('')
  }

  const changeTaskStatus = (id) => {
    const aux = [...tasks]
    const taskId = aux.findIndex( t => t.id === id)
    aux[taskId].status = aux[taskId].status === 'completed' ? 'incompleted' : 'completed'
    setTasks(aux)
  }

  const eraseTask = (id) => {
    let filteredTasks = tasks.filter( t => t.id !== id)
    setTasks([...filteredTasks])
  }

  const task = (data) => {
    const { id, status, task, time } = data
    return(
      <article key={id} className='margin-top row flex-center'>
        <button className={`col col-8 text-left ${status === 'completed' ? "background-primary text-line-through" : ""}`} onClick={() => changeTaskStatus(id)}>{task}</button>
        <button className='col' onClick={() => eraseTask(id)}>X</button>
        <footer className='col-9'>
          <p className='margin-bottom-none margin-top-small'>{time}</p>
        </footer>
      </article>)
  }

  return (
    <div className='container'>
      <section className='paper container border margin-large'>
        <h2 className='margin-none'>Lista de tareas</h2>
        <form id='taskInput' onSubmit={(e) => addTask(e)} className='form-group row col-6 margin-large flex-edges'>
          <input className='col col-9' onChange={(e) => handleChange(e)} value={ input } type="text" placeholder="Añade una tarea.." id="paperInputs1" />
          <button className='col col-2'>Añadir</button>
        </form>
        <section className='margin-top-large'>
          {
            !filterOptions ? 
            tasks.map( el => task(el)) : 
              filterOptions === 'completed' ? 
              tasks.filter( el => el.status === 'completed').map( el => task(el)) :
              tasks.filter( el => el.status === 'incompleted').map( el => task(el))
          }
        </section>
        <footer className='row flex-right margin-top-large margin-bottom-none'>
          <p className='margin-right'>Mostrar :</p>
          <div className="form-group">
            <select id="paperSelects1" onChange={e => setFilterOptions(e.target.value)}>
              <option value="">Todos</option>
              <option value="incompleted">Incompletas</option>
              <option value="completed">Completas</option>
            </select>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default App;
