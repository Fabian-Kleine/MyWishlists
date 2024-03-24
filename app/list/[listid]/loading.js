export default function Loading() {
    return (
        <>
            <div className="flex justify-between flex-wrap w-full gap-4">
                <div className="w-3/4">
                    <div className="skeleton h-10 w-1/3 mb-4"></div>
                    <div className="skeleton h-6 w-1/2 mb-2"></div>
                    <div className="skeleton h-6 w-1/2 mb-2"></div>
                    <div className="skeleton h-6 w-1/2 mb-2"></div>
                    <div className="skeleton h-6 w-1/3 mb-2"></div>
                    <div className="skeleton h-6 w-1/4 mb-2"></div>
                </div>
            </div>
            <div className="flex flex-wrap justify-center w-full gap-2 mt-24">
                {Array.from({ length: 6 }).map((e, index) =>
                    <div key={index} className="card card-compact w-96 bg-base-100 shadow-xl h-fit">
                        <div className="skeleton h-[250px] w-full"></div>
                        <div className="p-2">
                            <div className="skeleton h-10 w-1/2 mb-3"></div>
                            <div className="skeleton h-6 w-full mb-2"></div>
                            <div className="skeleton h-6 w-full mb-2"></div>
                            <div className="skeleton h-6 w-1/3 mb-2"></div>
                            <div className="card-action">
                                <button className="btn btn-primary w-full h-8"><span className="loading loading-spinner"></span>Loading</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}