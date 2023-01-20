import React from 'react'
import './Comments.css'
import {db, auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {collection, addDoc, deleteDoc, doc, query, where, getDocs, onSnapshot} from 'firebase/firestore'

function Comments({articleId}) {

    

    //get user data
    const [user] = useAuthState(auth);

    const[newComment, setNewComment] = React.useState("")
    //create state for comments
    const [comments, setComments] = React.useState([])

    //show all comments when page loads
    React.useEffect(
        ()=>{

            //get reference to comments collection
            const commentsRef = collection(db, "comments")
            //get the comments
            // getDocs(commentsRef)
            // .then ( res =>{
            //     //convet to array
            //     const comments = res.docs.map( item =>(
            //     { id:item.id,
            //         ...item.data()
            //     }
            //      ))
            //.catch(err => console.log(err))

            //filter to show only comments for this article
            const q = query(commentsRef, where("articleId", "==", articleId))

            //originally onSnapshot(commentsRef, change to q to filter)
            onSnapshot(q, (snapshot)=>{
                //convet to array
                const comments = snapshot.docs.map( item =>(
                { id:item.id,
                    ...item.data()
                } )
                )
                //console.log(comments)
                setComments(comments)
             })

        }, []
    )
            


    const addNewComment = (e) =>{
        e.preventDefault();
        console.log(newComment);
        //need to make a new document in comments collection
        //including the newComment, the articleId and user who made it
        //create reference to comments collection
        //will create collection if does not exist
        const commentsRef = collection(db, "comments")
        //adding a document with this articleid and userid
        addDoc(commentsRef, {
            userId:user?.uid,
            articleId:articleId,
            content: newComment,
            username: user?.displayName
        })
        .then(res=>{
            //console.log(res)
            alert("comment added")
            //clear the input, remember to set value in textbox
            setNewComment("")
        })
        .catch(err => console.log(err))
    }

    const deleteComment = (id)=>{
        //needs the id of the comment to delete
        console.log(id)
        //get the particular document
        deleteDoc(doc(db, 'comments', id))
        .then(res=>{
            alert('comment deleted')
        })
        .catch(err => console.log(err))

    }

    //needs input to add comment
  return (
    <div>
        <div className="comments-container">
            {
                comments.map(item=>
                <div key={item.id} className="comment">
                    <p><span>{item.username}</span>
                    {item.content}</p>
                    {
                        //each comment has uid
                        //compare to see if I can delete
                        user?.uid === item.userId?
                        <button onClick={()=>deleteComment(item.id)}>Delete</button>
                        :
                        null
                    }
                    
                </div>)
            }
        </div>
        {
            user?
            <form onSubmit={addNewComment} >
                <input type="text" placeholder="add comment"
                       onChange={(e)=>setNewComment(e.target.value)}
                       value={newComment}
                />
                <button type="submit">Add Comment</button>
            </form>
            
            :
            <p>Please login to comment</p>
        }
        

    </div>
  )
}

export default Comments