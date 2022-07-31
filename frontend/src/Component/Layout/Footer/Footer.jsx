import React from 'react'
import playStore from "../../../images/playstore.png"
import AppStore from "../../../images/Appstore.png"
import "./Footer.css"
const Footer = () => {
  return (
     <footer id = "footer">
        <div className ="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and iOS Mobile Phone</p>
            <img src= {playStore} alt="playStore"/>
            <img src= {AppStore} alt="AppStore"/>
        </div>

        <div className = "midFooter">
            <h1>E-commerce</h1>
            <p>High Quality is Our First Priority</p>

            <p>Copyright 2022 &copy; VirendraUikey</p>
        </div>
          
        <div className = "rightFooter">
            <h4>Follow Me</h4>
            <a href ="https">Instagram</a>
            <a href ="https://">Facebook</a>
            <a href ="http://">Twitter</a>
        </div>
     </footer>
  )
}

export default Footer