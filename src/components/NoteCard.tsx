import React from 'react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
  return (
    <div
      className="rounded-notes-card p-5 cursor-pointer transition-transform hover:scale-[1.02] min-h-[100px] flex items-center"
      style={{ backgroundColor: note.color }}
      onClick={onClick}
    >
      <h3 className="text-black text-[25px] font-normal leading-[1.36] font-nunito">
        {note.title}
      </h3>
    </div>
  );
};

export default NoteCard;
