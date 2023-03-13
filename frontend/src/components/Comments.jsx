import React from "react";
import Answer from "./Answer";
import Comment from "./Comment";

export default function Comments({ comments }) {
    return (
        <>
            {comments.map(comment => (
                <>
                <Comment data={comment} key={comment._id}  />
                {comment.comments.map(answer => (
                    <Answer key={answer._id} data={answer} />
                ))}
                </>
            ))}
        </>
    )
}