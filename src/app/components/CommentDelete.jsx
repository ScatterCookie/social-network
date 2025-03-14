'use client'
import { deleteComment } from "../utils/deleteComment"


export default function DeleteCommentButton({id}) {


    return (
        <button onClick={() => {
            deleteComment(id)
        }}>Delete Post</button>
    )
}