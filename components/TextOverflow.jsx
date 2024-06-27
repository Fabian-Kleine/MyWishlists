"use client"
import { useState } from "react"
import classNames from "classnames";
import { renderToString } from 'react-dom/server';

export default function TextOverflow({ children, clamp, className, maxLength, ...props }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const childrenString = renderToString(children);

    return (
        <div {...props} className={className}>
            <p
                className={classNames(!isExpanded && `line-clamp-${clamp}`)}
            >
                {children}
            </p>
            {childrenString.length > maxLength && (
                <span
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-primary font-bold cursor-pointer">
                    {isExpanded ? "Show less" : "Read more"}
                </span>
            )}
        </div>
    )
}