//all users
import {auth, currentUser} from "@clerk/nextjs/server"
import { db } from "../utils/connect";
import UserForm from "../components/UserForm";
import NewPost from "../components/NewPost";
import Image from "next/image"
import '../globals.css'
import EditButton from "../components/EditComment";



export default async function Page() {

    const {userId, redirectToSignIn} = await auth()

    const user = await currentUser()

    // check if the user id is in our database
    const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId])

    const data = await db.query(`SELECT * FROM posts WHERE users_id = $1`, [userInfo.rows[0].id]);
    const posts = data.rows

    if(!userId) return redirectToSignIn()

    if(userInfo.rowCount ==0){
        return(
            <div>
                <UserForm />
            </div>
        )
    }

        return(
            <>
                <div>
                    <p className="mx-auto flex w-[360] items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">Hello {userInfo.rows[0].username}, This is your Profile Page</p>
                    <br/>
                    <Image className="m-5 rounded-full shadow-black shadow-md" src={user.imageUrl} height={200} width={200} alt="Your profile picture"/>
                    <p className="w-[270] rounded-br-lg bg-white gap-2 p-4 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">What you told us about yourself:</p>
                    <br/>
                    <p className="w-[240] rounded-br-lg bg-white gap-2 p-4 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">{userInfo.rows[0].bio}</p>
                    <NewPost id={userInfo.rows[0].id}/>
                </div>
                <div className="post-container">
                    {posts.map((post) => (
                        <div key={post.id} className=" m-8 shadow-xl text-white w-fit p-5">                           
                            <Image className="profileImg" src={user.imageUrl} height={200} width={200} alt="Your profile picture"/>
                            <h2 className="w-[240] rounded-br-lg bg-white gap-2 p-4 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">{post.content}</h2>
                            <h6>{new Date(post.time_stamp).toLocaleString()}</h6>
                            <EditButton id={post.id}/>
                        </div>
                    ))}
                </div>
            </>
        )
}


//get core auth, use select statement, insert userID into post