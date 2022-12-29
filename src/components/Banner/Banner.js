import React from 'react'
import './Banner.css'
import {db} from '../../config/firebaseConfig'
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore'

function Banner() {

  //create state for articles
  const [mainArticle, setMainArticle] = React.useState('')

  const [otherArticles, setOtherArticles] = React.useState([])

  //get data when the banner loads
  React.useEffect(
    ()=>{
      //create variable to reference articles
      const articleRef = collection(db, 'articles')
      //get articles from the db

      //make sure go to rules in firestore and change allow read, write
      //if TRUE (default is false)

      //set up query to filter responses
      const q = query(articleRef, orderBy("createdAt", "desc"), limit(5))

      //instead of axios have to make calls to firebase
      //get all the documents in db
      //getDocs(articleRef)

      //use the query to filter the documents returned
      getDocs(q, articleRef)
      .then ( res =>{
        //console.log(res.docs[0]._document.data.value.mapValue.fields.title.stringValue)

        //console.log(res.docs)

        //res.docs.map(item => {console.log(item)})

        const articles = res.docs.map( item =>(
          { id:item.id,
            ...item.data()
          }
        ))
        
        console.log(articles); 
        setMainArticle(articles[0])
        //put all the others starting with position 1
        setOtherArticles(articles.splice(1))
      })
      .catch(err => console.log(err))

    }, []
  )
  return (
    <div className="banner-container">
      <div className="main-article-container" 
           style={{backgroundImage:`url(${mainArticle?.imgeUrl})`}}>
            <div className="banner-info">
              <h2>{mainArticle?.title}...</h2>
              <div className="main-article-info">
                <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
              </div>
            </div>

      </div>
      <div className='other-articles-container'>
        {
          otherArticles.map(item =>(
            <div key={item.id} className="other-article-item"
                 style={{backgroundImage:`url(${item?.imgeUrl})`}}>
                <div className="banner-info">
                  <h3>{item?.title.slice(0,15)}...</h3>
                  <small>{item?.createdAt?.toDate().toDateString()}</small>
                </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Banner