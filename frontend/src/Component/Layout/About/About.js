import React, {useEffect} from "react";
import "./aboutSection.css";
import { useSelector, useDispatch} from "react-redux";
import { Button, Typography, Avatar } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useNavigate } from 'react-router-dom';

const About = () => {

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const visitInstagram = () => {
    window.location = "https://www.instagram.com/uhsuraa/?hl=en";
  };

  useEffect(() => {
    if (isAuthenticated === false) {
        navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={user.avatar.url}
              alt="Founder"
            />
            <Typography>Virendra uikey</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @virendrauikey. Only with the
              purpose to teach MERN Stack Ecommerce 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.facebook.com/virendra.uikey/"
              target="blank"
            >
              <FacebookIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/uhsuraa/?hl=en" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;