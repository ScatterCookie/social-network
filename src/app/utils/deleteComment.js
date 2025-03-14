'use server'
import { db } from "./connect";
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";

export async function deleteComment(id) {

        await db.query(`DELETE FROM posts WHERE id = $1`, [id])
        revalidatePath(`/comments`);
    
        redirect("/comments");
    }