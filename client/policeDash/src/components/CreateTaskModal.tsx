// components/CreateTaskModal.tsx
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTaskModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
    status: "Pending",
    assignee: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/tasks/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Task created:", data);
        onClose(); // close modal after success
      })
      .catch((err) => console.error("Error creating task:", err));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={taskData.title}
            onChange={handleChange}
            required
            className="w-full border-b px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={taskData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border-b px-3 py-2 resize-none"
          />
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full border px-2 py-2"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            name="due_date"
            type="date"
            value={taskData.due_date}
            onChange={handleChange}
            required
            className="w-full border-b px-3 py-2"
          />
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full border px-2 py-2"
          >
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <input
            name="assignee"
            type="text"
            placeholder="Assignee"
            value={taskData.assignee}
            onChange={handleChange}
            required
            className="w-full border-b px-3 py-2"
          />
          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create
            </button>
            <button type="button" onClick={onClose} className="text-red-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
