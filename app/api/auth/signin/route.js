import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const body = await req.json();
    const userId = body.userId;
    cookies().set('userId', userId, { secure: true, httpOnly: true, expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) });
    return NextResponse.json({ ok: true });
}