import React, { Component } from 'react'
import p1 from '../image/p1.jpg'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav id = "header">
            <ul className='headerNav'>
                <li className='headerList'><a href='' target='_blank'>First</a>
                    <ul className='menu'>
                        <li><a href='' target='_blank'>1</a></li>
                        <li><a href='' target='_blank'>2</a></li>
                        <li><a href='' target='_blank'>3</a></li>
                        <li><a href='' target='_blank'>4</a></li>
                    </ul>
                </li>

                <li className='headerList'><a href='' target='_blank'>Second</a>
                    <ul className='menu'>
                        <li><a href='' target='_blank'>1</a></li>
                        <li><a href='' target='_blank'>2</a></li>
                        <li><a href='' target='_blank'>3</a></li>
                        <li><a href='' target='_blank'>4</a></li>
                    </ul>
                </li>

                <img id='center' src={p1} alt=''/>

                <li className='headerList'><a href='' target='_blank'>Third</a>
                    <ul className='menu'>
                        <li><a href='' target='_blank'>1</a></li>
                        <li><a href='' target='_blank'>2</a></li>
                        <li><a href='' target='_blank'>3</a></li>
                        <li><a href='' target='_blank'>4</a></li>
                    </ul>
                </li>

                <li className='headerList'><a href='' target='_blank'>Fourth</a>
                    <ul className='menu'>
                        <li><a href='' target='_blank'>1</a></li>
                        <li><a href='' target='_blank'>2</a></li>
                        <li><a href='' target='_blank'>3</a></li>
                        <li><a href='' target='_blank'>4</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
      </div>
    )
  }
}
