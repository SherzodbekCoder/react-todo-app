import { useState } from 'react'
import './App.css'
import Header from './components/Header'

function App() {
  const [name, setName] = useState('');
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

  function getData() {
    let data = [];
    if (localStorage.getItem('todos')) {
      data = JSON.parse(localStorage.getItem('todos'))
    }

    return data;
  }

  function handleClick(e) {
    e.preventDefault();
    const todo = {
      id: Date.now(),
      name: name,
      status: false
    }

    let old = getData();
    old.push(todo);
    localStorage.setItem('todos', JSON.stringify(old));
    setName('');
    setTodos(old);
  }

  function handleDelete(id) {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  function confirmDelete(id) {
    if (window.confirm('Are you sure you want to delete this item?')) {
      handleDelete(id);
    }
  }

  return (
    <>
      <div className="todo w-50 mx-auto border border-2 rounded mt-4">
        <Header />
        <div className='p-3'>
          <form className='d-flex w-100 my-4'>
            <div className='d-flex'>
              <input type="text" className='form-control w-75' placeholder='Enter todo...' value={name} onChange={(e) => {
                setName(e.target.value)
              }} />
              <button onClick={handleClick} className='btn btn-primary w-25'>Submit</button>
            </div>
          </form>
          <div className="todo-wrapper">
            {todos.map((el, index) => (
              <div key={index} className="todo-item d-flex align-items-center justify-content-between mb-3 border border-2 rounded p-2" >
                <div className='d-flex align-items-center gap-2'>
                  <input type="checkbox" name="" id="" />
                  <h5>{el.name}</h5>
                </div>
                <div className='actions d-flex gap-2'>
                  <i className=" edite fa-regular fa-pen-to-square" style={{ cursor: 'pointer' }}></i>
                  <i className="delete fa-solid fa-trash-can" style={{ cursor: 'pointer' }} onClick={() => confirmDelete(el.id)}></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
