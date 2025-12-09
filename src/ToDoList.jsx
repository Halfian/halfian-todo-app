import React, { useState, useEffect } from 'react';

function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ 
      id: null,
      title: '', 
      date: '',
      description: '',
      completed: false 
    });

    useEffect(() => {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    }, []);

    useEffect(() => {
      if (todos.length > 0) {
        localStorage.setItem('todos', JSON.stringify(todos));
      }
    }, [todos]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

    const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
      }
    };

    const handleSave = () => {
      if (formData.title.trim()) {
        if (formData.id) {
          setTodos(todos.map(todo =>
            todo.id === formData.id ? { ...formData } : todo
          ));
        } else {
          setTodos([...todos, { ...formData, id: Date.now() }]);
        }
        setFormData({ id: null, title: '', date: '', description: '', completed: false });
        setShowForm(false);
      }
    }

    const handleDelete = (id) => {
      const isConfirmed = window.confirm("Are you sure you to delete this task?");
      if (isConfirmed) {
        setTodos(todos.filter(todo => todo.id !== id));
      }   
    };

    const handleEdit = (todo) => {
      setFormData(todo);
      setShowForm(true);
    };

    const handleToggleComplete = (id) => {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    }


    return (
      <div className="todo-app">
        <h1>My To-Do App</h1>
        <p>As a beginner always do</p>
        <button onClick={() => setShowForm(true)}>Add Task</button>
        
        {showForm && (
          <div className="card form-card">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              onKeyDown={handleKeyDown} 
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onKeyDown={handleKeyDown} 
            />
            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange} 
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSave}>
              {formData.id ? 'Update Task' : 'Save Task'}
            </button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
            )}
        <div className="card-container">
          {todos.map((todo) => (
            <div key={todo.id} className="card">
              <h3>{todo.title}</h3>
              <p><strong>Date:</strong> {todo.date}</p>
              <p>{todo.description}</p>
              <p>
                <span className={`badge ${todo.completed ? "done" : "pending"}`}>
                  {todo.completed ? "✅ Completed" : "⏳ Pending"}
                </span>
              </p>
              <button onClick={() => handleToggleComplete(todo.id)}>
                {todo.completed ? 'Mark as Pending' : 'Mark as Completed'}
              </button>
              <button onClick={() => handleEdit(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
}

export default ToDoList;