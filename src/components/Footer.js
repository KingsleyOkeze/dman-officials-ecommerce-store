import dmanLogo from '../images/dman-logo.png'
import '../styles/components-styles/Footer.css';
import { GrInstagram } from "react-icons/gr";
import { MdFacebook } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { ImWhatsapp } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Footer () {
    const currentTime = new Date();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showDmanList, setShowDmanList] = useState(false);
    const [showHelpList, setShowHelpList] = useState(false);
    const [showLegalList, setShowLegalList] = useState(false);
    
    const dmanListRef = useRef(null);
    const helpListRef = useRef(null);
    const legalListRef = useRef(null); 

    const handleDmanListToggle = () => {
        dmanListRef.current.style.transition = 'height 0.5s';
        dmanListRef.current.style.height = showDmanList ? '0' : '200px';
        dmanListRef.current.style.overflow = showDmanList ? 'hidden' : 'visible';
        setShowDmanList(!showDmanList);
    };

    const handleHelpListToggle = () => {
        helpListRef.current.style.transition = 'height 0.5s';
        helpListRef.current.style.height = showHelpList ? '0' : '200px';
        helpListRef.current.style.overflow = showHelpList ? 'hidden' : 'visible';
        setShowHelpList(!showHelpList);
    };
    
    const handleLegalListToggle = () => {
        legalListRef.current.style.transition = 'height 0.5s';
        legalListRef.current.style.height = showLegalList ? '0' : '200px';
        legalListRef.current.style.overflow = showLegalList ? 'hidden' : 'visible';
        setShowLegalList(!showLegalList);
    };

    useEffect(() => {
        if (dmanListRef.current) {
            dmanListRef.current.style.height = '0';
            dmanListRef.current.style.overflow = 'hidden';
        }
        if (helpListRef.current) {
            helpListRef.current.style.height = '0';
            helpListRef.current.style.overflow = 'hidden';
        }
        if (legalListRef.current) {
            legalListRef.current.style.height = '0';
            legalListRef.current.style.overflow = 'hidden';
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
          console.log('Window width:', window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    // Automatically expand lists when screen width is >= 980px
    useEffect(() => {
        if (windowWidth >= 986) {
            setShowDmanList(true);
            setShowHelpList(true);
            setShowLegalList(true);

            // Ensure lists are fully visible when expanded
            if (dmanListRef.current) dmanListRef.current.style.height = '200px';
            if (helpListRef.current) helpListRef.current.style.height = '200px';
            if (legalListRef.current) legalListRef.current.style.height = '200px';

        } else {
            setShowDmanList(false);
            setShowHelpList(false);
            setShowLegalList(false);

            // Collapse lists when screen is resized to a smaller width
            if (dmanListRef.current) dmanListRef.current.style.height = '0';
            if (helpListRef.current) helpListRef.current.style.height = '0';
            if (legalListRef.current) legalListRef.current.style.height = '0';
        
        }
    }, [windowWidth]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
    return(
        <div className="footer-container">
            <div className="image-container">
                <img src={dmanLogo} width={50} height={50}/>
            </div>
            <div className="footer-body">
                <div className="footer-nav-list-container">
                    <div className="dman-list-container">
                        <div className="footer-nav-list-header">
                            <div>
                                <p>D.man</p>
                            </div>
                            <div>
                                {
                                    showDmanList === false ? 
                                        <FaPlus width={24} height={24} onClick={() => {
                                            setShowDmanList(true);
                                            handleDmanListToggle();
                                        }}
                                        className="footer-list-toggle-icon"/> 
                                        : 
                                        <FaMinus onClick={() => {
                                            setShowDmanList(false);
                                            handleDmanListToggle();
                                        }}
                                        className="footer-list-toggle-icon"/>
                                }  
                            </div>
                        </div>
                        
                        <ul ref={dmanListRef}>
                            <li onClick={scrollToTop}>Men</li>
                            <li onClick={scrollToTop}>Women</li>
                            <li onClick={scrollToTop}>Accessories</li>
                            <li onClick={scrollToTop}>Collection</li>
                            <li onClick={scrollToTop}>Sole</li>
                            <li onClick={scrollToTop}>
                                <Link to="about-us-page" className="link-tag">About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="help-list-container">
                        <div className="footer-nav-list-header">
                            <div>
                                <p>Help</p>
                            </div>
                            <div>
                                {
                                    showHelpList === false ? 
                                        <FaPlus onClick={() => {
                                            setShowHelpList(true);
                                            handleHelpListToggle();
                                        }}
                                        className="footer-list-toggle-icon"/> 
                                        : 
                                        <FaMinus  onClick={() => {
                                            setShowHelpList(false);
                                            handleHelpListToggle();
                                        }}
                                        className="footer-list-toggle-icon"/>
                                }  
                            </div>
                        </div>
                        <ul ref={helpListRef}>   
                            <li onClick={scrollToTop}>
                                <Link to="faq-page" className="link-tag">FAQ</Link>
                            </li>
                            <li onClick={scrollToTop}>
                                <Link to="shipping-page" className="link-tag">Shipping</Link>
                            </li>
                            <li onClick={scrollToTop}>
                                <Link to="returns-page" className="link-tag">Returns</Link>
                            </li>
                            <li onClick={scrollToTop}>
                                <Link to="payment-policy" className="link-tag">Payments</Link>
                            </li>
                            <li onClick={scrollToTop}>
                                <Link to="contact-page" className="link-tag">Contact us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="legal-list-container">
                        <div className="footer-nav-list-header">
                            <div>
                                <p>Legal</p>
                            </div>
                            
                            <div>
                                {
                                    showLegalList === false ? 
                                        <FaPlus onClick={() => {
                                            setShowLegalList(true);
                                            handleLegalListToggle();
                                        }}
                                        className="footer-list-toggle-icon"/> 
                                        : 
                                        <FaMinus onClick={() => {
                                            setShowLegalList(false);
                                            handleLegalListToggle();
                                        }}
                                        className="footer-list-toggle-icon"/>
                                }  
                            </div>
                        </div>
                        <ul ref={legalListRef}>
                            <li onClick={scrollToTop}>
                                <Link to="terms-of-use-page" className="link-tag">Terms and Service</Link>
                            </li>
                            <li onClick={scrollToTop}>
                                <Link to="privacy-policy" className="link-tag">Privacy Policy</Link>
                            </li>
                            <li onClick={scrollToTop}>
                                <Link to="cookie-policy" className="link-tag">Cookie Policy</Link>
                            </li>
                            <li onClick={scrollToTop}>
                                <Link to="disclaimer-page" className="link-tag">Desclaimer</Link>
                            </li>
                            <li onClick={scrollToTop}>
                                <Link to="warrant-and-return-policy" className="link-tag">Warranty and Return Agreement</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-newsletter-container">
                    <p className="footer-newsletter-header" >Newsletter</p>
                    <p className="footer-newsletter-sub-header">Sign up to be the first to know about drops, special offers and more.</p>
                    <p className="footer-newsletter-asking-text">Interested in:</p>
                    <ul className="footer-newsletter-lists">
                        <li><input type="radio" /> Menswear</li>
                        <li><input type="radio" /> Womenswear</li>
                        <li><input type="radio" /> Both</li>
                    </ul>
                    <div className="email-input-container">
                        <input type="text" placeholder="Your faourite email..."></input>
                        <button>Submit</button>
                    </div>
                    
                    <input type="radio" className="radio-input"/> I agree to the privacy policy 
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-bottom-first-child-container">
                    <div className="footer-bottom-first-child-1">
                        <p>Follow us:</p>
                        <div className="icon-div-container">
                            <div>
                                <MdFacebook className="icon"/>
                            </div>
                            <div>
                                <GrInstagram className="icon"/>
                            </div>
                            <div>
                                <BsTwitterX className="icon"/>
                            </div>
                        </div>
                    </div>
             
                    <div className="footer-bottom-first-child-2">
                        <p>Message us:</p>
                        <div>
                            <ImWhatsapp className="icon"/>
                        </div>
                    </div>
                </div>   
                <div className="footer-bottom-second-child-container">
                    <p>&copy; {currentTime.getFullYear()} DMAN All right reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;