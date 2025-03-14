import { revalidatePath } from "next/cache";
import { db } from "../utils/connect";

export default function NewPost({id}) {
    
    async function handleSubmit(formData) {
        'use server'

        const data = Object.fromEntries(formData)
        const {content} = data

        await db.query(`INSERT INTO posts (content, users_id) VALUES ($1 , $2)`, [content, id])
        revalidatePath("/profile")

    }
    
    return (
        <form action={handleSubmit}>
            <label htmlFor="content">Create New Post</label>
            <br/>
            <input id="content" name="content" placeholder="What's on your mind?" ></input>
            <button type="submit">Post!</button>
        </form>
    )
}