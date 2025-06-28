import { useEffect, useState } from 'react';
import './App.css';
import { FaMoon, FaSun, FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTask = () => {
    if (newTask.trim() === '') return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = newTask;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: newTask, completed: false }]);
    }
    setNewTask('');
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <h1><FaCheckCircle /> To-Do List</h1>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>{editIndex !== null ? 'Update' : 'Add'}</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span className="task-text" onClick={() => toggleComplete(index)}>
              {task.text}
            </span>
            <div className="actions">
              <button className="edit" onClick={() => editTask(index)}><FaEdit /></button>
              <button className="delete" onClick={() => deleteTask(index)}><FaTrash /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
