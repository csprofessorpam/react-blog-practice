import React from 'react'
import './Header.css'
import { FaHome } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
//a tag refreshes page, resets context, Link is better

function Header() {

    const categories = ["Health", "Food", "Travel", "Technology"]

    let navigate = useNavigate();
  return (
    <div className="header-container">
        <FaHome onClick={()=>navigate("/")} />
        <div className="categories-container">
            {
                categories.map(item => <Link to={`/category/${item}` }
                className="nav-link" >{item}</Link>)
            }
        </div>
        <Link className="auth-link" to="/auth">Signup</Link>
    </div>
  )
}

export default Header