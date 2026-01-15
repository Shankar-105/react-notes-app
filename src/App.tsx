import React, { useState, useEffect } from 'react';
import { Note, ViewMode } from './types';
import HomeScreen from './components/HomeScreen';
import Editor from './components/Editor';
import ViewNote from './components/ViewNote';
import SearchScreen from './components/SearchScreen';
import InfoModal from './components/InfoModal';

const NOTE_COLORS = [
  '#FF9E9E',
  '#91F48F',
  '#FFF599',
  '#9EFFFF',
  '#B69CFF',
  '#FD99FF',
];

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        const parsed = JSON.parse(savedNotes);
        setNotes(
          parsed.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt),
          }))
        );
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    } else {
      // Initialize with sample notes
      const sampleNotes: Note[] = [
        {
          id: '1',
          title: 'Book Review : The Design of Everyday Things by Don Norman',
          content: '',
          color: '#FF9E9E',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Animes produced by Ufotable',
          content: '',
          color: '#91F48F',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          title: 'Mangas planned to read',
          content: '',
          color: '#FFF599',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '4',
          title: 'Awesome tweets collection',
          content: '',
          color: '#9EFFFF',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '5',
          title: 'List of free & open source apps',
          content: '',
          color: '#B69CFF',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '6',
          title: 'UI concepts worth exsisting',
          content: '',
          color: '#FD99FF',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      setNotes(sampleNotes);
      localStorage.setItem('notes', JSON.stringify(sampleNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const handleAddNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSelectedNote(newNote);
    setCurrentView('editor');
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setCurrentView('view');
  };

  const handleSaveNote = (title: string, content: string) => {
    if (selectedNote) {
      const updatedNote: Note = {
        ...selectedNote,
        title: title || 'Untitled',
        content,
        updatedAt: new Date(),
      };

      if (notes.find((n) => n.id === selectedNote.id)) {
        // Update existing note
        setNotes(notes.map((n) => (n.id === selectedNote.id ? updatedNote : n)));
      } else {
        // Add new note
        setNotes([...notes, updatedNote]);
      }
      setSelectedNote(updatedNote);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNote) {
      setNotes(notes.filter((n) => n.id !== selectedNote.id));
      setSelectedNote(null);
      setCurrentView('home');
    }
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedNote(null);
  };

  const handleEdit = () => {
    if (selectedNote) {
      setCurrentView('editor');
    }
  };

  const handleSearchClick = () => {
    setCurrentView('search');
  };

  const handleInfoClick = () => {
    setShowInfoModal(true);
  };

  return (
    <div className="App min-h-screen bg-notes-bg">
      {currentView === 'home' && (
        <HomeScreen
          notes={notes}
          onNoteClick={handleNoteClick}
          onAddNote={handleAddNote}
          onSearchClick={handleSearchClick}
          onInfoClick={handleInfoClick}
        />
      )}
      {currentView === 'editor' && selectedNote && (
        <Editor
          note={selectedNote}
          onSave={handleSaveNote}
          onBack={handleBack}
          onDiscard={handleBack}
        />
      )}
      {currentView === 'view' && selectedNote && (
        <ViewNote
          note={selectedNote}
          onBack={handleBack}
          onEdit={handleEdit}
          onDelete={handleDeleteNote}
        />
      )}
      {currentView === 'search' && (
        <SearchScreen
          notes={notes}
          onNoteClick={handleNoteClick}
          onClose={handleBack}
        />
      )}
      {showInfoModal && (
        <InfoModal onClose={() => setShowInfoModal(false)} />
      )}
    </div>
  );
}

export default App;
