import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      console.log('Fetched tasks:', response.data);
      setTasks(response.data.tasks); // Access the tasks array
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  const addTask = async () => {
    if (newTask.title && newTask.description) {
      try {
        await axios.post('http://localhost:3000/tasks', newTask);
        console.log("Task added:", newTask);
        setNewTask({ title: '', description: '' });
        fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };


  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/id/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const modifyTask = async (id, updatedTask) => {
    try {
      await axios.patch(`http://localhost:3000/tasks/id/${id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error('Error modifying task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">Task Management</h1>

        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-2xl mb-4">Add New Task</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              className="bg-gray-700 text-white p-2 rounded-lg"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <Input
              className="bg-gray-700 text-white p-2 rounded-lg"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              onClick={addTask}
            >
              Add Task
            </Button>
          </div>
        </div>

        <ul className="space-y-4">
          {Array.isArray(tasks) ? (
            tasks.map((task) => (
              <li
                key={task.id}
                className="bg-gray-800 p-6 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="font-bold text-xl">{task.title}</h2>
                  <p className="text-gray-400">{task.description}</p>
                </div>
                <div className="flex gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Modify
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-gray-800 p-4 rounded-lg">
                    <Input
  className="bg-gray-700 text-white p-2 mb-2 rounded-lg"
  placeholder="Title"
  value={editingTask?.id === task.id ? editingTask.title : task.title}
  onChange={(e) =>
    setEditingTask((prev) => ({
      ...prev,
      id: task.id,
      title: e.target.value,
    }))
  }
/>
<Input
  className="bg-gray-700 text-white p-2 mb-2 rounded-lg"
  placeholder="Description"
  value={editingTask?.id === task.id ? editingTask.description : task.description}
  onChange={(e) =>
    setEditingTask((prev) => ({
      ...prev,
      id: task.id,
      description: e.target.value,
    }))
  }
/>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        onClick={() => {
                          modifyTask(task.id, editingTask || task);
                          setEditingTask(null);
                        }}
                      >
                        Save
                      </Button>
                    </PopoverContent>
                  </Popover>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </ul>
      </div>
    </div>
  );
}
