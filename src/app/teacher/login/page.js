'use client'
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [fullName, setfullName] = useState('');

  // async function createTeacherAccount() {
  //   const { data, error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       data: {
  //         user_type: 'teacher',
  //         name : fullName
  //       }
  //     }
  //   });

  //   if (error) throw error;
  // }

  async function signInTeacher() {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      const userType = authData.user?.user_metadata?.user_type;
      if (userType !== 'teacher') {
        await supabase.auth.signOut();
        throw new Error('Hanya guru yang dapat mengakses fitur ini');
      }

      window.location.href = '/teacher/students'

      return { user: authData.user };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await signInTeacher();
    if (error) setError(error);
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary py-5 px-10 flex justify-between">
        <div>
          <h1 className="text-center font-display bg-gradient-to-b text-4xl outline-text from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Jurnal Ajaib</h1>
          <h1 className="text-center -mt-2 font-display bg-gradient-to-b text-2xl outline-text-2 from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Anak Luar Biasa </h1>
        </div>
        <div className="font-display text-center font-medium text-[#5A6144] [text-shadow:-2px_-2px_0_#D1E0CD,-1px_-2px_0_#D1E0CD,0_-2px_0_#D1E0CD,1px_-2px_0_#D1E0CD,2px_-2px_0_#D1E0CD,2px_-1px_0_#D1E0CD,2px_0_0_#D1E0CD,2px_1px_0_#D1E0CD,2px_2px_0_#D1E0CD,1px_2px_0_#D1E0CD,0_2px_0_#D1E0CD,-1px_2px_0_#D1E0CD,-2px_2px_0_#D1E0CD,-2px_1px_0_#D1E0CD,-2px_0_0_#D1E0CD,-2px_-1px_0_#D1E0CD,-2px_-2px_0_#D1E0CD]">
          <h1 className="text-2xl">
            SLB Putra Jaya Malang
          </h1>
          <h1 className="text-xl">
            Nusa Indah 11 A, Lowokwaru, Malang
          </h1>
        </div>
      </header>
      <div className="w-full bg-[#FFCB69] border-2 py-2 border-l-0 border-r-0"></div>
      <div className="flex flex-col justify-center items-center flex-1 py-14">
        <div className="bg-[#869471] rounded-2xl border-3 border-[#5A6144] p-10">
          <h1 className="font-display text-light-bg [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144] text-3xl mb-5">
            Masuk sebagai Guru
          </h1>
          {error && <div className="text-red-500">{error}</div>}
          <div className="max-w-sm mx-auto mt-5 space-y-4 text-light-bg">
            {/* <div className="text-light-bg font-semibold mb-2">Nama Lengkap</div>
            <input
              type="text"
              value={fullName}
              onChange={e => setfullName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-light-bg rounded-xl focus:outline-none focus:ring-2"
            /> */}
            <div className="text-light-bg font-semibold mb-2">Email</div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-light-bg rounded-xl focus:outline-none focus:ring-2"
            />
            <div className="text-light-bg font-semibold mb-2">Password</div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-light-bg rounded-xl focus:outline-none focus:ring-2"
            />
            <div className="text-light-bg font-semibold mt-5">Lupa Password?</div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full cursor-pointer py-2 bg-[#5A6144] font-bold border-2 border-[#FFCB69] text-white rounded-xl transition"
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
