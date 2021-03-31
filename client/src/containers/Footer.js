import React from 'react';
import { Link } from 'react-router-dom';
import Footer2 from './Footer2';

function Footer(props) {
    return (
        <div className="bg-black">
            <footer className="footer text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-3">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><Link to="/" className="text-theme">Home</Link></li>
                                <li><Link to="/about" className="text-theme">About</Link></li>
                                <li><Link to="/contact" className="text-theme">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-6 col-lg-5" id="dest">
                            <h5>Our Address</h5>
                            <address className="text-white">
                                University Rd, Block 5 Gulshan-e-Iqbal, Karachi
                            <br />
                                <i className="fa fa-phone fa-lg"></i>:<span className="text-theme"> +92 123 4567890</span><br />
                                <i className="fa fa-fax fa-lg"></i>:<span className="text-theme"> +92 335 5678543</span><br />
                                <i className="fa fa-envelope fa-lg"></i>: <a
                                    href="mailto:blockchain@lifecycle.com" className="text-theme">blockchain@lifecycle.com</a>
                            </address>
                        </div>
                        <div className="followUs col-12 col-lg-4 mt-3 mt-lg-0">
                            <h5>Follow Us</h5>
                            <div className="text-center">
                                <a className="footNavLink" href="https://www.facebook.com" target="_blank"><span className="footNavSpan"><svg className="footNav" aria-labelledby="simpleicons-facebook-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path></svg></span></a>&nbsp;
                                <a className="footNavLink" href="https://www.twitter.com" target="_blank"><span className="footNavSpan"><svg className="footNav" aria-labelledby="simpleicons-twitter-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path></svg></span></a>&nbsp;
                                <a className="footNavLink" href="https://www.instagram.com" target="_blank"><span className="footNavSpan"><svg className="footNav" aria-labelledby="simpleicons-instagram-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"></path></svg></span></a>&nbsp;
                                <a className="footNavLink" href="https://www.youtube.com/" target="_blank"><span className="footNavSpan"><svg className="footNav" aria-labelledby="simpleicons-youtube-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path className="a" d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"></path></svg></span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <hr className="py-0 my-0" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />
            <Footer2 />
        </div>
    );
}

export default Footer;