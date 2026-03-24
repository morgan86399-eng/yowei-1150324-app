'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderData = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setLoading(false);
    };

    fetchHeaderData();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // The onAuthStateChange listener will handle state updates
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-md mx-auto flex justify-between items-center p-3">
        <Link href="/" className="flex items-center gap-2">
            <img src="https://fd10e8e1c7.cbaul-cdnwnd.com/daec49a09b8083b3e3ac051ff98ea00b/200000030-b3d76b3d77/%E9%A4%8A%E5%BF%83%E6%8E%A8%E6%8B%BF%E5%A4%A7%E5%AD%972.png" alt="Logo" className="h-8 w-auto"/>
        </Link>
        
        <div className="text-right">
          {loading ? (
            <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          ) : user ? (
            <div className="flex items-center gap-3">
                <div className="text-xs">
                    <div className="text-gray-500 truncate max-w-[100px]">{user.email}</div>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white px-2 py-1 text-xs rounded-md hover:bg-red-600 transition-colors"
                >
                    登出
                </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="bg-[#2c5234] text-white px-3 py-1.5 text-xs font-bold rounded-md hover:bg-[#1e3b25] transition-colors">
                登入
              </Link>
              <Link href="/register" className="bg-gray-200 text-[#2c5234] px-3 py-1.5 text-xs font-bold rounded-md hover:bg-gray-300 transition-colors">
                註冊
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
