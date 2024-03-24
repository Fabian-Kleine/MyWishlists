"use client"
import { useState, useEffect } from "react"

export default function Countdown({ date }) {
    const calculateTimeLeft = () => {
        const difference = +new Date(date) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44)),
                days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30.44),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max w-fit">
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.months }}></span>
                </span>
                months
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.days }}></span>
                </span>
                days
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.hours }}></span>
                </span>
                hours
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.minutes }}></span>
                </span>
                min
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": timeLeft.seconds }}></span>
                </span>
                sec
            </div>
        </div>
    )
}