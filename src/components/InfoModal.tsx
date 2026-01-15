import React from 'react';

interface InfoModalProps {
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-notes-text-white rounded-[20px] w-[330px] h-[236px] p-6 flex flex-col items-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-notes-text-placeholder text-[15px] font-normal font-nunito mb-4">
          Made by
        </h2>
        <div className="text-notes-text-placeholder text-[15px] font-normal font-nunito text-left w-full">
          <p>Designed by -</p>
          <p>Redesigned by -</p>
          <p>Illustrations -</p>
          <p>Icons -</p>
          <p>Font -</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center"
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
              fill="#CFCFCF"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
