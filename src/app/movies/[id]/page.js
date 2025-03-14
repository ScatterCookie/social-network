import { db } from "@/app/utils/connect"
import Image from "next/image"
import DeleteButton from "@/app/components/DeleteButton"
import EditMovie from "@/app/components/EditMovie"
import { notFound } from "next/navigation"


export default async function Page({params}) {
    const {id} = await params
    let movie;
    let result;
    let res;
    let moviePost

    
    try{
        const {id} = await params
        
        res = await db.query(`SELECT * FROM movies_full WHERE id = $1`, [id])
        movie = res.rows[0]
        
    
        result = await db.query(`SELECT * FROM movie_comments WHERE movies_full_post_f_key = $1`, [movie.id])
        moviePost = result.rows[0]
    }
    catch(Exception){
        console.log(Exception)
            notFound()
    }

    return( 
        <div className="mx-auto items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <h2>{movie.title}</h2>
            <p>{movie.age_rating}</p>
            <p>{new Date(movie.release_date).toISOString().split("T")[0]}</p>
            <p>{movie.film_rating}</p>
            <p>{movie.description}</p>
            <p>{movie.main_lead}</p>
            <Image height={500} width={350} alt={movie.title} src={movie.img_url} />
            <ul>
            {result.rows.map((movie) => (
                <li key={movie.id}>{movie.post_content}</li>
            ))}
            </ul>
            <EditMovie id={movie.id}/>
            <DeleteButton id={movie.id}/>
        </div>
    )
}