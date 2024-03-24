"use client"
import { RotateCcw } from "lucide-react"

export default function Error({ error, reset }) {
    return (
        <div className="py-24 lg:px-24 w-full flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl text-center font-bold ml-2">An Error Occured!</h1>
            <button
                className="btn btn-primary mt-2"
                onClick={
                    () => reset()
                }
            >
                <RotateCcw />
                Try again
            </button>
        </div>
    )
}