import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserEmail } from '../lib/auth';
import { Mail, Loader2, X } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateUserEmail(user, newEmail);
      setSuccess('Email updated successfully!');
      setNewEmail('');
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
        setError('For security, please logout and login again to change your email.');
      } else {
        setError(err.message || 'Failed to update email');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#252525] w-full max-w-md rounded-2xl p-6 shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-white/60 mb-2">Current Email</label>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-white">
            {user?.email}
          </div>
        </div>

        <form onSubmit={handleUpdateEmail} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">New Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-xl text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Update Email'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;