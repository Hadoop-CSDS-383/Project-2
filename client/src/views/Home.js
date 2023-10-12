import '../App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Navbar } from '../components/navbar.js'

export const Home = () => {

    useEffect(() => {
        document.title = "Hadoop Event Planner"
      }, [])

    return (
        <div>
            <Navbar></Navbar>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"5%"}}>
                <h1>Hello! Welcome To The Hadoop Event Planner!</h1>
                <h3>Click on the links above to get started!</h3>
            </div>
        </div>
    )
}