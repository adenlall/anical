"use client"

import { FileManager } from "@/utils/ics/fileManager"
import { FileData } from "@/utils/ics/interfaces";
import { useEffect, useState } from "react";
import DownloadIcon from '~icons/gravity-ui/file-arrow-down';

export default () => {
    const [files, setFiles] = useState<FileData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        getAllFiles();
    }, [files]);
    const getAllFiles = async () => {
        const fservice = new FileManager();
        const fls = await fservice.getAllFiles();
        setFiles(fls);
    }

    const download = async (id: number) => {
        setLoading(true);
        const fservice = new FileManager();
        await fservice.downloadFile(id);
        setLoading(false);
    }


    return <dialog id="recent-modal" className="modal">
        <div className="modal-box w-full md:w-[80%] md:max-w-4xl">
            <div className="overflow-x-auto">
                {files.length ? (

                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th className="hidden md:table-cell">Size</th>
                                <th className="hidden md:table-cell">Type</th>
                                <th>Last Modified</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map(f => (
                                <tr key={f.id}>
                                    <th>{f.id}</th>
                                    <th>{f.name}</th>
                                    <td className="hidden md:table-cell">{Math.round(f.size / 1024)} kb</td>
                                    <td className="hidden md:table-cell">{f.type}</td>
                                    <td>{f.lastModified.toDateString()} {f.lastModified.toLocaleTimeString()}</td>
                                    <td>
                                        <button
                                            onClick={async () => await download(f.id)}
                                            disabled={loading}
                                            className="btn btn-primary"
                                        >
                                            <DownloadIcon />
                                            <span className="md:block hidden">Download</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="w-full py-4 flex-center">
                        <span className="text-2xl font-bold text-center">No Recent Calendars found!</span>
                    </div>
                )}
            </div>
        </div>
        <form method="dialog" className="backdrop-blur-sm modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
}