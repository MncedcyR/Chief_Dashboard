import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddReportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [reportData, setReportData] = useState({
    title: "",
    author: "",
    date: "",
    type: "Maintenance",
    status: "Approved",
    file: null as File | null,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setReportData({
      ...reportData,
      [name]:
        type === "file"
          ? (e.target as HTMLInputElement).files?.[0] || null
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(reportData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    fetch("http://localhost:8000/api/reports/add/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Report added:", data);
        onClose();
      })
      .catch((err) => console.error("Error:", err));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Report</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            type="text"
            placeholder="Report Title"
            value={reportData.title}
            onChange={handleChange}
            required
            className="w-full border-b px-3 py-2"
          />
          <input
            name="author"
            type="text"
            placeholder="Author"
            value={reportData.author}
            onChange={handleChange}
            required
            className="w-full border-b px-3 py-2"
          />
          <input
            name="date"
            type="date"
            value={reportData.date}
            onChange={handleChange}
            required
            className="w-full border-b px-3 py-2"
          />
          <select
            name="type"
            value={reportData.type}
            onChange={handleChange}
            className="w-full border px-2 py-2"
          >
            <option>Maintenance</option>
            <option>Inspection</option>
            <option>Operational</option>
          </select>
          <select
            name="status"
            value={reportData.status}
            onChange={handleChange}
            className="w-full border px-2 py-2"
          >
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
          <input
            name="file"
            type="file"
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
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

export default AddReportModal;
