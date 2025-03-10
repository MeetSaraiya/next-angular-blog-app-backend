// export interface Post{
//     title:string,
//     content:string,
//     id?:any
//   }

import pool from '@/app/utils/db';
import { NextRequest, NextResponse } from 'next/server';
import { error } from 'console';
import { verifyuser } from '@/app/utils/verify';

export async function GET() {
    try {
        const result = await pool.query(" select id, title , content, user_id from posts ");
        return NextResponse.json(result.rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "failed to fetch posts"
        },
            { status: 500 });
    }
}

export async function POST(req:NextRequest){
    const user = await verifyuser(req);
    if(!user){
        return NextResponse.json({message:"unauthorized user"},{status:401})
    }
    try{
        const {title,content} = await req.json();
        if(!title || !content){
            return NextResponse.json({error:"title or content is missing"},{status:400});
        }
        // const uid=user.userId || 9999;
        const result = await pool.query("insert into posts(title,content,user_id) values($1,$2,$3) returning id, title, content, user_id",[title,content,user.userId]);

        const nextpost = result.rows[0];

        return NextResponse.json(nextpost,{status:201});
    }catch{
        console.log(error);
        return NextResponse.json({
            error: "failed to create post"
        },
            { status: 500 });
    }
}



// export async function GET(req: NextRequest) {
//     try { 

//         const posts = await pool.query("select * from posts ");

//         if (posts && posts.rowCount! > 0) {
//             return NextResponse.json({
//                 message:posts
//             }, {
//                 status: 409
//             });
//         }


//     } catch (error) {
//         console.log("registration error");
//         return NextResponse.json({
//             error: "registration error"
//         }, {
//             status: 500
//         })
//     }
// } 

// export async function POST(req: NextRequest) {
//     try {
//         const { title, content } = await req.json();
//         if (!title || !content) {
//             return NextResponse.json({
//                 error: "data missing"
//             });
//         }

//         await pool.query("insert into posts(title,content) values ($1,$2)", [title, content]);
//         return NextResponse.json({
//             message: "post got created"
//         }, {
//             status: 200
//         });

//     } catch (error) {
//         console.log("post addition  error");
//         return NextResponse.json({
//             error: "post error"
//         }, {
//             status: 500
//         })
//     }
// } 