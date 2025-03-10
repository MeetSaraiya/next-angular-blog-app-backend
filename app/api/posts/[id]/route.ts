import bcrypt from 'bcrypt';
import pool from '@/app/utils/db';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { promises } from 'stream';
import { error } from 'console';
import { verifyuser } from '../route';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string } >}) {
    const user = await verifyuser(req);
    if (!user) {
        return NextResponse.json({ message: "user not found , kindly do login again" }, { status: 401 })
    }
    try {
        const { content } = await req.json();
        const {id}=await params ;
        const result = await pool.query("update posts set content = $1 where id =$2 ", [ content, Number(id)]);

        return NextResponse.json("post got updated");
    } catch {
        console.log(error);
        return NextResponse.json({
            error: "failed to update the post"
        },
            { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const user = verifyuser(req);
    if (!user) {
        return NextResponse.json({ message: "user not found , kindly do login again" }, { status: 401 })
    }
    try {
        const {id}=await params ;

        // const uid=user.userId || 9999;
        const result = await pool.query("delete from posts where id =$1 ", [Number(id)]);

        return NextResponse.json("post got deleted");
    } catch {
        console.log(error);
        return NextResponse.json({
            error: "failed to delete the post"
        },
            { status: 500 });
    }
}