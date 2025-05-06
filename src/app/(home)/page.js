'use client'
import StudentCard from "@/components/studentCard";
import { supabase } from '../../lib/supabaseClient'
import { useEffect, useState } from "react";
import Image from "next/image";
import logoSlb from '../../../public/logo_slb.jpg'

export default function Home() {
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login'
    }
    const [students, setStudents] = useState([])
    const [initialStudent, setInitialStudents] = useState([])
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        const input = e.target.value;
        setQuery(input);

        if (input.trim() === '') {
            setStudents(initialStudent);
          } else {
            const filtered = students.filter((student) =>
                student.name.toLowerCase().includes(input.toLowerCase())
            );
            setStudents(filtered);
          }
    };

    useEffect(() => {
        const loadStudents = async () => {
            const { data, error } = await supabase
                .from('students')
                .select('*')

            if (error) throw error;

            setStudents(data);
            setInitialStudents(data);
        };
        loadStudents();
    }, [])

    return (
        <div className="fixed inset-0 bg-[url(/bg_school_koutei.jpg)] bg-cover bg-center -z-10">
            <div className="relative z-10 h-screen overflow-y-scroll">
                <header className="bg-primary py-5 flex justify-between items-center px-14">
                    <div>
                        <h1 className="text-center font-display bg-gradient-to-b text-4xl outline-text from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Jurnal Ajaib</h1>
                        <h1 className="text-center -mt-2 font-display bg-gradient-to-b text-2xl outline-text-2 from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Anak Luar Biasa </h1>
                    </div>
                    <Image src={logoSlb} width={100} alt="" className="rounded-lg"/>
                    <button
                        onClick={handleSignOut}
                        className="px-3 py-3 my-2 cursor-pointer bg-red-800 font-bold border-2 border-[#FFCB69] text-white rounded-xl transition"
                    >
                        Log Out
                    </button>
                </header>
                <div className="w-full bg-[#FFCB69] border-2 py-2 border-l-0 border-r-0"></div>
                <h1 className="font-display drop-shadow-[0_3px_0.7px_#646F55] text-[#FEDD8F] mt-10 text-center [text-shadow:-3px_-3px_0_#5A6144,-1px_-3px_0_#5A6144,0_-3px_0_#5A6144,1px_-3px_0_#5A6144,3px_-3px_0_#5A6144,3px_-1px_0_#5A6144,3px_0_0_#5A6144,3px_1px_0_#5A6144,3px_3px_0_#5A6144,1px_3px_0_#5A6144,0_3px_0_#5A6144,-1px_3px_0_#5A6144,-3px_3px_0_#5A6144,-3px_1px_0_#5A6144,-3px_0_0_#5A6144,-3px_-1px_0_#5A6144,-3px_-3px_0_#5A6144] text-5xl mb-5">
                    Pilih Akun Kamu Dulu Yaa
                </h1>
                <div className="mx-36 mt-5">
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Kamu bisa cari nama kamu disini..."
                        className="w-full bg-[#5A6144] text-[#D1E0CD] pl-5 py-2 border-2 border-[#D1E0CD] rounded-lg"
                    />
                </div>
                <div className="my-15 mx-14 grid grid-cols-4 gap-10">
                    {
                        students.map(student => (
                            <StudentCard key={student.id} student={student} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
