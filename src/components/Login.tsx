import React, { useState } from 'react';
import { signUp, signIn, signInWithGoogle } from '../lib/auth';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isSignUp) {
                await signUp(email, password);
            } else {
                await signIn(email, password);
            }
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        try {
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message || 'Google Sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Cloud Notes</h1>
                    <p className="text-white/70">Your thoughts, anywhere, anytime.</p>
                </div>

                <div className="flex bg-white/5 p-1 rounded-xl mb-8">
                    <button
                        onClick={() => setIsSignUp(false)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!isSignUp ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white/5'
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsSignUp(true)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${isSignUp ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white/5'
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-outfit"
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-outfit"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 group shadow-xl"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        ) : isSignUp ? (
                            <>
                                <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Create Account
                            </>
                        ) : (
                            <>
                                <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-transparent text-white/40 uppercase tracking-widest">Or continue with</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full bg-white/5 border border-white/10 text-white font-medium py-3 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    Google
                </button>
            </div>
        </div>
    );
};

export default Login;
