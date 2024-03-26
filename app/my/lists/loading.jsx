export default function Loading() {
    return (
        <>
            {Array.from({ length: 6 }).map((e, i) =>
                <div key={i} className="card w-96 bg-base-100 shadow-xl h-fit">
                    <div className="card-body py-5">
                        <div className="skeleton h-6 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-36"></div>
                        <div className="card-actions justify-center">
                            <button className="btn btn-sm btn-primary flex-grow animate-pulse"></button>
                            <button className="btn btn-sm btn-neutral flex-grow animate-pulse"></button>
                        </div>
                        <div className="card-actions mt-1">
                            <div className="tooltip tooltip-bottom" data-tip="Open Wishlist">
                                <button className="btn btn-sm btn-square"><span className="loading loading-spinner loading-sm"></span></button>
                            </div>
                            <div className="tooltip tooltip-bottom" data-tip="Share Wishlist">
                                <button className="btn btn-sm btn-square"><span className="loading loading-spinner loading-sm"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}