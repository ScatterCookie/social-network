'use server'
import { db } from "./connect";
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";

export async function handleDelete(id) {

        await db.query(`DELETE FROM movies_full WHERE id = $1`, [id])
        revalidatePath(`/movies/${id}`);
    
        redirect("/movies");
    }

export async function editMovie(id) {

    await db.query(`SELECT * FROM movies_full`)

    revalidatePath(`/movies/edit`)
    redirect(`/movies/edit/${id}`)
    
}