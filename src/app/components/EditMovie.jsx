'use client'
import { editMovie } from "../utils/deleteMovie";

export default function EditButton({id}) {
    return(
            <button onClick={() => {
                        editMovie(id);
                    }}>Edit Movie</button>
    )
}