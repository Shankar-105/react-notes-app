import React from 'react';
import { Note } from '../types';
import NoteCard from './NoteCard';

interface HomeScreenProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onAddNote: () => void;
  onSearchClick: () => void;
  onInfoClick: () => void;
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  notes,
  onNoteClick,
  onAddNote,
  onSearchClick,
  onInfoClick,
  onLogout,
}) => {
  const headerContent = (
    <div className="w-full flex items-center justify-between mb-8">
      <h1 className="text-notes-text-white text-[43px] font-semibold font-nunito">
        Notes
      </h1>
      <div className="flex gap-3">
        <button
          onClick={onSearchClick}
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
              d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
              fill="white"
            />
          </svg>
        </button>
        <button
          onClick={onInfoClick}
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
              d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
              fill="white"
            />
          </svg>
        </button>
        <button
          onClick={onLogout}
          className="w-[50px] h-[50px] bg-red-500/20 rounded-notes-button flex items-center justify-center hover:bg-red-500/40 transition-all border border-red-500/50"
          title="Sign Out"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 16L21 12M21 12L17 8M21 12H9M13 16V17C13 18.6569 11.6569 20 10 20H5C3.34315 20 2 18.6569 2 17V7C2 5.34315 3.34315 4 5 4H10C11.6569 4 13 5.34315 13 7V8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  if (notes.length === 0) {
    return (
      <div className="w-full min-h-screen bg-notes-bg rounded-notes p-6 flex flex-col items-center justify-center relative">
        <div className="absolute top-12 left-6 right-6">
          {headerContent}
        </div>

        <div className="flex flex-col items-center justify-center mt-32">
          <p className="text-notes-text-white text-[20px] font-light font-nunito mb-8">
            Create your first note !
          </p>
          <div className="w-[350px] h-[287px] bg-white/5 backdrop-blur-md rounded-2xl mb-8 flex items-center justify-center border border-white/10">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#999" fontSize="14">
                No notes yet
              </text>
            </svg>
          </div>
        </div>

        <button
          onClick={onAddNote}
          className="fixed bottom-8 right-8 w-[70px] h-[70px] bg-notes-button rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-10"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 10V38M10 24H38"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-notes-bg rounded-notes p-6 pb-24 relative">
      {headerContent}

      <div className="space-y-4 pb-8">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onClick={() => onNoteClick(note)} />
        ))}
      </div>

      <button
        onClick={onAddNote}
        className="fixed bottom-8 right-8 w-[70px] h-[70px] bg-notes-button rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-10"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 10V38M10 24H38"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default HomeScreen;
