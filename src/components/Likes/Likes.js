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
    
    console.log(user);

    //create state for likes
    const [isLiked, setIsLiked] = React.useState(false)

    //need to know if this user has liked this article to initialize

    //need to add a like for this user to this article if you click, remove if click again
    //will need another collection that stores userid and articleid
  
    const handleLike = () =>{
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
  
    const handleUnlike = () =>{

        //need to find document with this articleId and userId
        //to get its document id
        const likesRef = collection(db, "likes")

        //set up query to find id
        const q = query(likesRef, where("articleId", "==", articleId), where("userID", "==", user.uid))
        //get match
        getDocs(q, likesRef)
        .then(res=>{
            console.log(res?.docs[0]?.id)
        })

        //set up reference to a single doc
        // const docRef=doc(db, 'likes', articleId)

        //then you can delete it



    }
  
    return (
    <div>
        {isLiked?
        <div className="like-icon">
            <FaHeart onClick={handleUnlike} />
        </div>
        :
        <div className="like-icon">
            <FaRegHeart onClick={handleLike} />
        </div>
        }
    </div>
  )
}

export default Likes