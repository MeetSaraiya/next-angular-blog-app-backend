import bcrypt from 'bcrypt';
import pool from '@/app/utils/db';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) {
            return NextResponse.json({
                error: "credential missing"
            }, {
                status: 400
            });
        }
        const password_hash = await bcrypt.hash(password, 10);
        // const {id,p_h}
        const user = await pool.query("select id,password_hash from users where username=$1 ", [username]);
        // const { id, p_h} = user
        if (user.rowCount == 0) {
            return NextResponse.json({
                error: "No user found "
            }, {
                status: 401
            });
        }

        const u = user.rows[0];
        const res_bcrypt = u.password_hash;
        const sts = await bcrypt.compare(password, res_bcrypt);
        if (sts) {
            const token = jwt.sign({userId : u.id , username},process.env.JWT_SECRET as string,{
                expiresIn:'1h'
            })
            return NextResponse.json({
                message: " user found "
            }, {
                status: 200
            });
        } else {
            return NextResponse.json({
                error: " user found with error "
            }, {
                status: 409
            });
        }




        // if (password_hash != "" || password_hash != null) {
        //     const user = await pool.query("insert into users(username,password) values ($1,$2)", [username, password_hash]);

        //     return NextResponse.json({
        //         message: "user inserted successfully"
        //     });

        // }
    } catch (error) {
        console.log("login error");
        return NextResponse.json({
            error: "login error" + error
        }, {
            status: 500
        })
    }
} 