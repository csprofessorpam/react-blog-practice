import React from 'react'
import {useParams} from 'react-router-dom'
import './CategoryArticle.css'
import {db} from '../../config/firebaseConfig'
import {collection, getDocs, query, where} from 'firebase/firestore'
import ArticleCard from '../../components/ArticleCard/ArticleCard'

function CategoryArticle() {

  //get category from url
  const {categoryName} = useParams();
  console.log(categoryName);
  //create state to store information
  const [articles, setArticles] = React.useState([])
  //const [catName, setCatName] = React.useState(categoryName)

  //get data when component loads
  React.useEffect(
    ()=>{
      console.log("reload")
      //create reference to firebase db collection
      const articleRef = collection(db, "articles")
      //now get the data
      //create query
      const q = query(articleRef, where("category", "==", categoryName));
      //now get data that matches the query
      getDocs(q, articleRef)
      .then(res =>{
        //add the id
        const articles = res.docs.map( item =>(
          { id:item.id,
            ...item.data()
          }
        ))
        console.log(articles)
        setArticles(articles)
      })
      .catch(err=>console.log(err))


    }, [categoryName]  //trigger when url changes
  )

  return (
    <div className="category-articles">
      {
        articles.length === 0?
        <p>No articles</p>
        :
        
          articles?.map(item=> <ArticleCard article={item} />)
        

      }
      {/* CategoryArticle {categoryName} */}
      
      {/* {
        articles?.map(item=> <p>{item.title}</p>)
      } */}
    </div>
  )
}

export default CategoryArticle