import React from "react";
import { Fragment } from "react";
import MainImage from "../assets/illustrations/business-growth-illustration.png";
import "../css/RemoveMargin.css";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon } from "@mui/material";
import image1 from "../assets/illustrations/business/food-delivery-illustration.jpg";
import image2 from "../assets/illustrations/business/marketing-illustration.jpg";
import image3 from "../assets/illustrations/business/outlet-expansion-illustration.jpg";
import image4 from "../assets/illustrations/sign-up-now-illustration.jpg"


const textStyle = {
    textAlign: 'center',
    color: 'WHITE',
    fontSize: '14px',
    fontWeight: 'bold'

};

const paragraph = {
    fontFamily:"Cocogoose", 
        fontSize: "15px",
        fontWeight: 'light',
        color: '#1E56A0',

};

                    
const Home = () => {
    return <Fragment>
        <div className="or"
            style={{
                width: "100vw",
                height: "65vh",
               //position: "relative",
                flexDirection: "row",
                display: "flex",    
                backgroundColor: '#D6E4F0',
              }}
            > 
            
            <div style={
                { marginLeft: "4%",
                marginTop: "5%",
                //position: 'absolute',
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                gap: "1rem",
                }} >

                    <div style={{ color: "#163172", fontSize: "2rem" }}> 
                    F-XCEL  
                    </div>

                    <p style={{...paragraph, marginBottom: '1rem'}}> 
                        All-in-one platform to guarantee your F&B 
                        <br/>
                        business growth 
                    </p>

                <p style={{...paragraph, marginBottom: '2rem'}}> 
                Start Planning and grow with us today!
                </p>
                
                <div
                    style={{
                        width: '230px',
                        height: '40px',
                        backgroundColor: '#163172',
                        borderRadius: '3px',
                        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.3)',
                        border: '1px solid black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    
                > 
                <div style={textStyle}>
                    CREATE AN ACCOUNT NOW
                </div>
            
                </div> 
                <div style={
                    {fontFamily:"Cocogoose", 
                    fontSize: "12px",
                    fontWeight: 'light',
                    color: '#1E56A0',
                    paddingTop: '9rem'}
                }> Already have an account? Sign in <u style={{color: '#43ACD9'}}> here </u> </div>

                

            </div>
            
            <div style={{
                
                width: "150%", 
                height: "100%", 
                display:"flex", 
                flexDirection: "column", 
                //alignItems: "center", 
                marginRight: "10%", 
                }}> 

                <img style={{width: "100%", height: "90%"}}
                        src={MainImage}
                        alt="Main Image"        
                />
                <div style={{display:"flex", 
                alignItems: "left",
                flexDirection: "column",
                marginLeft: '10%',
                }}>
                    <span style={{
                        fontFamily: "Cocogoose", 
                        fontSize: "10px",
                        fontWeight: 'light',
                        color: '#1E56A0',
                        
                        }}> Scroll down to discover more </span> 

                    <span> <ExpandMoreIcon style={{opacity: '0.54', marginLeft: '10%'}} /> </span>   

                </div>
                 
            
            </div>
                       
        </div>

        <div style={{
                width: "100vw",
                height: "56vh",
                flexDirection: "row",
                display: "flex",    
                margin: '1.5rem'
              }}
            >
            <div style={
                { 
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                }} >
                    <img style={{height: "50%", aspectRatio: "1",}}
                        src={image1}
                        alt="Image1"        
                />
    
                <div style={{ color: "#1E56A0", fontSize: "20px", fontFamily:"Cocogoose", marginTop: '2rem' }} >Food Delivery Marketplace Strategy</div>
                <div style={{ color: "#1E56A0", textAlign: "center", fontSize: '15px'} }>
                Draft out the perfect plan to expand your F&B <br/> business to the food delivery marketplace.</div>
                <div style={{ color: "#1E56A0", textAlign: "center", fontSize: '15px'} }>
                Explore various marketplaces such as GrabFood, <br/> FoodPanda and Deliveroo and define a concrete plan <br/> to venture your F&B business to food delivery <br/> marketplaces
                </div>
            </div>

            <div style={
                { 
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                }} >
                    <img style={{height: "50%", aspectRatio: "1",}}
                        src={image3}
                        alt="Image3"        
                />
    
                <div style={{ color: "#1E56A0", fontSize: "20px", fontFamily:"Cocogoose", marginTop: '2rem' }} >Outlet Expansion Strategy</div>
                <div style={{ color: "#1E56A0", textAlign: "center", fontSize: '15px'} }>
                Want to expand your business to other areas <br/> of Singapore? Time to plan and expansion for your <br/> business with out outlet expansion strategy plan.
                </div>
                <div style={{ color: "#1E56A0", textAlign: "center", fontSize: '15px'} }>
                Select a location to expand and while planning <br/> various factors such as rental prices and staff <br/> management for the new outlet
                </div>
            </div>
            <div style={
                { 
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                }} >
                    <img style={{height: "50%", aspectRatio: "1",}}
                        src={image2}
                        alt="Image2"        
                />
    
                <div style={{ color: "#1E56A0", fontSize: "20px", fontFamily:"Cocogoose", marginTop: '2rem' }} >Marketing Strategy</div>
                <div style={{ color: "#1E56A0", textAlign: "center", fontSize: '15px'} }>
                Always wonder how did some F&B businesses seem <br/> to excel and have infinite customers? Perhaps it is <br/> time to reconsider your marketing strategy!</div>
                <div style={{ color: "#1E56A0", textAlign: "center", fontSize: '15px'} }>
                Create specific marketing promotions through various <br/> methods such as social media, posters and flyers <br/> distribution with our marketing strategy plan

                </div>
            </div>

        </div>

        <div style={{
                width: "100vw",
                height: "43vh",
                flexDirection: "row",
                display: "flex",    
                marginTop: '1.5rem',
                marginLeft: '1.5rem',
                marginRight: '1.5rem',
                borderTop: '1px solid rgba(0, 0, 0, 0.3)',
              }}
            >
            
            <img style={{marginTop: "5px", marginLeft: "18%", height: "100%", aspectRatio: '1'}}
                        src={image4}
                        alt="Image4"        
                />
            <div style={
                { 
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                gap: "1rem",
                marginLeft: '10%'
                }} >
              
                <div style={{ color: "#163172", fontSize: "40px", fontFamily:"Cocogoose", marginTop: '7rem' }} >Ready To Plan?</div>
                
                <div
                    style={{
                        width: '140px',
                        height: '40px',
                        backgroundColor: '#163172',
                        borderRadius: '3px',
                        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
                        border: '1px solid black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    
                > 
                <div style={textStyle}>
                    SIGN UP NOW!
                </div>
                </div>
                <div style={
                    {
                    fontSize: "15px",
                    color: '#1E56A0',
                    marginTop: '7%'}
                }> Already have an account? Sign in <u style={{color: '#43ACD9'}}> here </u> </div>
            </div>
            

        </div>
        
    </Fragment>;
};

export default Home;
