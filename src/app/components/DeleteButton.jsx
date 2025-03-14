'use client'
import { handleDelete } from "../utils/deleteMovie"


export default function DeleteButton({id}) {


    return (
        <button onClick={() => {
            handleDelete(id)
        }}>X</button>
    )
}