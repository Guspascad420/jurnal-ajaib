'use client'
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import Image from "next/image";
import logoSlb from '../../../public/logo_slb.jpg'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function signInStudent() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      window.location.href = '/';
      return { user: data.user };
    } catch (error) {
      return { error: error.message };
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await signInStudent();
    if (error) setError(error);
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary py-5 px-10 flex justify-between">
        <div>
          <h1 className="text-center font-display bg-gradient-to-b text-4xl outline-text from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Jurnal Ajaib</h1>
          <h1 className="text-center -mt-2 font-display bg-gradient-to-b text-2xl outline-text-2 from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Anak Luar Biasa </h1>
        </div>
         <Image src={logoSlb} width={100} alt="" className="rounded-lg"/>
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
        <div className="bg-[#869471] text-light-bg rounded-2xl border-3 border-[#5A6144] p-10">
          <h1 className="font-display text-light-bg [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144] text-3xl mb-5">Masuk ke Akun Sekolahmu</h1>
          {error && <div className="text-red-500">{error}</div>}
          <div className="max-w-sm mx-auto mt-10 space-y-4">
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
        <div className="font-bold text-[#5A6144] mt-5">Belum punya akun?
          <span className="text-[#FFCB69]">
            <a href="/sign-up"> Buat Akun</a>
          </span>
        </div>
        <div className="font-bold text-[#FFCB69] mt-3">
          <a href="/teacher/login">Masuk sebagai guru</a>
        </div>
      </div>
    </div>
  );
}
