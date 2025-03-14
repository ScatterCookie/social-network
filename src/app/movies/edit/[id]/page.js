import { db } from "@/app/utils/connect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editMovie({params}) {
    const {id} = await params
    async function apply(movieData){
            "use server";

            console.log("Saving New Movie...");
    
            const title = movieData.get("title");
            const ageRating = movieData.get("age_rating");
            const releaseDate = movieData.get("release_date");
            const filmRating = movieData.get("film_rating");
            const description = movieData.get("description");
            const mainLead = movieData.get("main_lead");
            const posterURL = movieData.get("img_url")
    
            await db.query(`UPDATE movies_full SET title = $1 WHERE id = $2`, [title, id])
            await db.query(`UPDATE movies_full SET age_rating = $1 WHERE id = $2`, [ageRating, id])
            await db.query(`UPDATE movies_full SET release_date = $1 WHERE id = $2`, [releaseDate, id])
            await db.query(`UPDATE movies_full SET film_rating = $1 WHERE id = $2`, [filmRating, id])
            await db.query(`UPDATE movies_full SET description = $1 WHERE id = $2`, [description, id])
            await db.query(`UPDATE movies_full SET main_lead = $1 WHERE id = $2`, [mainLead, id])
            await db.query(`UPDATE movies_full SET img_url = $1 WHERE id = $2`, [posterURL, id])

            console.log(db.query);
    
            revalidatePath(`/movies/${id}`);
    
            redirect(`/movies/${id}`);
        }

    const res = await db.query(`SELECT * FROM movies_full WHERE id = $1`, [id])
    const movie = res.rows[0]

    return (
        <div className="mx-auto flex w-[360] items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <form style={{display: 'flex', flexDirection: 'column', width: '200px', alignSelf: 'center'}} action={apply}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" defaultValue={movie.title} required />

            <label htmlFor="age_rating">Age Rating</label>
            <input id="age_rating" name="age_rating" type="text" defaultValue={movie.age_rating} required />

            <label htmlFor="release_date">Release Date</label>
            <input id="release_date" name="release_date" type="date" defaultValue={new Date(movie.release_date).toLocaleDateString("fr-CA", "full")} required  />

            <label htmlFor="film_rating">Film Rating</label>
            <input id="film_rating" name="film_rating" type="text" defaultValue={movie.film_rating} required />

            <label htmlFor="description">Description</label>
            <input id="description" name="description" type="text" defaultValue={movie.description} required />

            <label htmlFor="main_lead">Main Lead</label>
            <input id="main_lead" name="main_lead" type="text" defaultValue={movie.main_lead} required />

            <label htmlFor="img_url">Poster URL</label>
            <input id="img_url" name="img_url" defaultValue={movie.img_url} required />
            <br/>

            <button type="submit">Save</button>
            <br/>
        </form>
        </div>
    )
}