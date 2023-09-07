import './App.css';
import React, { Component } from 'react'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'

export default class App extends Component {

  render() {
    return (
    <div>
      <Header/>
      <Home/>
    </div>
    )
  }
}
