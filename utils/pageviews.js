"use client"

import { useEffect } from "react";
import updateViews from "./updateViews";

export default function PageViews() {
    useEffect(() => {
        const pageViewed = localStorage.getItem('pageViewed');
        if (!pageViewed) {
            localStorage.setItem('pageViewed', true);
            updateViews()
        }
    }, []);
}