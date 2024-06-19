"use client"
import { CircleAlert } from "lucide-react";

export default function ErrorModal({ errorText, defaultOpen=false }) {
    return (
        <dialog open={defaultOpen} className="modal" id="errorModal">
            <div className="modal-box flex justify-left items-center gap-5">
                <CircleAlert height={60} width={60} className="text-error" />
                <div>
                    <h3 className="font-bold text-lg">An Error occured!</h3>
                    <p className="py-4">{errorText}</p>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop bg-black bg-opacity-40">
                <button>close</button>
            </form>
        </dialog>
    )
}

export function ShowErrorModal() {
    document.getElementById('errorModal').showModal();
}