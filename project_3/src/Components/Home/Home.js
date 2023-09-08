import React, { Component } from 'react'
import './Home.css'
import R from '../../image/H.jpg'
import videoSrc from './video.mp4';
import p_black from '../../image/black.png'

export default class Home extends Component {
    render() {
        return (
            <div id='Div'>
                <video autoPlay loop muted id='video'>
                        <source src={videoSrc} type="video/mp4" />
                </video>

                <img id='black' src={p_black} alt=""/>

                <section className='home'>
                    <div className='home_content'>
                        <h3>Hello, It's Me</h3>
                        <h1>Call me Xxxx</h1>
                        <h3>And I'm a <span className='multiple_text'></span></h3>
                        <p>
                            Request failed possibly due to use of the back/refresh buttons on your browser.
                            The Massey Uni App is currently unavailable for new Android phones due to technical.
                        </p>
                        <a href='#' className='btn'>Learn More</a>
                    </div>

                    
                        <a href='http://wjbaby.housescheck.com/' alt="" id='imgA'><img src={R} alt='' className='home_img'/></a>
                    
                </section>
            </div>

        )
    }
}

// var typed = new Typed(".multiple_text"),{
//     strings: [hhh,jjj]
//     typeSpeed: 100,
//     backSpeed: 100,
//     backDelay: 1000,
//     loop:true
// }
