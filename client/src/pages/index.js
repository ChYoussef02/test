import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask.title && newTask.description) {
      try {
        await axios.post('http://localhost:3000', newTask);
        console.log("task sent from frontend")
        setNewTask({ title: '', description: '' });
        fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Task Management</h1>

      <div className="mt-4">
        <Input
          className="border p-2 mr-2"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <Input
          className="border p-2 mr-2"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <Button
          className="text-white px-4 py-2"
          variant="ghost"
          onClick={addTask}
        >
          Add Task
        </Button>
      </div>

      <ul className="mt-6">
        {Array.isArray(tasks) ? (
          tasks.map((task) => (
            <li
              key={task.id}
              className="border p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{task.title}</h2>
                <p>{task.description}</p>
              </div>
              <Button
                className="text-white px-4 py-2"
                variant="destructive"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </Button>
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
}
