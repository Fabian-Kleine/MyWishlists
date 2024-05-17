import { NextResponse } from "next/server";
import WebshopFetch from "@/utils/webshopfetch";

export async function POST(req) {
    const body = await req.json();

    const response = await WebshopFetch(body);

    return NextResponse.json(response);
}