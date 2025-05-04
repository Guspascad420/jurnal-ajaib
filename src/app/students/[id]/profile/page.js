'use client'
import StudentCard from "@/components/studentCard";
import { useStudent, useStudentWithCompletedBooks } from "@/lib/supabase/hooks";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FiBookOpen } from "react-icons/fi";
import { MdPersonOutline } from "react-icons/md";

export default function StudentProfile() {
    const params = useParams();
    const id = params.id;
    const { student, loading, error, completedBooks } = useStudentWithCompletedBooks(id)

    return (
        <div>
            <header className="bg-primary py-5 flex justify-between items-center px-14">
                <div>
                    <h1 className="text-center font-display bg-gradient-to-b text-4xl outline-text from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Jurnal Ajaib</h1>
                    <h1 className="text-center -mt-2 font-display bg-gradient-to-b text-2xl outline-text-2 from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Anak Luar Biasa </h1>
                </div>
                <div className="flex">
                    <Link href={`/students/${id}`} className="flex items-center">
                        <FiBookOpen size={20} className="text-light-bg mb-1" />
                        <div className="ml-3 text-2xl font-display text-light-bg">Sedang Kamu Baca</div>
                    </Link>
                    <Link href={`/students/${id}/profile`} className="flex items-center ml-10 border-2 border-b-light-bg border-t-0 border-x-0">
                        <MdPersonOutline size={30} className="text-light-bg mb-1" />
                        <div className="text-2xl font-display text-light-bg ml-3">Profil Kamu</div>
                    </Link>
                </div>
            </header>
            {
                loading
                    ? <div className="flex justify-center text-xl font-bold items-center h-screen">Memuat...</div>
                    : <div className="mt-14 mx-20">
                        <div className="flex">
                            <div className="flex-1">
                                <StudentCard student={student} />
                            </div>
                            <div className="flex-[2.5] ml-10 font-display">
                                <h1 className="text-[#5A6144] text-4xl">Buku terakhir yang kamu selesaikan</h1>
                                {
                                    completedBooks.forEach(book => (
                                        <div className="drop-shadow-[0_5px_0.5px_#646F55] rounded-lg bg-primary py-7 px-7 mt-5 border-2 border-[#5A6144]">
                                            <h1 className="drop-shadow-[0_4px_0.5px_#646F55] bg-gradient-to-b text-4xl font-medium
                         [-webkit-text-stroke:1.7px_#5A6144] from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">{book.title}</h1>
                                            <div className="mt-10 text-light-bg text-2xl drop-shadow-[0_3px_0.5px_#646F55]">Selesai dibaca : {book.reading_data.end_date}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <h1 className="text-[#5A6144] text-4xl font-display mb-2">Rata-rata minat baca kamu</h1>
                        <div className="flex gap-5 h-full mb-10">
                            <div className="flex-1 flex flex-col justify-between border-[#5A6144] border-2 rounded-xl bg-primary px-10 py-5 text-center">
                                <div className="text-7xl font-display text-[#FEDD8F] [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144]">
                                    3
                                </div>
                                <div className="text-2xl font-display text-[#FEDD8F] [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144]">
                                    Total Buku Terbaca
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-between border-[#5A6144] border-2 rounded-xl bg-primary px-10 py-5 text-center">
                                <div className="text-7xl font-display text-[#FEDD8F] [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144]">
                                    246
                                </div>
                                <div className="text-2xl font-display text-[#FEDD8F] [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144]">
                                    Total Halaman Terbaca
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-between border-[#5A6144] border-2 rounded-xl bg-primary px-10 py-5 text-center">
                                <div className="text-7xl font-display text-[#FEDD8F] [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144]">
                                    8.5
                                </div>
                                <div className="text-2xl font-display text-[#FEDD8F] [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144]">
                                    Rata-Rata Persentase
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-between border-[#5A6144] border-2 rounded-xl bg-primary px-10 py-5 text-center">
                                <div className="text-7xl font-display text-[#FEDD8F] [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144]">
                                    8.5
                                </div>
                                <div className="text-2xl font-display text-[#FEDD8F] [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144]">
                                    Rata-Rata Halaman Harian
                                </div>
                            </div>
                        </div>


                    </div>
            }
        </div>
    )
}