import {useState, useEffect} from 'react';
import Item from './components/Item'
import './index.css'

import axios from 'axios';

function App() {

  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");

  useEffect(() => {
    axios.get("https://todo-list-black.onrender.com/get-todo")
    .then((res) => setTodo(res.data))
    .catch((err) => console.log(err));
  })

  const addUpdate = () => {
    if(isUpdating === "") {
      axios.post("https://todo-list-black.onrender.com/save-todo", {text})
      .then((res) => {
        console.log(res.data)
        setText("");
      })
      .catch((err) => console.log(err));
    } else {
      axios.post("https://todo-list-black.onrender.com/update-todo", {_id: isUpdating, text})
      .then((res) => {
        console.log(res.data)
        setText("");
        setIsUpdating("");
      })
      .catch((err) => console.log(err));
    }
  }

  const deleteToDo = (_id) => {
    axios.post("https://todo-list-black.onrender.com/delete-todo", {_id})
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  const updateToDo = (_id, text) => {
    setIsUpdating(_id);
    setText(text);
  }

  return (
    <div className="app">
      <div className="container">
        <h1>TODO APP</h1>

        <div className="top">
          <input type="text" 
          placeholder="Escreva algo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          />
          <div className="add" onClick={addUpdate}>{isUpdating? "Update" : "Add"}</div>
        </div>

        <div className="list">
            {todo.map(item => <Item
              key={item._id}
              text={item.text}
              remove={() => deleteToDo(item._id)}
              update={() => updateToDo(item._id, item.text)}/>)}
        </div>
      </div>
    </div>
  )
}

export default App
