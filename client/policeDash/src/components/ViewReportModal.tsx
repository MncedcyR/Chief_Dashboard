import React from "react";
import type { Report } from "../types";

interface Props {
  report: Report;
  onClose: () => void;
}

const ViewReportModal: React.FC<Props> = ({ report, onClose }) => {
  if (!report) return null;

  const isPDF = report.file?.toLowerCase().endsWith(".pdf");
  const isImage = report.file?.match(/\.(jpeg|jpg|png|gif)$/i);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Report Details</h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Title:</span> {report.title}
          </p>
          <p>
            <span className="font-semibold">Author:</span> {report.author}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {report.date}
          </p>
          <p>
            <span className="font-semibold">Type:</span> {report.type}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {report.status}
          </p>

          {report.file && (
            <div className="mt-4">
              <span className="font-semibold block mb-1">File Preview:</span>
              {isPDF && (
                <iframe
                  src={report.file}
                  className="w-full h-[500px] border"
                  title="Report File"
                />
              )}
              {isImage && (
                <img
                  src={report.file}
                  alt="Report File"
                  className="max-w-full max-h-[500px] border"
                />
              )}
              {!isPDF && !isImage && (
                <p className="text-red-500">
                  Unsupported file format for preview.
                </p>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewReportModal;
