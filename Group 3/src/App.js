import React, { useState } from 'react';
import './App.css';

function App() {
  const [filter, setFilter] = useState('all'); // all | completed | pending | expired
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() && endDate) {
      const newTodo = {
        text: inputValue,
        completed: false,
        createdAt: new Date(),
        completedAt: null,
        endDate: new Date(endDate),
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setEndDate('');
    } else {
      alert('Please enter task name and end date.');
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date() : null,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const isExpired = (endDate) => {
    const now = new Date();
    const taskEndDate = new Date(endDate);
    return now > taskEndDate;
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed && !isExpired(todo.endDate);
    if (filter === 'expired') return !todo.completed && isExpired(todo.endDate);
    return true; // 'all'
  });

  return (
    <div className="App">
      <h1>To-Do List</h1>

      {/* Input Section */}
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <input 
          type="date" 
          value={endDate}
          onChange={handleEndDateChange}
          className="date-picker"
        />
        <button className="add-button" onClick={handleAddTodo}>Add</button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button className="filter-button" onClick={() => setFilter('all')}>All Tasks</button>
        <button className="filter-button" onClick={() => setFilter('completed')}>Completed</button>
        <button className="filter-button" onClick={() => setFilter('pending')}>Pending</button>
        <button className="filter-button" onClick={() => setFilter('expired')}>Expired</button>
      </div>

      {/* Todo List */}
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={() => handleToggleComplete(index)} 
                />
                <span 
                  className="task-text" 
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                >
                  {todo.text}
                </span>
              </div>

              {/* End Date */}
              <small style={{ fontSize: '0.8rem', color: isExpired(todo.endDate) && !todo.completed ? '#ff4d6d' : '#ccc' }}>
                End Date: {new Date(todo.endDate).toLocaleDateString()}
              </small>

              {/* Status */}
              {todo.completed && (
                <small style={{ fontSize: '0.75rem', color: '#90ee90' }}>
                  Completed on: {new Date(todo.completedAt).toLocaleDateString()}
                </small>
              )}
            </div>

            {/* Delete button */}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
