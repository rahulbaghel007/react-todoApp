import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, seteditId] = useState(0);
  
  const handleSubmit =(e)=>{
    e.preventDefault();

    if(editId){

      const editTodo = todos.find((i)=>i.id === editId);
      const updatedTodos=todos.map((t)=>
      t.id === editTodo.id 
      ? (t={id:t.id,todo})
      : {id:t.id,todo:t.todo}    
      );
      setTodos(updatedTodos);
      seteditId(0)
      setTodo("");
      return;
    }

    if(todo !== ''){
      setTodos([{id:`${todo}-${Date.now()}` ,todo}, ...todos]); //Spread Operator
      setTodo("");
    }
  }
  const handleDelete = (id)=>{
    const deleteTodo = todos.filter((to)=>to.id !== id);
    setTodos([...deleteTodo]);
  }
  const handleEdit = (id)=>{
    const editTodo = todos.find((i)=>i.id ===id);
    setTodo(editTodo.todo);
    seteditId(id);
  }
  return <div className="App">
    <div className="container">
      <h1>Todo List App </h1>
      <form className='todoform' onSubmit={handleSubmit}>
        <input type='text' placeholder='Give me some Task' value={todo} onChange={(e)=>setTodo(e.target.value)}/>
        <button type='submit'>{editId ? "Edit" : "Go"}</button>
      </form>
      <ul className='alltodos'>
        {
          todos.map((t) =>(
        <li className='singleTodo'>
          <span className='todoText' key={t.id} > {t.todo}</span>
          <button onClick={()=> handleEdit(t.id)}>Edit</button>
          <button onClick={()=>handleDelete(t.id)}>Delete</button>
        </li>
        ))}
      </ul>
    </div>
  </div>

};

export default App;
