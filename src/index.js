import * as d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './store'
import './main.scss'
window.d3 = d3
window.React = React

// const chart = excangeRate({
//     height: window.innerHeight,
//     width: window.innerWidth,
//     title: 'Курс валют'
// })

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
