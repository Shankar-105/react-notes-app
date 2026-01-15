import React, { useState, useEffect, useRef } from 'react';
import { Note } from '../types';

interface EditorProps {
  note?: Note;
  onSave: (title: string, content: string) => void;
  onBack: () => void;
  onDiscard?: () => void;
}

const Editor: React.FC<EditorProps> = ({ note, onSave, onBack, onDiscard }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    if (note) {
      const titleChanged = title !== note.title;
      const contentChanged = content !== note.content;
      setHasChanges(titleChanged || contentChanged);
    } else {
      setHasChanges(title.trim() !== '' || content.trim() !== '');
    }
  }, [title, content, note]);

  const handleBack = () => {
    if (hasChanges) {
      setShowSaveDialog(true);
    } else {
      onBack();
    }
  };

  const handleSave = () => {
    onSave(title, content);
    setShowSaveDialog(false);
    setHasChanges(false);
  };

  const handleDiscard = () => {
    if (onDiscard) {
      onDiscard();
    }
    setShowSaveDialog(false);
    setHasChanges(false);
    onBack();
  };

  const handleSaveClick = () => {
    onSave(title, content);
    setHasChanges(false);
  };

  return (
    <div className="w-full min-h-screen bg-notes-bg rounded-notes p-6 relative">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
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
            onClick={handleSaveClick}
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
                d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM19 19H5V5H16.17L19 7.83V19ZM12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12ZM6 6H15V10H6V6Z"
                fill="white"
              />
            </svg>
          </button>
          <button
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
                d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Title Input */}
      <input
        ref={titleRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full bg-transparent text-notes-text-gray text-[48px] font-normal font-nunito leading-[1.36] mb-4 outline-none placeholder:text-notes-text-gray"
      />

      {/* Content Textarea */}
      <textarea
        ref={contentRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type something..."
        className="w-full bg-transparent text-notes-text-gray text-[23px] font-normal font-nunito leading-[1.36] outline-none placeholder:text-notes-text-gray resize-none min-h-[400px]"
      />

      {/* Formatting Toolbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-notes-text-white h-[60px] flex items-center px-4 overflow-x-auto border-t border-gray-200">
        <div className="flex gap-4 items-center min-w-max">
          {/* Bold */}
          <button className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15.6 10.79C16.57 10.11 17.25 9 17.25 8C17.25 5.74 15.5 4 13.25 4H7V20H13.25C15.5 20 17.25 18.26 17.25 16C17.25 14.21 16.29 12.71 15.6 11.79H15.6ZM10 6.5H13C13.83 6.5 14.5 7.17 14.5 8C14.5 8.83 13.83 9.5 13 9.5H10V6.5ZM13 14.5H10V17.5H13C13.83 17.5 14.5 16.83 14.5 16C14.5 15.17 13.83 14.5 13 14.5Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
          {/* Italic */}
          <button className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 4V7H12.21L8.79 17H6V20H14V17H11.79L15.21 7H18V4H10Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
          {/* Underline */}
          <button className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 17C15.31 17 18 14.31 18 11V3H15.5V11C15.5 12.93 13.93 14.5 12 14.5C10.07 14.5 8.5 12.93 8.5 11V3H6V11C6 14.31 8.69 17 12 17ZM5 19V21H19V19H5Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
          {/* Link */}
          <button className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
          {/* Strikethrough */}
          <button className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 19H14V17H10V19ZM5 4V6H9.5C10.88 6 12 7.12 12 8.5C12 9.88 10.88 11 9.5 11H5V13H9.5C11.98 13 14 10.98 14 8.5C14 6.02 11.98 4 9.5 4H5ZM19 11H14.5C13.12 11 12 9.88 12 8.5C12 7.12 13.12 6 14.5 6H19V4H14.5C12.02 4 10 6.02 10 8.5C10 10.98 12.02 13 14.5 13H19V11Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
          {/* Title */}
          <button className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 4V7H10.5V19H13.5V7H19V4H5Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
          {/* Numbered List */}
          <button className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M2 17H4V17.5H3V18.5H4V19H2V20H5.5V16H2V17ZM3 8H4V4H2V5H3V8ZM2 11H3.8L2 13.1V14H5V13H3.2L5 10.9V10H2V11ZM6 4V6H21V4H6ZM6 19H21V17H6V19ZM6 13H21V11H6V13Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
          {/* Bullet List */}
          <button className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 10.5C4.83 10.5 5.5 9.83 5.5 9C5.5 8.17 4.83 7.5 4 7.5C3.17 7.5 2.5 8.17 2.5 9C2.5 9.83 3.17 10.5 4 10.5ZM4 6.5C4.83 6.5 5.5 5.83 5.5 5C5.5 4.17 4.83 3.5 4 3.5C3.17 3.5 2.5 4.17 2.5 5C2.5 5.83 3.17 6.5 4 6.5ZM4 14.5C4.83 14.5 5.5 13.83 5.5 13C5.5 12.17 4.83 11.5 4 11.5C3.17 11.5 2.5 12.17 2.5 13C2.5 13.83 3.17 14.5 4 14.5ZM7 5H21V7H7V5ZM7 19H21V21H7V19ZM7 13H21V15H7V13Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
          {/* Quote */}
          <button className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 17H10V19H6V17ZM14 17H18V19H14V17ZM6 13H10V15H6V13ZM14 13H18V15H14V13ZM4 21H20V23H4V21ZM4 3V5H20V3H4ZM6 9H10V11H6V9ZM14 9H18V11H14V9ZM4 7H20V9H4V7Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
          {/* Code */}
          <button className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-notes-text-white rounded-[20px] w-[330px] h-[236px] p-6 flex flex-col items-center">
            <div className="w-[36px] h-[36px] mb-4">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                  d="M18 2C9.72 2 3 8.72 3 17C3 25.28 9.72 32 18 32C26.28 32 33 25.28 33 17C33 8.72 26.28 2 18 2ZM19 24H17V22H19V24ZM19 20H17V12H19V20Z"
                  fill="#606060"
                />
              </svg>
            </div>
            <p className="text-notes-text-placeholder text-[23px] font-normal font-nunito text-center mb-6">
              Save changes ?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDiscard}
                className="w-[112px] h-[39px] bg-red-500 rounded-[5px] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <span className="text-notes-text-white text-[18px] font-normal font-nunito">
                  Discard
                </span>
              </button>
              <button
                onClick={handleSave}
                className="w-[112px] h-[39px] bg-[#30BE71] rounded-[5px] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <span className="text-notes-text-white text-[18px] font-normal font-nunito">
                  Save
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
