import './Footer.css';

function Footer() {
    return <div className="footer-ctn">
        <div className='footer-inner-ctn'>
            <div className='socials' >
                <h3>Socials</h3>

                <div className="links">
                    <a href="https://www.linkedin.com/in/christine-parsons-498b046a/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                    <p>Christine</p>
                    <a href="https://github.com/cparsons9712" target="_blank"><i class="fa-brands fa-square-github"></i></a>
                </div>

                <div className="links">
                    <a href="https://www.linkedin.com/in/alexandru-florea-151472ab/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                    <p>Alex</p>
                    <a href="https://github.com/SameDaySasha" target="_blank"><i class="fa-brands fa-square-github"></i></a>
                </div>

                <div className="links">
                    <a href="https://www.linkedin.com/in/antonsorokey/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                    <p>Anton</p>
                    <a href="https://github.com/ansorokey" target="_blank"><i class="fa-brands fa-square-github"></i></a>
                </div>
            </div>

            <p>@ 2023 App Academy</p>
        </div>
    </div>
}

export default Footer;
