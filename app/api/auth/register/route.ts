import bcrypt from 'bcrypt';
import pool from '@/app/utils/db';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) {
            return NextResponse.json({
                error: "credential missing"
            });
        }

        const checkUser = await pool.query("select * from users where username=$1", [username]);

        if (checkUser && checkUser.rowCount! > 0) {
            return NextResponse.json({
                error: "user already exists"
            }, {
                status: 409
            });
        }

        const password_hash = await bcrypt.hash(password, 10);

        if (password_hash != "" || password_hash != null) {
            await pool.query("insert into users(username,password_hash) values ($1,$2)", [username, password_hash]);

            return NextResponse.json({
                message: "user inserted successfully"
            }, {
                status:200
            });

        }
    } catch (error) {
        console.log("registration error",error);
        return NextResponse.json({
            error: "registration error"
        }, {
            status: 500
        })
    }
} 