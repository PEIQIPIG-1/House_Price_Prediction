import React, { Component } from 'react'
import p1 from '../../image/p1.png'
import p_search from '../../image/search.png'
import './Header.css'
// import {BrowserRouter as  Link } from 'react-router-dom';


export default class Header extends Component {
jshhjshjhj

  render() {

    return (
      <div>
        <header>
        <img src={p1} alt="" />
        <nav id="headerNav">
          <ul className='headerUl'>
            <li className='headerList'><a href='http://wjbaby.housescheck.com/' alt=""> Map </a></li>

            <div className='headerDiv'><p className="divP">1</p></div>

            <li className='headerList'>Second</li>

            <div className='headerDiv'><p className="divP">2</p></div>

            <li className='headerList'>Third</li>

            <div className='headerDiv'><p className="divP">3</p></div>

            <li className='headerList'>Fourth</li>

            <div className='headerDiv'><p className="divP">4</p></div>
            
            <div className="search_box">
              <input type="text" className="search_txt" placeholder='Search by location' />
              <a href="" id="search">
                <img src={p_search} alt=""/>
              </a>
            </div>
          </ul>
        </nav>
      </header>
      </div>
      
 
    )
  }
}
