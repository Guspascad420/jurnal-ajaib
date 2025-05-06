'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import Image from "next/image";
import logoSlb from '../../../public/logo_slb.jpg';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setfullName] = useState('');
    const [nickname, setNickname] = useState('');
    const [className, setClassName] = useState('');
    const [error, setError] = useState('');

    async function signUpStudent() {
        try {
            // 1. Create auth user
            const { data: authUser, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        user_type: 'student',
                        name: fullName
                    }
                }
            });

            if (authError) throw authError;

            const { error: dbError } = await supabase
                .from('students')
                .insert({
                    id: authUser.user.id,
                    email,
                    nickname: nickname,
                    name: fullName,
                    class_name: className
                });

            if (dbError) throw dbError;

            window.location.href = '/';
            return { success: true };
        } catch (error) {
            return { error: error.message };
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const { error } = await signUpStudent();
        if (error) setError(error);
    }


    return (
        <div className="flex flex-col h-screen">
            <header className="bg-primary py-5 px-10 flex justify-between items-center">
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
            <div className="flex flex-col justify-center items-center flex-1 py-14">
                <div className="bg-[#869471] rounded-2xl border-3 border-[#5A6144] p-10">
                    <h1 className="font-display text-light-bg [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144] text-3xl mb-5">Buat Akun Sekolah Baru</h1>
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="max-w-sm mx-auto mt-10 space-y-4 text-light-bg">
                        <div className="text-light-bg font-semibold mb-2">Nama Lengkap</div>
                        <input
                            type="text"
                            value={fullName}
                            onChange={e => setfullName(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-light-bg rounded-xl focus:outline-none focus:ring-2"
                        />
                        <div className="text-light-bg font-semibold mb-2">Nama Panggilan</div>
                        <input
                            type="text"
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-light-bg rounded-xl focus:outline-none focus:ring-2"
                        />
                        <div className="text-light-bg font-semibold mb-2">Kelas</div>
                        <input
                            type="text"
                            value={className}
                            onChange={e => setClassName(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-light-bg rounded-xl focus:outline-none focus:ring-2"
                        />
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
                        <button onClick={handleSubmit}
                            className="w-full cursor-pointer mt-2 py-2 bg-[#5A6144] font-bold border-2 border-[#FFCB69] text-white rounded-xl transition"
                        >
                            Buat Akun
                        </button>
                    </div>
                </div>
                <div className="font-bold text-[#5A6144] mt-5">Sudah punya akun? <span className="text-[#FFCB69] hover:cursor-pointer"><a href="/login">Masuk</a></span></div>
            </div>
        </div>
    );
}