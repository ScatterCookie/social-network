//all users
import { notFound } from "next/navigation";
import { db } from "@/app/utils/connect";
import Image from "next/image";
import { clerkClient } from "@clerk/nextjs/server";


export default async function Page({params}) {
    const {id} = await params

    const userInfo = await db.query(`SELECT * FROM users WHERE id = $1`, [id])

    const data = await db.query(`SELECT * FROM posts WHERE users_id = $1`, [userInfo.rows[0].id]);
    const posts = data.rows

    let user;
    
    try {
        const client = await clerkClient()
        user = await client.users.getUser(userInfo.rows[0].clerk_id);
    } catch (e) {
        console.log("Cannot fetch user from Clerk:", e)
        user = null;
    }

    if(userInfo.rowCount == 0){
        notFound();
    }

        return(
            <>
                <div>
                    <p className="mx-auto flex w-[360] items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">Welcome to {userInfo.rows[0].username}&apos;s page</p>
                    <Image className="m-5 rounded-full shadow-black shadow-md" src={user.imageUrl} height={200} width={200} alt="Your profile picture"/>
                    <br/>
                    <p className="w-[270] rounded-br-lg bg-white gap-2 p-4 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">{userInfo.rows[0].username}&apos;s Bio:</p>
                    <br/>
                    <p className="w-[240] rounded-br-lg bg-white gap-2 p-4 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">{userInfo.rows[0].bio}</p>
                </div>
                <div>
                {posts.map((post) => (
                    <div key={post.id} className="m-8 shadow-xl text-white w-fit p-5">
                        <Image className="profileImg" src={user.imageUrl} height={200} width={200} alt="Your profile picture"/>
                        <h2 className="w-[240] rounded-br-lg bg-white gap-2 p-4 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">{post.content}</h2>
                        <h6>{new Date(post.time_stamp).toLocaleString()}</h6>
                    </div>
            ))}
            </div>
        </>
         )
}
