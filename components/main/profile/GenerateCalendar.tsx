"use client"

import { useAnimeDB } from "@/hooks/useAnimeDB";
import { useState } from "react";

export default () => {

    const [data, setData] = useState([]);
    const { items, refreshItems } = useAnimeDB();

    const generate = () => {
        console.log(items);
    }

    return <>
        <button
            onClick={() => (document.getElementById('generate-modal') as HTMLDialogElement)?.showModal()}
            className="btn btn-lg bg-gradient-to-r from-primary via-accent to-secondary text-base-300"
        >
            Generate Calendar
        </button>
        <dialog id="generate-modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click outside to close</p>
                <button onClick={() => generate()} className="btn">Generate</button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </>
}