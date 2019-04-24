import * as d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.scss'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './main.scss'


window.d3 = d3
window.React = React

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
