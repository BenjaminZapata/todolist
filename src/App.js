import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './paper.css';

function App() {
  const handleLocalStorage = ( action ) => {
    if (action === 'save'){
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    if (action === 'load'){
      const loadedTasks = JSON.parse(localStorage.getItem('tasks'))
      return loadedTasks ? loadedTasks : []
    }
  }

  const [ tasks, setTasks ] = useState(handleLocalStorage('load'))
  const [ input, setInput ] = useState('')
  const [ filterOptions, setFilterOptions ] = useState('')
  const [ displayAlert, setDisplayAlert ] = useState(false)

  useEffect(() => {
    handleLocalStorage('save')
  }, [tasks])
  

  const handleChange = ( e ) => {
    setInput(e.target.value)
  }

  const addTask = ( e ) => {
    e.preventDefault();
    if (input.length < 3){
      setInput('')
      setDisplayAlert(true)
      return
    }
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
    if (displayAlert) setDisplayAlert(false)
  }

  const changeTaskStatus = ( id ) => {
    const aux = [...tasks]
    const taskId = aux.findIndex( t => t.id === id)
    aux[taskId].status = aux[taskId].status === 'completed' ? 'incompleted' : 'completed'
    setTasks(aux)
  }

  const eraseTask = ( id ) => {
    let filteredTasks = tasks.filter( t => t.id !== id)
    setTasks([...filteredTasks])
  }

  const task = ( data ) => {
    const { id, status, task, time } = data
    return(
      <article key={id} className='margin-top row flex-center'>
        <button className={`col col-9 text-left margin-small ${status === 'completed' ? "background-primary text-line-through" : ""}`} onClick={() => changeTaskStatus(id)} popover-left={status === 'completed' ? 'Completada' : 'No completada'}>{task}</button>
        <button className='col margin-small' onClick={() => eraseTask(id)} popover-right='Eliminar'>X</button>
        <footer className='col-10'>
          <p className='margin-bottom-none margin-top-small'>{time}</p>
        </footer>
      </article>)
  }

  return (
    <>
      <div className='container'>
        <section className='paper container border margin-large'>
          <h2 className='margin-none'>Lista de tareas</h2>
          <form id='taskInput' onSubmit={(e) => addTask(e)} className='form-group row margin-large flex-edges'>
            <input className='col col-9' onChange={(e) => handleChange(e)} value={ input } type="text" placeholder="A??ade una tarea.." id="paperInputs1" />
            <button className='col'>A??adir</button>
            { displayAlert && <p className='col-12 margin-left-small'>La tarea debe tener al menos 3 caracteres</p>}
          </form>
          <section className='margin-top-large'>
            {
              !filterOptions ? 
              tasks.map( el => task(el)) : 
                filterOptions === 'completed' ? 
                tasks.filter( el => el.status === 'completed').map( el => task(el)) :
                tasks.filter( el => el.status === 'incompleted').map( el => task(el))
            }
            {
              tasks.length === 0 && 
                <div className='row flex-center'>
                  <h3>No has a??adido ninguna tarea todavia</h3>
                </div>
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
    </>
  );
}

export default App;
