import React from 'react'
import { FaHeart, FaRegHeart} from "react-icons/fa";
import './Likes.css'

import {auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {db} from '../../config/firebaseConfig'
import {collection, addDoc, deleteDoc, doc, query, where, getDocs} from 'firebase/firestore'

function Likes({articleId}) {

    //get user data
  const [user] = useAuthState(auth);
    
    // console.log(user);
    // console.log("articleID", articleId)

    //create state for likes
    const [isLiked, setIsLiked] = React.useState(false)
    //keep number of likes
    const [likeCount, setLikeCount] = React.useState(0)

    //need to know if this user has liked this article to initialize icon
    React.useEffect(
        ()=>{
            //did this user like this article?
            //need the collection
            const likesRef = collection(db, "likes")
            //should have an if statement, only need to do this
            //if there is a logged in user
            if (user){
            
            //make a query to see if liked
            const q = query(likesRef, where ("articleId", "==", articleId),
                                    where("userId", "==", user?.uid))
            //look for a matching document
            getDocs(q, likesRef)
            .then(res =>{
                //is there a match?
                if (res.size > 0){
                    setIsLiked(true)
                }
            })
            .catch(err => console.log(err))
        }
            //now find out like count
            //make a query to count likes
            const q2 = query(likesRef, where ("articleId", "==", articleId))
            //look for a matching document
            getDocs(q2, likesRef)
            .then(res =>{
                setLikeCount(res.size)
                
            })
            .catch(err => console.log(err))
        

        },[isLiked, user]
    )

    //need to add a like for this user to this article if you click, remove if click again
    //will need another collection that stores userid and articleid
  
    const handleLike = () =>{
        //make sure user is logged in
        if (user){
        //create reference to likes collection
        //will create collection if does not exist
        const likesRef = collection(db, "likes")
        //adding a document with this articleid and userid
        addDoc(likesRef, {
            userId:user?.uid,
            articleId:articleId
        })
        .then(res=>{
            //console.log(res)
            //don't need the res
            //want to show as liked
            setIsLiked(true);
        })
        .catch(err => console.log(err))
    }

    }
  
    const handleUnlike = () =>{
        //make sure user is logged in
        if (user){
        console.log("userid", user.uid);
        console.log("articleID", articleId)

        //need to find document with this articleId and userId
        //to get its document id
        const likesRef = collection(db, "likes")

        //set up query to find id of the record to delete
        const q = query(likesRef, where("articleId", "==", articleId),
                                  where("userId", "==", user?.uid))
        //get match
        //getDocs(q,likesRef)
        getDocs(q,likesRef)
        .then(res=>{
            console.log(res.size)
            console.log(res.docs[0].id)
            const likesId = res.docs[0].id
            //now delete this doc from likes collection
            deleteDoc(doc(db, "likes", likesId))
            .then(res=>{
                //change the icon
                setIsLiked(false)
            })
            .catch(err=>console.log(err))

        })
        .catch(err => console.log(err))
    }

        //set up reference to a single doc
        // const docRef=doc(db, 'likes', articleId)

        //then you can delete it



    }
  
    return (
    <div>
        {isLiked?
        <div className="like-icon">
            <FaHeart onClick={handleUnlike} />
            <span>{likeCount}</span>
        </div>
        :
        <div className="like-icon">
            <FaRegHeart onClick={handleLike} />
            <span>{likeCount}</span>
        </div>
        }
    </div>
  )
}

export default Likes