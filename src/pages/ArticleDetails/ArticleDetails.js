import React from 'react'
import {useParams} from 'react-router-dom'
import {db} from '../../config/firebaseConfig'
import {collection, getDoc, doc} from 'firebase/firestore'
import './ArticleDetails.css'

function ArticleDetails() {

    //get articleId from url
    const {articleId} = useParams();

    //create state for article info
    const [article, setArticle] = React.useState('')

    //need to get details for this article from db
    React.useEffect(
        ()=>{
            //set up reference to a single doc
            const docRef=doc(db, 'articles', articleId)

            getDoc(docRef)
            .then(res =>{
                console.log(res.data())
                setArticle(res.data())
            })
            .catch(err => console.log(err))
            

        }, []
    )

  return (
    <div className="details-container">
        <h1>{article?.title}</h1>
        <h2>{article?.summary}</h2>
        <div className="details-info-container">
            <p><span className="article-span">Author:</span>{article?.createdBy?.toUpperCase()}</p>
            <p><span className="article-span published">Published:</span> {article?.createdAt?.toDate().toDateString()}</p>
        </div>
        <div>
            <img className="details-img" src={article?.imgeUrl} />
            <p className="article-description">{article?.paragraphOne}</p>
          <p className="article-description">{article?.paragraphTwo}</p>
          <p className="article-description">{article?.paragraphThree}</p>
        </div>
    </div>
  )
}

export default ArticleDetails