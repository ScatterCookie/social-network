import { revalidatePath } from "next/cache";
import { db } from "@/app/utils/connect";
import { redirect } from "next/navigation";

export default async function NewPost({params}) {
    const {id} = await params;
    async function handleEdit(formData) {
        'use server'

        const data = Object.fromEntries(formData)
        const {content} = data

        await db.query(`UPDATE posts SET content = $1 WHERE id = $2`, [content, id])

        revalidatePath("/profile")

        redirect("/profile")

        
    }

    const res = await db.query(`SELECT * FROM posts WHERE id = $1`, [id])
    const post = res.rows[0]
    
    return (
        <form action={handleEdit}>
            <label htmlFor="content">Edit Existing Post</label>
            <br/>
            <input id="content" name="content" placeholder="What's on your mind?" defaultValue={post.content}></input>
            <button type="submit">Confirm Changes!</button>
        </form>
    )
}