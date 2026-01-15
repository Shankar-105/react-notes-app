# Notes App

A beautiful notes-taking web application built with React.js and Tailwind CSS, designed based on a Figma UI design.

## Features

- 📝 Create, edit, and delete notes
- 🎨 Colorful note cards with different color themes
- 🔍 Search functionality to find notes quickly
- 💾 Local storage persistence
- 📱 Responsive design matching the Figma design
- ✨ Smooth animations and transitions

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Local Storage** - Data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

### Running the App

Start the development server:

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── HomeScreen.tsx      # Main screen with note list
│   ├── Editor.tsx          # Note editor component
│   ├── ViewNote.tsx       # Note view component
│   ├── SearchScreen.tsx   # Search functionality
│   ├── NoteCard.tsx       # Individual note card
│   └── InfoModal.tsx      # Info/about modal
├── types.ts               # TypeScript type definitions
├── App.tsx                # Main app component
└── index.css              # Global styles with Tailwind
```

## License

This project is open source and available for use.
