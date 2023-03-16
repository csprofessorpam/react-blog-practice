import React from 'react'
import './AddArticle.css'
import {storage, db, auth} from '../../config/firebaseConfig'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import {collection, addDoc} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {Timestamp} from 'firebase/firestore'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function AddArticle() {
    //activate navigate
    let navigate = useNavigate();
    //get user info
    const [user] = useAuthState(auth)

    const categories = ["Health", "Food", "Travel", "Technology"]


    //create state to store all the user data
    //in this case make an object for all the data
    const [formData, setFormData] = React.useState({
        title: "",
        summary: "",
        paragraphOne: "",
        paragraphTwo: "",
        paragraphThree: "",
        category: "",
        image: ""

    })

    //data is saved in onChange of each input


    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        //create a reference for the image
        const imageRef = ref(storage, `images/${formData.image.name + v4()}`  )
        //now upload the image to bucket
        uploadBytes(imageRef, formData.image)
        .then(res =>{
            console.log(res.ref)
            //now get url from this ref
            getDownloadURL(res.ref)
            .then ( url=>{
                //now we have all data and url 
                //create article reference
                const articleRef=collection(db, 'articles')
                //use adddoc to add
                addDoc(articleRef, {
                    title: formData.title,
                    summary: formData.summary,
                    paragraphOne: formData.paragraphOne,
                    paragraphTwo: formData.paragraphTwo,
                    paragraphThree: formData.paragraphThree,
                    category: formData.category,
                    imgeUrl: url,
                    createdBy: user.displayName,
                    userId: user.uid,
                    createdAt: Timestamp.now().toDate()
                })

            })
            .then(res =>{
                //alert('article saved!')
                toast('Article saved successfully', {type: "success", autoClose: 1500})
                //pause before navigating to home
                setTimeout(()=>{
                    navigate('/')
                }, 2000)
            })

        })
        .catch(err =>{
            //console.log(err)
            toast('Could not save', {type: "error"})
        })
    }


  return (
    <div className="add-article-container">
       <form className="add-article-form"  onSubmit={handleSubmit}>
            <h2>Create Article</h2>
            <div className="input-group">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" 
                placeholder="Maximum 100 characters"
                maxLength="100"
                onChange={(e)=>setFormData(
                    {...formData, title: e.target.value}
                )}
                />
            </div> 
            <div className="input-group">        
                <label htmlFor="summary">Summary</label>
                <textarea name="summary"
                placeholder="Maximum 120 characters"
                maxLength="120"
                onChange={(e)=>setFormData(
                    {...formData, summary: e.target.value}
                )}
                />
            </div> 
            <div className="input-group">
                <label htmlFor="paragraphOne">Paragraph One</label>
                <textarea name="paragraphOne" 
                placeholder="Maximum 650 characters"
                maxLength="650"
                onChange={(e)=>setFormData(
                    {...formData, paragraphOne: e.target.value}
                )}
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphTwo">Paragraph Two</label>
                <textarea name="paragraphTwo"
                placeholder="Maximum 650 characters"
                maxLength="650"
                onChange={(e)=>setFormData(
                    {...formData, paragraphTwo: e.target.value}
                )}
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphThree">Paragraph Three</label>
                <textarea name="paragraphThree" 
                placeholder="Maximum 650 characters"
                maxLength="650"
                onChange={(e)=>setFormData(
                    {...formData, paragraphThree: e.target.value}
                )}
                />
            </div>
            <div className="input-group">
                <label htmlFor="category">Category</label>
                <select name="category"
                onChange={(e)=>setFormData(
                    {...formData, category: e.target.value}
                )}>
                    <option value="">Select</option>
                    {
                        categories.map((item,index)=>{
                            return <option key={index} value={item}>{item}</option>
                        })
                    }
                </select>
            </div>
            <div className="input-group">
                <label>Upload Image</label>
                <input type="file" name="image" accept="image/*"
                onChange={(e)=>setFormData(
                    {...formData, image: e.target.files[0]}
                )}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddArticle