'use client'
import { useStudentBooks } from "@/lib/supabase/hooks";
import frame40 from "/public/frame_40.png"
import image_11 from "/public/image_11.png";
import student2 from "/public/student2.png"
import Image from "next/image"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiBookOpen } from "react-icons/fi";
import { MdPersonOutline } from "react-icons/md";
import { supabase } from "@/lib/supabaseClient";
import bronze from "/public/bronze.png";
import silver from "/public/silver.png";
import gold from "/public/gold.png";

export default function Student() {
    const params = useParams();
    const id = params.id;
    const [count, setCount] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState(null);
    const [incrementPressed, setincrementPressed] = useState(false);
    const [decrementPressed, setDecrementPressed] = useState(false);
    const [addBookPressed, setAddBookPressed] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [progress, setProgress] = useState(0)
    const [pagesReadToday, setPagesReadToday] = useState(0);
    const [studentBooks, setStudentBooks] = useState([]);

    const { books, stats, hasUpdatedToday, loading } = useStudentBooks(id);

    const prioritizeBook = (bookId) => {
        setStudentBooks(prevBooks => {
            const index = prevBooks.findIndex(b => b.id === bookId);
            if (index === -1) return prevBooks;
            const newBooks = [
                prevBooks[index],
                ...prevBooks.slice(0, index),
                ...prevBooks.slice(index + 1)
            ];

            if (newBooks[0]?.current_page !== undefined) {
                setCurrentPage(newBooks[0].current_page);
            }
            if (newBooks[0]?.progress !== undefined) {
                setProgress(newBooks[0].progress);
            }
            return newBooks;
        });
    };

    const handleUpdatePage = async (bookId, currentPage, totalPages) => {
        setIsUpdating(true);
        setError(null);

        try {
            const { error } = await supabase
                .from('student_books')
                .update({
                    current_page: currentPage + count,
                    last_updated: new Date().toISOString(),
                    pages_read_today: count + pagesReadToday
                })
                .eq('book_id', bookId);

            if (error) throw error;

            // Show confirmation and hide after 3 seconds
            setCurrentPage(currentPage + count)
            setShowConfirmation(true);
            setProgress(Math.round(((currentPage + count) / totalPages) * 100))
            setPagesReadToday(count + pagesReadToday)

        } catch (err) {
            setError(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        setShowConfirmation(hasUpdatedToday)
        if (books?.length > 0) {
            setStudentBooks(books)
            setCurrentPage(books[0].current_page);
            setProgress(books[0].progress);
            setPagesReadToday(books[0].pages_read_today)
        }
    }, [books, hasUpdatedToday])

    return (
        <div className="fixed inset-0 bg-[url(/bg_school_koutei.jpg)] bg-cover bg-center -z-10">
            <div className="relative z-10 h-screen overflow-y-scroll">
                <header className="bg-primary py-5 flex justify-between items-center px-14">
                    <div>
                        <h1 className="text-center font-display bg-gradient-to-b text-4xl outline-text from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Jurnal Ajaib</h1>
                        <h1 className="text-center -mt-2 font-display bg-gradient-to-b text-2xl outline-text-2 from-[#FCEFB4] to-[#FFCB69] bg-clip-text text-transparent">Anak Luar Biasa </h1>
                    </div>
                    <div className="flex">
                        <div className="flex items-center border-2 border-b-light-bg border-t-0 border-x-0">
                            <FiBookOpen size={20} className="text-light-bg mb-1" />
                            <div className="ml-3 text-2xl font-display text-light-bg">Sedang Kamu Baca</div>
                        </div>
                        <Link href={`/students/${id}/profile`} className="flex items-center ml-10">
                            <MdPersonOutline size={30} className="text-light-bg mb-1" />
                            <div className="text-2xl font-display text-light-bg ml-3">Profil Kamu</div>
                        </Link>
                    </div>
                </header>
                {
                    loading
                        ? <div className="flex justify-center text-xl font-bold items-center h-screen">Memuat...</div>
                        : <div className="mt-14 mx-20">
                            {
                                showConfirmation &&
                                <div className="flex font-display items-center px-12 py-10 mb-16 bg-gradient-to-b rounded-lg from-[#FCEFB4] to-[#FFCB69] border-2 border-[#7D371E]">
                                    <Image src={
                                        progress === 50 ? bronze :
                                        progress === 75 ? silver :
                                        progress === 100 ? gold : student2
                                    } width={140} alt="" />
                                    <div className="ml-5">
                                        <h1 className="[-webkit-text-stroke:0.5px_#FFFFFF] text-4xl text-[#7D371E]">
                                            {
                                                progress === 50 ? 'Hebat, kamu sudah mencapai setengah buku' :
                                                    progress === 75 ? 'Hebat, kamu sudah mencapai 3/4 buku' :
                                                        progress === 100 ? 'Hebat, kamu menyelesaikan buku pertamamu' :
                                                            'Terima kasih sudah membaca buku hari ini'
                                            }
                                        </h1>
                                        <p className="[-webkit-text-stroke:1.3px_#FFFFFF] text-3xl text-[#7D371E] mt-3">
                                            {
                                                progress === 100 ? 'Tetap semangat membaca ya anak hebat!' :
                                                    `Hebat, kamu membaca ${pagesReadToday} halaman hari ini`
                                            }
                                        </p>
                                    </div>
                                </div>
                            }
                            <h1 className="text-[#5A6144] font-display text-4xl [text-shadow:-3px_-3px_0_#FEFAE0,-1px_-3px_0_#FEFAE0,0_-3px_0_#FEFAE0,1px_-3px_0_#FEFAE0,3px_-3px_0_#FEFAE0,3px_-1px_0_#FEFAE0,3px_0_0_#FEFAE0,3px_1px_0_#FEFAE0,3px_3px_0_#FEFAE0,1px_3px_0_#FEFAE0,0_3px_0_#FEFAE0,-1px_3px_0_#FEFAE0,-3px_3px_0_#FEFAE0,-3px_1px_0_#FEFAE0,-3px_0_0_#FEFAE0,-3px_-1px_0_#FEFAE0,-3px_-3px_0_#FEFAE0]">Ini buku yang terakhir kamu baca</h1>
                            {
                                studentBooks.length !== 0 &&
                                <div className="rounded-[10px] mb-15 mt-5 border-2 border-[#5A6144]">
                                    <div>
                                        <div className="py-2 bg-[#FFCB69] border border-t-0 border-l-0 
            border-r-0 rounded-tl-lg rounded-tr-lg border-b-2 border-b-[#5a6144]"></div>
                                        <div className="bg-primary py-10 px-10 flex justify-between">
                                            <div className="w-full">
                                                <h1 className="drop-shadow-[0_4px_0.5px_#646F55] font-display [text-shadow:-3px_-3px_0_#5A6144,-1px_-3px_0_#5A6144,0_-3px_0_#5A6144,1px_-3px_0_#5A6144,3px_-3px_0_#5A6144,3px_-1px_0_#5A6144,3px_0_0_#5A6144,3px_1px_0_#5A6144,3px_3px_0_#5A6144,1px_3px_0_#5A6144,0_3px_0_#5A6144,-1px_3px_0_#5A6144,-3px_3px_0_#5A6144,-3px_1px_0_#5A6144,-3px_0_0_#5A6144,-3px_-1px_0_#5A6144,-3px_-3px_0_#5A6144]
                                                 text-4xl font-medium text-[#FEDD8F]">{studentBooks[0].title}</h1>
                                                <div className="flex items-center mt-5">
                                                    <div className="relative border-2 px-2 w-3/4 mr-10 drop-shadow-[0_4px_0.5px_#646F55] border-[#5A6144] double-border py-2 rounded-lg bg-[#6E6852] z-10 text-center overflow-hidden">
                                                        <div style={{ width: `${progress}%` }} className="rounded-lg bg-gradient-to-b from-[#FCEFB4] to-[#FFCB69] py-1.5">

                                                        </div>
                                                    </div>
                                                    <div className="font-display drop-shadow-[0_4px_0.5px_#646F55] [text-shadow:-3px_-3px_0_#5A6144,-1px_-3px_0_#5A6144,0_-3px_0_#5A6144,1px_-3px_0_#5A6144,3px_-3px_0_#5A6144,3px_-1px_0_#5A6144,3px_0_0_#5A6144,3px_1px_0_#5A6144,3px_3px_0_#5A6144,1px_3px_0_#5A6144,0_3px_0_#5A6144,-1px_3px_0_#5A6144,-3px_3px_0_#5A6144,-3px_1px_0_#5A6144,-3px_0_0_#5A6144,-3px_-1px_0_#5A6144,-3px_-3px_0_#5A6144]
                                                     mt-2 text-3xl text-[#FEDD8F]">{currentPage} / {studentBooks[0].total_pages}</div>
                                                </div>
                                                {
                                                    studentBooks[0].current_page < studentBooks[0].total_pages &&
                                                    <div className="flex justify-end mt-10 items-center mr-24">
                                                        <button onClick={() => {
                                                            if (count > 0) setCount(count - 1)
                                                        }} onMouseDown={() => setDecrementPressed(!decrementPressed)} onMouseUp={() => setDecrementPressed(!decrementPressed)} className={`cursor-pointer rounded-xl px-3 py-5 border-3 border-[#FFCB69] bg-red-700 font-bold text-lg ${decrementPressed ? '' : 'drop-shadow-[0_4px_0.5px_#646F55]'
                                                            }`}>
                                                            <div className="bg-white px-2 py-[1px]"></div>
                                                        </button>
                                                        <div className="mx-5 rounded-xl bg-[#6E6852] h-13 w-14 text-3xl pt-1 font-display border-3 border-[#FFCB69] text-white flex justify-center items-center">{count}</div>
                                                        <button onClick={() => setCount(count + 1)} onMouseDown={() => setincrementPressed(!incrementPressed)} onMouseUp={() => setincrementPressed(!incrementPressed)} className={`cursor-pointer rounded-xl px-3 pb-2 pt-1 border-3
                                     text-white border-[#FFCB69] bg-[#6163E8] font-bold text-2xl ${incrementPressed ? '' : 'drop-shadow-[0_4px_0.5px_#646F55]'
                                                            }`}>
                                                            +
                                                        </button>
                                                        <button disabled={isUpdating} onClick={() => handleUpdatePage(studentBooks[0].id, studentBooks[0].current_page, studentBooks[0].total_pages)}
                                                            className="cursor-pointer drop-shadow-[0_4px_0.5px_#646F55] px-5 py-3 ml-5 bg-[#5A6144] font-bold border-2 border-[#FFCB69] text-white rounded-lg transition"
                                                        >
                                                            Tambah Halaman
                                                        </button>
                                                        <div>{error}</div>
                                                    </div>
                                                }
                                            </div>
                                            <Image src={progress === 100 ? image_11 : frame40} width={250} alt="" />
                                        </div>
                                        <div className="py-2 bg-[#FFCB69] border border-b-0 border-l-0 
                border-r-0 rounded-bl-lg rounded-br-lg border-t-2 border-t-[#5A6144]"></div>
                                    </div>
                                </div>
                            }
                            <div className="flex justify-between items-center">
                                <h1 className="text-[#5A6144] font-display text-4xl [text-shadow:-3px_-3px_0_#FEFAE0,-1px_-3px_0_#FEFAE0,0_-3px_0_#FEFAE0,1px_-3px_0_#FEFAE0,3px_-3px_0_#FEFAE0,3px_-1px_0_#FEFAE0,3px_0_0_#FEFAE0,3px_1px_0_#FEFAE0,3px_3px_0_#FEFAE0,1px_3px_0_#FEFAE0,0_3px_0_#FEFAE0,-1px_3px_0_#FEFAE0,-3px_3px_0_#FEFAE0,-3px_1px_0_#FEFAE0,-3px_0_0_#FEFAE0,-3px_-1px_0_#FEFAE0,-3px_-3px_0_#FEFAE0]">Buku lain yang sedang kamu baca</h1>
                                <a href={`${id}/books/add`}
                                    className={`px-5 py-3 ml-5 bg-[#5A6144] font-bold border-2 border-[#FFCB69] text-white rounded-lg transition ${addBookPressed ? '' : 'drop-shadow-[0_4px_0.5px_#646F55]'
                                        }`}
                                >
                                    <div onMouseDown={() => setAddBookPressed(!addBookPressed)} onMouseUp={() => setAddBookPressed(!addBookPressed)}>+ Tambah Buku</div>
                                </a>
                            </div>
                            <div className="grid grid-cols-2 mb-10">
                                {
                                    studentBooks.slice(1).map(book => (
                                        <div onClick={() => prioritizeBook(book.id)} key={book.id} className="cursor-pointer drop-shadow-[0_5px_0.5px_#646F55] rounded-lg bg-primary py-10 px-7 mt-5 mr-10 flex-1 border-2 border-[#5A6144]">
                                            <h1 className="drop-shadow-[0_4px_0.5px_#646F55] font-display [text-shadow:-3px_-3px_0_#5A6144,-1px_-3px_0_#5A6144,0_-3px_0_#5A6144,1px_-3px_0_#5A6144,3px_-3px_0_#5A6144,3px_-1px_0_#5A6144,3px_0_0_#5A6144,3px_1px_0_#5A6144,3px_3px_0_#5A6144,1px_3px_0_#5A6144,0_3px_0_#5A6144,-1px_3px_0_#5A6144,-3px_3px_0_#5A6144,-3px_1px_0_#5A6144,-3px_0_0_#5A6144,-3px_-1px_0_#5A6144,-3px_-3px_0_#5A6144]
                                                 text-4xl font-medium text-[#FEDD8F]">{book.title}</h1>
                                            <div className="flex items-center mt-5">
                                                <div className="relative border-2 px-2 w-3/4 mr-10 drop-shadow-[0_4px_0.5px_#646F55] border-[#5A6144] double-border py-2 rounded-lg bg-[#6E6852] z-10 text-center overflow-hidden">
                                                    <div style={{ width: `${book.progress}%` }} className="rounded-lg bg-gradient-to-b from-[#FCEFB4] to-[#FFCB69] py-1.5">

                                                    </div>
                                                </div>
                                                <div className="font-display drop-shadow-[0_4px_0.5px_#646F55] [text-shadow:-3px_-3px_0_#5A6144,-1px_-3px_0_#5A6144,0_-3px_0_#5A6144,1px_-3px_0_#5A6144,3px_-3px_0_#5A6144,3px_-1px_0_#5A6144,3px_0_0_#5A6144,3px_1px_0_#5A6144,3px_3px_0_#5A6144,1px_3px_0_#5A6144,0_3px_0_#5A6144,-1px_3px_0_#5A6144,-3px_3px_0_#5A6144,-3px_1px_0_#5A6144,-3px_0_0_#5A6144,-3px_-1px_0_#5A6144,-3px_-3px_0_#5A6144]
                                                     mt-2 text-3xl text-[#FEDD8F]">{`${book.current_page} / ${book.total_pages}`}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}