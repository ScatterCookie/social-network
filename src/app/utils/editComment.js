'use server'
import { db } from "./connect";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function editComment(id) {

    await db.query(`SELECT * FROM posts`)

    revalidatePath(`/profile/edit`)
    redirect(`/profile/edit/${id}`)
    
}