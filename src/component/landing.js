import React from 'react';
import zulip from './images/zulip.png';
import chat from './images/chat.png';
import playButton from './images/play-button.png';
import apple from './images/apple-icon.png';
import mobileScreen from './images/mobile-screen.png';
import playStore from './images/play-store-icon.png';
import logo2 from './images/logo2.png';
import videoImage from './images/video-image.jpg';
import { Navbar, Nav, FormControl, Form, Button } from 'react-bootstrap';


function Landing() {
  return (
    <div >
      <div className="preloader">
        <span><i className="lnr lnr-sun"></i></span>
    </div>
    {/* <nav className="mainmenu-area" data-spy="affix" data-offset-top="200">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#primary_menu">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#"><img src={zulip} alt="Logo" /></a>
            </div>
            <div className="collapse navbar-collapse" id="primary_menu">
                <ul className="nav navbar-nav mainmenu">
                    <li className="active"><a href="#home_page">Home</a></li>
                    <li><a href="#about_page">About</a></li>
                    <li><a href="#features_page">Features</a></li>
                    <li><a href="#gallery_page">Gallery</a></li>
                    <li><a href="#price_page">Pricing</a></li>                                   
                    <li><a href="#contact_page">Contacts</a></li>
                   
                </ul>             
              
                <div className="right-button hidden-xs">      
                   <a  href="/login">Login</a>        
                    <a className="signup" href="/signup">Sign up</a>
                </div>
            </div>
        </div>
    </nav> */}
    
    <Navbar className="mainmenu-area" data-spy="affix" data-offset-top="200">
    <Navbar.Brand href="#home"><a className="navbar-brand" href="#"><img src={zulip} alt="Logo" /></a></Navbar.Brand>
    <Nav className="mr-auto mainmenu">
      <li><Nav.Link className="active" href="#home">Home</Nav.Link></li>
      <li><Nav.Link href="#about_page">About</Nav.Link></li>
      <li><Nav.Link href="#progress_page">Features</Nav.Link></li>
      <Nav.Link href="#gallery_page">Gallery</Nav.Link>
      <Nav.Link href="#pricing_page">Pricing</Nav.Link>
      <Nav.Link href="#contact_page">Contacts</Nav.Link>
    </Nav>
     
                   <a style={{}}  className="" href="/login">Login</a>        
                    <a className="signup "  style={{padding: '10px', borderRadius: "15px"}} href="/signup">Sign up</a>
            
  </Navbar>  

    <header className="home-area overlay" id="home_page">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 hidden-sm col-md-5">
                    <figure className="mobile-image wow fadeInUp" data-wow-delay="0.2s">
                        <img src={logo2} alt="" />
                    </figure>
                </div>
                <div className="col-xs-12 col-md-7">
                    <div className="space-80 hidden-xs"></div>
                    <h1 className="wow fadeInUp" data-wow-delay="0.4s">Chat for distributed teams.</h1>
                    <div className="space-20"></div>
                    <div className="desc wow fadeInUp" data-wow-delay="0.6s">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do eiusmod tempor incididunt ut labore et laborused sed do eiusmod tempor incididunt ut labore et laborused.</p>
                    </div>
                    <div className="space-20"></div>
                    <a href="#" className="bttn-white wow fadeInUp" data-wow-delay="0.8s"><i className="lnr lnr-download"></i>Download App</a>
                </div>
            </div>
        </div>
    </header>
   
    <section className="section" id="about_page">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-md-10 col-md-offset-1">
                    <div className="page-title text-center">
                        <img src={zulip} alt="About Logo" />
                        <div className="space-20"></div>
                        <h5 className="title">About myZulip</h5>
                        
                        <h3 className="blue-color">A beautiful app for consectetur adipisicing elit, sed do eiusmod tempor incididunt ut mollit anim id est laborum. Sedut perspiciatis unde omnis. </h3>
                        <div className="space-20"></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do eiusmod tempor incididunt ut labore et laborused sed do eiusmod tempor incididunt ut labore et laborused.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  
    <section className="progress-area gray-bg" id="progress_page">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <div className="page-title section-padding">
                        <h5 className="title wow fadeInUp" data-wow-delay="0.2s">Our Progress</h5>
                        <div className="space-10"></div>
                        <h3 className="dark-color wow fadeInUp" data-wow-delay="0.4s">Grat Application Ever</h3>
                        <div className="space-20"></div>
                        <div className="desc wow fadeInUp" data-wow-delay="0.6s">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do eiusmod tempor incididunt ut labore et laborused sed do eiusmod tempor incididunt ut labore et laborused.</p>
                        </div>
                        <div className="space-50"></div>
                        <a href="#" className="bttn-default wow fadeInUp" data-wow-delay="0.8s">Learn More</a>
                    </div>
                </div>
                <div className="col-xs-12 col-md-6">
                    <figure className="mobile-image">
                        <img src={chat} alt="" />
                    </figure>
                </div>
            </div>
        </div>
    </section>
  
    <section className="video-area section-padding">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <div className="video-photo">
                        <img src={videoImage} alt="" />
                        <a href="https://www.youtube.com/watch?v=ScrDhTsX0EQ" className="popup video-button">
                            <img src={playButton} alt="" />
                        </a>
                    </div>
                </div>
                <div className="col-xs-12 col-md-5 col-md-offset-1">
                    <div className="space-60 hidden visible-xs"></div>
                    <div className="page-title">
                        <h5 className="title wow fadeInUp" data-wow-delay="0.2s">VIDEO FEATURES</h5>
                        <div className="space-10"></div>
                        <h3 className="dark-color wow fadeInUp" data-wow-delay="0.4s">Grat Application Ever</h3>
                        <div className="space-20"></div>
                        <div className="desc wow fadeInUp" data-wow-delay="0.6s">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do eiusmod tempor incididunt ut labore et laborused sed do eiusmod tempor incididunt ut labore et laborused.</p>
                        </div>
                        <div className="space-50"></div>
                        <a href="#" className="bttn-default wow fadeInUp" data-wow-delay="0.8s">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="section-padding gray-bg">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <div className="page-title">
                        <h5 className="title wow fadeInUp" data-wow-delay="0.2s">Our features</h5>
                        <div className="space-10"></div>
                        <h3 className="dark-color wow fadeInUp" data-wow-delay="0.4s">Our Approach of Design is Prety Simple and Clear</h3>
                    </div>
                    <div className="space-20"></div>
                    <div className="desc wow fadeInUp" data-wow-delay="0.6s">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do eiusmod tempor incididunt ut labore et laborused sed do eiusmod tempor incididunt ut labore et laborused.</p>
                    </div>
                    <div className="space-50"></div>
                    <a href="#" className="bttn-default wow fadeInUp" data-wow-delay="0.8s">Learn More</a>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-5 col-md-offset-1">
                    <div className="space-60 hidden visible-xs"></div>
                    <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                        <div className="box-icon">
                            <i className="lnr lnr-clock"></i>
                        </div>
                        <h4>Easy Notifications</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                    </div>
                    <div className="space-50"></div>
                    <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                        <div className="box-icon">
                            <i className="lnr lnr-laptop-phone"></i>
                        </div>
                        <h4>Fully Responsive</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                    </div>
                    <div className="space-50"></div>
                    <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                        <div className="box-icon">
                            <i className="lnr lnr-cog"></i>
                        </div>
                        <h4>Editable Layout</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
 
    <div className="download-area overlay">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-6 hidden-sm">
                    <figure className="mobile-image">
                        <img src={mobileScreen} alt="" />
                    </figure>
                </div>
                <div className="col-xs-12 col-md-6 section-padding">
                    <h3 className="white-color">Download The App</h3>
                    <div className="space-20"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam possimus eaque magnam eum praesentium unde.</p>
                    <div className="space-60"></div>
                    <a href="#" className="bttn-white sq"><img src={apple} alt="apple icon" /> Apple Store</a>
                    <a href="#" className="bttn-white sq"><img src={playStore} alt="Play Store Icon" /> Play Store</a>
                </div>
            </div>
        </div>
    </div>

    <section className="section-padding price-area" id="price_page">
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <div className="page-title text-center">
                        <h5 className="title">Pricing Plan</h5>
                        <h3 className="dark-color">Our Awesome Pricing Plan</h3>
                        <div className="space-60"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-4">
                    <div className="price-box">
                        <div className="price-header">
                            <div className="price-icon">
                                <span className="lnr lnr-rocket"></span>
                            </div>
                            <h4 className="upper">Free</h4>
                        </div>
                        <div className="price-body">
                            <ul>
                                <li>Easy Installations</li>
                                <li>Unlimited support</li>
                                <li>Uniqe Elements</li>
                            </ul>
                        </div>
                        <div className="price-rate">
                            <sup>&#36;</sup> <span className="rate">0</span> <small>/Month</small>
                        </div>
                        <div className="price-footer">
                            <a href="#" className="bttn-white">Purchase</a>
                        </div>
                    </div>
                    <div className="space-30 hidden visible-xs"></div>
                </div>
                <div className="col-xs-12 col-sm-4">
                    <div className="price-box">
                        <div className="price-header">
                            <div className="price-icon">
                                <span className="lnr lnr-diamond"></span>
                            </div>
                            <h4 className="upper">Medium</h4>
                        </div>
                        <div className="price-body">
                            <ul>
                                <li>Easy Installations</li>
                                <li>Unlimited support</li>
                                <li>Free Forever</li>
                            </ul>
                        </div>
                        <div className="price-rate">
                            <sup>&#36;</sup> <span className="rate">49</span> <small>/Month</small>
                        </div>
                        <div className="price-footer">
                            <a href="#" className="bttn-white">Purchase</a>
                        </div>
                    </div>
                    <div className="space-30 hidden visible-xs"></div>
                </div>
                <div className="col-xs-12 col-sm-4">
                    <div className="price-box">
                        <div className="price-header">
                            <div className="price-icon">
                                <span className="lnr lnr-pie-chart"></span>
                            </div>
                            <h4 className="upper">Business</h4>
                        </div>
                        <div className="price-body">
                            <ul>
                                <li>Easy Installations</li>
                                <li>Unlimited support</li>
                                <li>Free Forever</li>
                            </ul>
                        </div>
                        <div className="price-rate">
                            <sup>&#36;</sup> <span className="rate">99</span> <small>/Month</small>
                        </div>
                        <div className="price-footer">
                            <a href="#" className="bttn-white">Purchase</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
   
    <div className="subscribe-area section-padding">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-8 col-sm-offset-2">
                    <div className="subscribe-form text-center">
                        <h3 className="blue-color">Subscribe for More Features</h3>
                        <div className="space-20"></div>
                        <form id="mc-form">
                            <input type="email" className="control" placeholder="Enter your email" required="required" id="mc-email" />
                            <button className="bttn-white active" type="submit"><span className="lnr lnr-location"></span> Subscribe</button>
                            <label className="mt10" htmlFor="mc-email"></label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    <footer className="footer-area" id="contact_page">
        <div className="section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="page-title text-center">
                            <h5 className="title">Contact US</h5>
                            <h3 className="dark-color">Find Us By Bellow Details</h3>
                            <div className="space-60"></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <div className="footer-box">
                            <div className="box-icon">
                                <span className="lnr lnr-map-marker"></span>
                            </div>
                            <p>Ministry of work and Housing <br /> Mabushi, FCT Abuja</p>
                        </div>
                        <div className="space-30 hidden visible-xs"></div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="footer-box">
                            <div className="box-icon">
                                <span className="lnr lnr-phone-handset"></span>
                            </div>
                            <p>+234 419199419 <br /> +234 41991441</p>
                        </div>
                        <div className="space-30 hidden visible-xs"></div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="footer-box">
                            <div className="box-icon">
                                <span className="lnr lnr-envelope"></span>
                            </div>
                            <p>ogs@gmail.com <br /> devs@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </footer>
    </div>
  );
}

export default Landing;