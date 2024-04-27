"use client"
import {Share, LinkIcon} from "lucide-react";

export default function ShareModal({ list_id, title, text, modalId }) {
    const wishlist_url = "https://mywishlists.fabian-kleine.dev/list/" + list_id;

    function shareLink() {
        const shareData = {
            title: title || "",
            text: text || "",
            url: wishlist_url
        }

        navigator.share(shareData);
    }

    modalId = modalId ? modalId : "shareModal";

    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box overflow-visible">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Share this Wishlist</h3>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Wishlist Link</span>
                    </div>
                    <div className="join">
                        <input disabled type="text" value={wishlist_url} className="input input-bordered w-full join-item disabled:cursor-text" />
                        <div className="tooltip" data-tip="Copy Link to Clipboard">
                            <button onClick={() => navigator.clipboard.writeText(wishlist_url)} className="btn join-item"><LinkIcon /></button>
                        </div>
                    </div>
                </label>
                <div className="form-control mt-5">
                    <button onClick={shareLink} className="btn"><Share height={20} />Share Link</button>
                </div>
            </div>
        </dialog>
    )
}

export function ShowShareModal(modalId) {
    modalId = modalId ? modalId : "shareModal";
    document.getElementById(modalId).showModal();
}

export function ShowShareModalButton({ modalId, children, className }) {
    return <button className={className} onClick={() => ShowShareModal(modalId)}>{children}</button>
}