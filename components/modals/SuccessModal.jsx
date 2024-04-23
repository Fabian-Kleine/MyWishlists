"use client"
import { CircleCheckBig } from "lucide-react";

export default function SuccessModal({ successText }) {
    return (
        <dialog className="modal" id="successModal">
            <div className="modal-box flex justify-left items-center gap-5">
                <CircleCheckBig height={60} width={60} className="text-accent" />
                <div>
                    <h3 className="font-bold text-lg">Success!</h3>
                    <p className="py-4">{successText}</p>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop bg-black bg-opacity-40">
                <button>close</button>
            </form>
        </dialog>
    )
}

export function ShowSuccessModal() {
    document.getElementById('successModal').showModal();
}