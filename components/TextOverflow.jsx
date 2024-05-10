"use client"
import { useState } from "react"
import classNames from "classnames";

export default function TextOverflow({ children, clamp, className, ...props }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div {...props} className={className}>
            <p
                className={classNames(!isExpanded && `line-clamp-${clamp}`)}
            >
                {children}
            </p>
            <span
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary font-bold cursor-pointer">
                {isExpanded ? "Show less" : "Read more..."}
            </span>
        </div>
    )
}