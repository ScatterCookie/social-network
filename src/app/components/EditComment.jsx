'use client'
import { editComment } from "../utils/editComment";

export default function EditButton({id}) {
    return(
            <button onClick={() => {
                        editComment(id);
                    }}>Edit Post!</button>
    )
}