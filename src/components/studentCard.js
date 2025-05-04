import Image from "next/image"
import student_img from "/public/student.png"
import Link from 'next/link';

export default function StudentCard({ student }) {
    return (
        <div className="rounded-[10px] mb-15 border-2 border-[#5A6144]">
            <div className="py-2 bg-[#FFCB69] border border-t-0 border-l-0 
            border-r-0 rounded-tl-lg rounded-tr-lg border-b-2 border-b-[#5A6144]"></div>
            <div className="py-10 flex justify-center bg-light-bg">
                <Image src={student.img_url == null ? student_img : student.img_url} width={200} alt="" />
            </div>
            <div className="py-2 bg-[#FFCB69] border-2 border-l-0 
            border-r-0 border-[#5A6144]"></div>
            <div className="bg-primary py-10 flex flex-col items-center">
                <div className="font-display text-4xl font-medium text-[#FEDD8F] [text-shadow:-2px_-2px_0_#5A6144,-1px_-2px_0_#5A6144,0_-2px_0_#5A6144,1px_-2px_0_#5A6144,2px_-2px_0_#5A6144,2px_-1px_0_#5A6144,2px_0_0_#5A6144,2px_1px_0_#5A6144,2px_2px_0_#5A6144,1px_2px_0_#5A6144,0_2px_0_#5A6144,-1px_2px_0_#5A6144,-2px_2px_0_#5A6144,-2px_1px_0_#5A6144,-2px_0_0_#5A6144,-2px_-1px_0_#5A6144,-2px_-2px_0_#5A6144]">{student.nickname}</div>
                <div className="font-display text-3xl outline-text text-[#FAEDCD]">{student.class_name}</div>
                <a href={`/students/${student.id}`}
                    className="px-5 py-3 mt-5 bg-[#5A6144] font-bold border-2 border-[#FFCB69] text-white rounded-lg transition"
                >
                    Masuk
                </a>
            </div>
            <div className="py-2 bg-[#FFCB69] border border-b-0 border-l-0 
                border-r-0 rounded-bl-lg rounded-br-lg border-t-2 border-t-[#5A6144]"></div>
        </div>
    )
}