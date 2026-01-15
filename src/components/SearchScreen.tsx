import React, { useState } from 'react';
import { Note } from '../types';
import NoteCard from './NoteCard';

interface SearchScreenProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onClose: () => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ notes, onNoteClick, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-notes-bg rounded-notes p-6 relative">
      {/* Search Bar */}
      <div className="w-full mb-8">
        <div className="relative w-full h-[50px] bg-notes-button rounded-[30px] flex items-center px-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by the keyword..."
            className="flex-1 bg-transparent text-notes-text-light-gray text-[20px] font-light font-nunito outline-none placeholder:text-notes-text-light-gray"
            autoFocus
          />
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center ml-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#CCCCCC"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Results */}
      {searchQuery.trim() === '' ? (
        <div className="flex flex-col items-center justify-center mt-32">
          <div className="w-[370px] h-[239px] bg-gray-300 rounded-lg mb-8 flex items-center justify-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="200" height="200" fill="#E5E5E5" />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#999">
                Search Illustration
              </text>
            </svg>
          </div>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32">
          <div className="w-[370px] h-[239px] bg-gray-300 rounded-lg mb-8 flex items-center justify-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="200" height="200" fill="#E5E5E5" />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#999">
                Not Found
              </text>
            </svg>
          </div>
          <p className="text-notes-text-white text-[20px] font-light font-nunito">
            File not found. Try searching again.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onClick={() => onNoteClick(note)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
