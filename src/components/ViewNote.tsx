import React from 'react';
import { Note } from '../types';

interface ViewNoteProps {
  note: Note;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ViewNote: React.FC<ViewNoteProps> = ({ note, onBack, onEdit, onDelete }) => {
  return (
    <div className="w-full min-h-screen bg-notes-bg rounded-notes p-6 relative">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="w-[50px] h-[50px] bg-notes-button rounded-notes-button flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
              fill="white"
              fillOpacity="0.87"
            />
          </svg>
        </button>
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="w-[50px] h-[50px] bg-notes-button rounded-notes-button flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.12 5.13L18.87 8.88L20.71 7.04Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="w-[50px] h-[50px] bg-notes-button rounded-notes-button flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-notes-text-white text-[35px] font-normal font-nunito leading-[1.36] mb-6">
        {note.title}
      </h1>

      {/* Content */}
      <div className="text-notes-text-white text-[23px] font-normal font-nunito leading-[1.36] whitespace-pre-wrap">
        {note.content}
      </div>
    </div>
  );
};

export default ViewNote;
