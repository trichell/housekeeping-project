'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const handleLogin = async () => {
    const presetEmail = 'nadya@email.com';
    const presetPassword = '123456';

    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    if (email === presetEmail && password === presetPassword) {
      localStorage.setItem('token', 'fake-jwt-token');
      router.push('/dashboard');
    } else {
      setError('Email atau password salah.');
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F6D9EE] to-[#F3C78D]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-[#C54B8C] mb-6">
          Log in
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#C54B8C] text-white font-bold py-3 rounded hover:bg-[#D0748B] disabled:opacity-60"
        >
          {loading ? 'Loading...' : 'Masuk'}
        </button>

        <p className="text-center text-sm mt-6 text-black">
          Belum punya akun?{' '}
          <a
            href="/register"
            className="text-black-600 font-semibold hover:underline"
          >
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
}