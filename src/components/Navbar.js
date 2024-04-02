import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function Navbar() { 
    const location = useLocation();
    useEffect(()=>{
      console.log(location.pathname);
    },[location]);
    return (
      <>
        <nav  className="navbar navbar-expand-lg navbar-dark bg-info" >
          <div  className="container-fluid">
            <a  className="navbar-brand fw-bolder text-black btn btn-outline-danger" href="/">iNOTEBOOK</a>
            <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span  className="navbar-toggler-icon"></span>
            </button>
            <div  className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul  className="navbar-nav me-auto mb-2 mb-lg-0">
                <li  className="nav-item">
                  <Link  className={`nav-link ${location.pathname==="/"?"active": ""} fw-bolder text-black`} aria-current="page" to="/">Home</Link>
                </li>
                <li   className="nav-item">
                  <Link  className={`nav-link ${location.pathname==="/about"?"active": ""} fw-bolder text-black`} to="/about">About</Link>
                </li>
                <li  className="nav-item dropdown">
                  <a  className={`nav-link ${location.pathname==="/category"?"active": ""} fw-bolder text-black`} href="/category" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Category
                  </a>
                <ul  className="dropdown-menu">
                    <li><Link  className="dropdown-item" to="/general" >General</Link></li>
                    <li><Link  className="dropdown-item" to="/sports" >Sports</Link></li>
                    <li><Link  className="dropdown-item" to="/business" >Business</Link></li>
                    <li><Link  className="dropdown-item" to="/health" >Health</Link></li>         
                    <li><Link  className="dropdown-item" to="/technology" >Technology</Link></li>
                    <li><Link  className="dropdown-item" to="/entertainment" >Entertainment</Link></li>

                    {/* <li><hr  className="dropdown-divider"/></li>
                    <li><a  className="dropdown-item" href="/">Something else here</a></li> */}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    )
  }


