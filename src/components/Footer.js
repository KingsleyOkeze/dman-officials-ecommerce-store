import dmanLogo from '../images/dman-logo.png'
import '../styles/components-styles/Footer.css';
import { GrInstagram } from "react-icons/gr";
import { MdFacebook } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { ImWhatsapp } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Footer () {
    const navigate = useNavigate();
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
        //   console.log('Window width:', window.innerWidth);
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

    
    // Emailing note
    const email = process.env.REACT_APP_EMAIL_LINK
    const subject = "Hello there!"; // Optional subject for the email
    const body = "I would like to inquire about..."; // Optional body for the email

    
    return(
        <div className="footer-container">
            <div className="image-container">
                <img 
                    src={dmanLogo} 
                    width={50} 
                    height={50}
                    onClick={() => {
                        navigate("/");
                        scrollToTop();
                    }}
                />
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
                            <li>
                                <Link to="category-page/MensWear" className="link-tag">Mens Wear</Link>
                            </li>
                            <li>
                                <Link to="category-page/FootWear" className="link-tag">Foot Wear</Link>
                            </li>
                            <li>
                                <Link className="link-tag">Accessories</Link>
                            </li>
                            <li>
                                <Link to="sale-page" className="link-tag">Sale</Link>
                            </li>
                            <li>
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
                            <li>
                                <Link to="faq-page" className="link-tag">FAQ</Link>
                            </li>
                            <li>
                                <Link to="shipping-policy" className="link-tag">Shipping</Link>
                            </li>
                            <li>
                                <Link to="returns-policy" className="link-tag">Returns</Link>
                            </li>
                            <li>
                                <Link to="payment-policy" className="link-tag">Payments</Link>
                            </li>
                            <li>
                                <Link to="contact" className="link-tag">Contact us</Link>
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
                            <li>
                                <Link to="terms-of-use-page" className="link-tag">Terms and Service</Link>
                            </li>
                            <li>
                                <Link to="privacy-policy" className="link-tag">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="cookie-policy" className="link-tag">Cookie Policy</Link>
                            </li>
                            <li>
                                <Link to="disclaimer-page" className="link-tag">Desclaimer</Link>
                            </li>
                            <li>
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
                                <a 
                                    href={process.env.REACT_APP_IG_LINK}
                                    target="_blank" // Opens the link in a new tab
                                    rel="noopener noreferrer" // Improves security for external links
                                    className="a-tag"
                                >
                                <GrInstagram className="icon"/>
                                </a>
                            </div>
                            <div>
                                <a
                                    href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                                    style={{
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                    }}
                                    className="a-tag"
                                >
                                    <MdEmail className="icon"/>
                                </a>
                            </div>
                        </div>
                    </div>
             
                    <div className="footer-bottom-first-child-2">
                        <p>Message us:</p>
                        <div>
                            <a 
                                href={process.env.REACT_APP_WHATSAPP_LINK}
                                target="_blank" // Opens the link in a new tab
                                rel="noopener noreferrer" // Improves security for external links
                                className="a-tag"
                            >
                                <ImWhatsapp className="icon"/>
                            </a>
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