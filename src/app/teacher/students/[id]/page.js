'use client'
import { useStudentBooks } from "@/lib/supabase/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { LiaEdit } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";

export default function StudentDetails() {
    const params = useParams();
    const { student, books, stats, loading } = useStudentBooks(params.id);

    const totalPagesRead = books.reduce((sum, book) => sum + book.current_page, 0);
    const completedBooksCount = books.filter(book => book.status === "completed").length;

    const formatDate = (isoDate) => {
        const dateObj = new Date(isoDate);

        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = dateObj.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    return (
        <div className="bg-white w-full">
            <div className="min-h-screen flex flex-col">
                <div className="px-10 py-7 border border-b-2 flex justify-between">
                    <div className="px-5 py-3 font-bold text-white rounded-md bg-[#2D3648]">
                        Jurnal Ajaib - Anak Luar Biasa
                    </div>
                    <button className="px-5 py-3 font-bold text-white rounded-lg bg-[#2D3648]">Keluar</button>
                </div>
                <div className="mt-10 mx-10">
                    <div className="flex justify-between mt-5">
                        <h1 className="font-bold text-xl">Data Murid</h1>
                        <div className="flex">
                            <Link href="/students/">
                                <LiaEdit size={25} color="#34AFF7" className="mr-1 cursor-pointer" />
                            </Link>
                            <MdDeleteOutline size={25} color="red" />
                        </div>
                    </div>
                    <table className={`min-w-full mb-10 mt-5 table-auto border-collapse border border-gray-300 
        transition-all duration-500 ease-in-out overflow-hidden`}>
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Nama Lengkap</th>
                                <th className="border border-gray-300 px-4 py-2">Nama Panggilan</th>
                                <th className="border border-gray-300 px-4 py-2">Kelas</th>
                                <th className="border border-gray-300 px-4 py-2">Foto</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{student.nickname}</td>
                                <td className="border border-gray-300 px-4 py-2">{student.class_name}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="bg-[#FF5252] rounded-lg text-white">
                                        Belum Upload
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h1 className="font-bold text-xl mb-3">Skor Murid</h1>
                    <div className="flex">
                        <div className="flex-1 border-2 rounded-xl px-10 py-5 text-center mr-5">
                            <div className="font-bold text-xl">Total Buku Selesai</div>
                            <div className="font-bold text-6xl">{completedBooksCount}</div>
                        </div>
                        <div className="flex-1 border-2 rounded-xl px-10 py-5 text-center mr-5">
                            <div className="font-bold text-xl">Total Halaman</div>
                            <div className="font-bold text-6xl">{totalPagesRead}</div>
                        </div>
                        <div className="flex-1 border-2 rounded-xl px-10 py-5 text-center">
                            <div className="font-bold text-xl">Rata-Rata Harian</div>
                            <div className="font-bold text-6xl">0</div>
                        </div>
                    </div>
                    <h1 className="font-bold text-xl mb-3 mt-10">Detail Bacaan</h1>
                    <table className={`min-w-full mb-10 mt-5 table-auto border-collapse border border-gray-300 
                    transition-all duration-500 ease-in-out overflow-hidden`}>
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Nomor</th>
                                <th className="border border-gray-300 px-4 py-2">Tanggal</th>
                                <th className="border border-gray-300 px-4 py-2">Judul Buku</th>
                                <th className="border border-gray-300 px-4 py-2">Jumlah Halaman</th>
                                <th className="border border-gray-300 px-4 py-2">Halaman Terbaca</th>
                                <th className="border border-gray-300 px-4 py-2">Persentase</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {books.map((book, index) => (
                                <tr key={book.id}>
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{formatDate(book.last_updated)}</td>
                                    <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{book.total_pages}</td>
                                    <td className="border border-gray-300 px-4 py-2">{book.current_page}</td>
                                    <td className="border border-gray-300 px-4 py-2">{book.progress + '%'}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}