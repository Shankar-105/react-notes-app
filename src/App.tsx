import React, { useState, useEffect, useCallback } from 'react';
import { Note, ViewMode } from './types';
import HomeScreen from './components/HomeScreen';
import Editor from './components/Editor';
import ViewNote from './components/ViewNote';
import SearchScreen from './components/SearchScreen';
import InfoModal from './components/InfoModal';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';
import { signOut } from './lib/auth';
import { getNotes, addNote, updateNote, deleteNote } from './lib/notes';

const NOTE_COLORS = [
  '#FF9E9E',
  '#91F48F',
  '#FFF599',
  '#9EFFFF',
  '#B69CFF',
  '#FD99FF',
];

function App() {
  const { user, loading: authLoading } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    if (user) {
      setDataLoading(true);
      try {
        const fetchedNotes = await getNotes(user.uid);
        setNotes(fetchedNotes.map(n => ({
          ...n,
          id: n.id!,
          createdAt: n.createdAt?.toDate() || new Date(),
          updatedAt: n.updatedAt?.toDate() || new Date(),
        })));
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setDataLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      setNotes([]);
    }
  }, [user, fetchNotes]);

  const handleAddNote = () => {
    const newNote: Note = {
      id: '', // Will be set by Firestore
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

  const handleSaveNote = async (title: string, content: string) => {
    if (user && selectedNote) {
      try {
        if (selectedNote.id) {
          // Update existing note
          await updateNote(selectedNote.id, { title, content });
        } else {
          // Add new note
          await addNote(user.uid, title || 'Untitled', content, selectedNote.color);
        }
        await fetchNotes();
        handleBack();
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };

  const handleDeleteNote = async () => {
    if (selectedNote?.id) {
      try {
        await deleteNote(selectedNote.id);
        await fetchNotes();
        handleBack();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
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

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-notes-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="App min-h-screen bg-notes-bg">
      {currentView === 'home' && (
        <HomeScreen
          notes={notes}
          onNoteClick={handleNoteClick}
          onAddNote={handleAddNote}
          onSearchClick={handleSearchClick}
          onInfoClick={handleInfoClick}
          onLogout={handleLogout}
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
      {dataLoading && (
        <div className="fixed top-4 right-4 z-50">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

export default App;
