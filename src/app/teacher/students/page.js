'use client'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRef, useState } from 'react';
import { LiaEdit } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import { useStudents } from "@/lib/supabase/hooks";
import { FiUploadCloud } from "react-icons/fi";
import { supabase } from "@/lib/supabaseClient";

export default function Students() {
    const [showInput, setShowInput] = useState(false);
    const [showData, setShowData] = useState(false);
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const dropRef = useRef(null);
    const { students, loading, error } = useStudents();
    const [fullName, setfullName] = useState('');
    const [nickname, setNickname] = useState('');
    const [className, setClassName] = useState('');
    const [uploading, setUploading] = useState(false);

    const validateFile = (file) => {
        const allowedTypes = ['image/png', 'image/jpeg'];
        return file && allowedTypes.includes(file.type);
    };

    const handleFile = (incomingFile) => {
        if (validateFile(incomingFile)) {
            setFile(incomingFile);
            setFileError('');
        } else {
            setFile(null);
            setFileError('Format file harus berbentuk PNG atau JPG');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        handleFile(selectedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropRef.current.classList.add('bg-gray-200');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropRef.current.classList.remove('bg-gray-200');
    };

    const resizeImage = (file, targetWidth) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                if (!e.target?.result) return reject('No result');
                img.src = e.target.result;
            };

            img.onload = () => {
                const scaleFactor = targetWidth / img.width;
                const canvas = document.createElement('canvas');
                canvas.width = targetWidth;
                canvas.height = img.height * scaleFactor;

                const ctx = canvas.getContext('2d');
                if (!ctx) return reject('Canvas context error');

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else reject('Resize failed');
                }, file.type);
            };

            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async () => {
        setUploading(true);
        const resizedBlob = await resizeImage(file, 200);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error } = await supabase.storage
            .from('avatars')
            .upload(filePath, resizedBlob, {
                contentType: resizedBlob.type,
                upsert: true,
            });

        if (error) {
            alert('Failed to upload.');
        } else {
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            const { error: dbError } = await supabase
                .from('students')
                .insert({
                    nickname: nickname,
                    name: fullName,
                    class_name: className,
                    img_url: data.publicUrl
                });
            if (dbError) throw dbError;
            alert('Berhasil upload')
        }
        setUploading(false);
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login'
    }

    return (
        <div className="bg-white w-full">
            <div className="min-h-screen flex flex-col">
                <div className="px-10 py-7 border border-b-2 flex justify-between">
                    <div className="px-5 py-3 font-bold text-white rounded-md bg-[#2D3648]">
                        Jurnal Ajaib - Anak Luar Biasa
                    </div>
                    <button onClick={handleSignOut} className="cursor-pointer px-5 py-3 font-bold text-white rounded-lg bg-red-600">Keluar</button>
                </div>
                <div className="mt-10 mx-10">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-xl">Input Data Murid</h1>
                        <MdOutlineKeyboardArrowDown onClick={() => setShowInput(!showInput)} size={30} className={`cursor-pointer transform transition-transform duration-300 ${showInput ? 'rotate-180' : 'rotate-0'
                            }`} />
                    </div>
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showInput ? 'opacity-100 max-h-full translate-y-0' : 'opacity-0 max-h-0 -translate-y-4'}`}>
                        <div className="border-2 mt-5 rounded-lg px-5 py-7">
                            <div className="font-semibold mb-2">Nama Lengkap Murid</div>
                            <input
                                type="text"
                                value={fullName}
                                onChange={e => setfullName(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                            />
                            <div className="font-semibold mt-5 mb-2">Nama Panggilan Murid</div>
                            <input
                                type="text"
                                value={nickname}
                                onChange={e => setNickname(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                            />
                            <div className="font-semibold mt-5 mb-2">Kelas</div>
                            <input
                                type="text"
                                value={className}
                                onChange={e => setClassName(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                            />
                            <div className="font-semibold mt-5 mb-2">Foto Murid</div>
                            <label
                                ref={dropRef}
                                htmlFor="file-upload"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                className="flex flex-col items-center justify-center border-2 border-dashed border-[#A0ABC0] rounded-lg py-10 cursor-pointer text-center hover:bg-gray-50 transition"
                            >
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleChange}
                                />
                                <FiUploadCloud size={50} color="#717D96" />
                                <div className="text-lg">Tarik file dan lepaskan disini atau <span className="font-bold">klik untuk browse file</span></div>
                                <div className="text-lg text-[#717D96]">Ukuran maksimal file: <span className="font-bold">5 MB</span> dengan format <span className="font-bold">jpeg, png</span></div>
                            </label>
                            {fileError && (
                                <p className="mt-2 text-sm text-red-600">{fileError}</p>
                            )}
                            {file && (
                                <div className="mt-4 p-4 border rounded bg-white shadow">
                                    <h2 className="font-semibold text-gray-700 mb-2">File dipilih:</h2>
                                    <p className="text-gray-800">{file.name}</p>
                                </div>
                            )}
                            <div className="flex justify-end mt-5">
                                <button onClick={handleSubmit} className="cursor-pointer w-32 px-5 py-3 font-bold text-white flex justify-center rounded-lg bg-[#2D3648]">
                                    {
                                        !uploading ? <div className="w-10 h-10 border-4 border-gray-300 border-t-[#5A6144] rounded-full animate-spin"></div> : '+ Tambah'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-5">
                        <h1 className="font-bold text-xl">Data Murid</h1>
                        <MdOutlineKeyboardArrowDown onClick={() => setShowData(!showData)} size={30} className={`cursor-pointer transform transition-transform duration-300 ${showData ? 'rotate-180' : 'rotate-0'
                            }`} />
                    </div>
                    {
                        loading
                            ? <div></div>
                            : <table className={`min-w-full mb-10 mt-5 table-auto border-collapse border border-gray-300 
                            transition-all duration-500 ease-in-out overflow-hidden 
                            ${showData ? 'opacity-100 max-h-full translate-y-0' : 'opacity-0 max-h-0 -translate-y-4'}`}>
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Nomor</th>
                                        <th className="border border-gray-300 px-4 py-2">Nama Lengkap</th>
                                        <th className="border border-gray-300 px-4 py-2">Nama Panggilan</th>
                                        <th className="border border-gray-300 px-4 py-2">Kelas</th>
                                        <th className="border border-gray-300 px-4 py-2">Foto</th>
                                        <th className="border border-gray-300 px-4 py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {
                                        students.map((student, index) => (
                                            <tr key={student.id}>
                                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                                <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                                                <td className="border border-gray-300 px-4 py-2">{student.nickname}</td>
                                                <td className="border border-gray-300 px-4 py-2">{student.class_name}</td>
                                                <td className="border border-gray-300 px-7 py-2">
                                                    <div className={`${student.img_url == null ? 'bg-[#FF5252]' : 'bg-green-500'} rounded-lg text-white`}>
                                                        {
                                                            student.img_url == null ? 'Belum upload' : 'Sudah upload'
                                                        }
                                                    </div>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 flex justify-center">
                                                    <a href={`/teacher/students/${student.id}`}>
                                                        <LiaEdit size={25} color="#34AFF7" className="mr-1 cursor-pointer" />
                                                    </a>
                                                    <MdDeleteOutline size={25} color="red" />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                    }
                </div>
            </div>
        </div>
    );
}