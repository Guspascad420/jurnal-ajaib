'use client'
import { useAddStudentBook } from "@/lib/supabase/hooks";
import bookSmile from "/public/book_smile.png"
import Image from "next/image"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FiBookOpen } from "react-icons/fi";
import { MdPersonOutline } from "react-icons/md";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddBook() {
    const params = useParams();
    const [title, setTitle] = useState('');
    const [pages, setPages] = useState('');
    const id = params.id;
    const {
        addStudentBook,
        loading,
        error,
        addedBook
    } = useAddStudentBook();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Mohon masukkan judul buku');
            return;
        }
    
        if (!pages || isNaN(parseInt(pages))) {
            alert('Masukkan jumlah halaman yang valid');
            return;
        }

        const result = await addStudentBook(
            id,
            title,
            parseInt(pages)
        );

        if (result) {
            window.history.back()
        }
    };

    return (
        <div className="fixed inset-0 bg-[url(/bg_school_koutei.jpg)] bg-cover bg-center -z-10">
            <div className="relative z-10 h-screen overflow-y-scroll">
                <header className="bg-primary py-5 flex justify-between items-center px-14">
                    <div>
                        <h1 className="text-center font-display bg-gradient-to-b text-4xl outline-text from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Jurnal Ajaib</h1>
                        <h1 className="text-center -mt-2 font-display bg-gradient-to-b text-2xl outline-text-2 from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Anak Luar Biasa </h1>
                    </div>
                    <div className="flex">
                        <Link href={`/students/${id}`} className="flex items-center border-2 border-b-light-bg border-t-0 border-x-0">
                            <FiBookOpen size={20} className="text-light-bg mb-1" />
                            <div className="ml-3 text-2xl font-display text-light-bg">Sedang Kamu Baca</div>
                        </Link>
                        <Link href={`/students/${id}/profile`} className="flex items-center ml-10">
                            <MdPersonOutline size={30} className="text-light-bg mb-1" />
                            <div className="text-2xl font-display text-light-bg ml-3">Profil Kamu</div>
                        </Link>
                    </div>
                </header>
                <div className="my-14 mx-20">
                    <div>
                        <h1 className="text-[#5A6144] font-display text-4xl [text-shadow:-3px_-3px_0_#FEFAE0,-1px_-3px_0_#FEFAE0,0_-3px_0_#FEFAE0,1px_-3px_0_#FEFAE0,3px_-3px_0_#FEFAE0,3px_-1px_0_#FEFAE0,3px_0_0_#FEFAE0,3px_1px_0_#FEFAE0,3px_3px_0_#FEFAE0,1px_3px_0_#FEFAE0,0_3px_0_#FEFAE0,-1px_3px_0_#FEFAE0,-3px_3px_0_#FEFAE0,-3px_1px_0_#FEFAE0,-3px_0_0_#FEFAE0,-3px_-1px_0_#FEFAE0,-3px_-3px_0_#FEFAE0]">Tambah buku bacaan baru</h1>
                        <div className="flex items-center justify-between drop-shadow-[0_5px_0.5px_#646F55] rounded-lg bg-primary py-10 px-7 mt-5 border-2 border-[#5A6144]">
                            <div className="flex-1">
                                <h1 className="drop-shadow-[0_3px_0.5px_#646F55] font-display text-light-bg text-3xl mb-2">Masukkan Judul Buku</h1>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Judul Buku"
                                    className="w-full text-light-bg px-4 py-2 border-2 border-light-bg rounded-lg focus:outline-none"
                                />
                                <h1 className="mt-5 drop-shadow-[0_3px_0.5px_#646F55] font-display text-light-bg text-3xl mb-2">Masukkan Jumlah Halaman pada Buku</h1>
                                <input
                                    type="text"
                                    value={pages}
                                    onChange={(e) => setPages(e.target.value)}
                                    placeholder="Jumlah Halaman"
                                    className="w-full text-light-bg px-4 py-2 border-2 border-light-bg rounded-lg focus:outline-none"
                                />
                                <button onClick={handleSubmit}
                                    className="drop-shadow-[0_4px_0.5px_#646F55] cursor-pointer active:drop-shadow-none mt-5 py-3 w-full bg-[#5A6144] font-bold border-2 border-[#FFCB69] text-white rounded-lg transition"
                                >
                                    {loading ? 'Menambakan...' : 'Tambah Buku'}
                                </button>
                            </div>
                            <Image src={bookSmile} width={250} alt="" className="h-44 ml-20 mr-10" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}