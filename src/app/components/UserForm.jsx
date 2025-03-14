import {auth} from "@clerk/nextjs/server"
import { db } from "../utils/connect"

export default async function UserForm() {
    const {userId} = await auth()

    async function handleSubmit(formData){
        'use server'
        const {username, bio} = Object.fromEntries(formData)
        
        db.query(`INSERT INTO users (username, bio, clerk_id) VALUES ($1, $2, $3)`, [username, bio, userId])
    }
    return(
        <form action={handleSubmit}>
            <input name="username" placeholder="Enter your Username"/>
            <input name="bio" placeholder="Tell us about yourself" />
            <button type="submit">Submit</button>
        </form>
    )
} 