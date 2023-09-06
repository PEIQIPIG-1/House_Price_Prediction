import React, { Component } from 'react'
import p1 from '../image/p1.jpg'
import p_search from '../image/search.png'
import './Header.css'

export default class Header extends Component {


  render() {

    return (
      <header>
        <img src={p1} alt="" />
        <nav id="headerNav">
          <ul className='headerUl'>
            <li className='headerList'>First</li>

            <div className='headerDiv'>1</div>

            <li className='headerList'>Second</li>

            <div className='headerDiv'>2</div>

            <li className='headerList'>Third</li>

            <div className='headerDiv'>3</div>

            <li className='headerList'>Fourth</li>

            <div className='headerDiv'>4</div>
            
            <div className="search_box">
              <input type="text" className="search_txt" placeholder='Search by location' />
              <a href="#" id="search">
                <img src={p_search} alt=""/>
              </a>
            </div>
          </ul>

          
        </nav>
      </header>
    )
  }
}
