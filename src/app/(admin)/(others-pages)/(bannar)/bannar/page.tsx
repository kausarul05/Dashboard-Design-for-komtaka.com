"use client";
import Image from 'next/image';
import React, { useRef, useState } from 'react'

export default function Page() {
    const [files, setFiles] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDelete = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const newFileUrl = URL.createObjectURL(e.target.files[0]);
            setFiles([...files, newFileUrl]);
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold mb-2">Update Banners</h2>
            <p className="text-sm mb-2">Upload Photo</p>

            <div
                onClick={handleUploadClick}
                className="border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center h-40 mb-6 cursor-pointer"
            >
                {/* <UploadCloud className="w-8 h-8 text-gray-500 mb-2" /> */}
                <p className="font-medium">Upload Photos</p>
                <p className="text-xs text-gray-400">JPG, JPEG, PNG, PDF, GIF</p>
                <p className="text-xs text-gray-400">max: 10 MB</p>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
            />

            {files.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                    {files.map((file, index) => (
                        <div key={index} className="relative border rounded-md overflow-hidden">
                            <Image src={file} alt="Banner" width={300} height={200} className="object-cover" />
                            <button
                                onClick={() => handleDelete(index)}
                                className="absolute top-2 left-2 bg-white text-red-500 flex items-center px-2 py-1 text-xs rounded shadow"
                            >
                                {/* <Trash2 className="w-3 h-3 mr-1" /> Delete */}
                            </button>
                            <p className="text-xs text-center mt-1 truncate px-2">{file.split('/').pop()}</p>
                            <div className="h-1 bg-blue-500 w-full mt-1" />
                            <p className="text-xs text-center mb-2">100%</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
