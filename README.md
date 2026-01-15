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

## Usage

1. **Create a Note**: Click the floating action button (FAB) at the bottom right
2. **View a Note**: Click on any note card
3. **Edit a Note**: Click the edit button when viewing a note
4. **Delete a Note**: Click the delete button when viewing a note
5. **Search Notes**: Click the search icon in the header
6. **View Info**: Click the info icon in the header

## Design

The UI is designed to match the Figma design with:
- Dark background (#252525)
- Colorful note cards
- Rounded corners (30px for main container, 10px for cards)
- Nunito font family
- Smooth hover effects and transitions

## License

This project is open source and available for use.
