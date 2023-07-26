import React from 'react';

export const Footer = (props) => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-6 footerleft ">
                        <div className="logofooter"> Logo</div>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the
                            1500s, when an unknown printer took a galley of
                            type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also
                            the leap into electronic typesetting, remaining
                            essentially unchanged.{' '}
                        </p>
                        <p>
                            <i className="fa fa-map-pin"></i> #297, 17th Cross,
                            19th Main, 2nd Stage, Shivanagar, Rajajinagar
                            Bangalore - 560010{' '}
                        </p>
                        <p>
                            <i className="fa fa-phone"></i> Phone (India) :{' '}
                            <a href="tel:+91 988 888 8888">+91 988 888 8888</a>
                        </p>
                        <p>
                            <i className="fa fa-envelope"></i> E-mail :{' '}
                            <a href="mailto: jk@gmail.com">
                        </a>
                        </p>
                    </div>
                    <div className="col-md-2 col-sm-6 paddingtop-bottom">
                        <h6 className="heading7">GENERAL LINKS</h6>
                        <ul className="footer-ul">
                            <li>
                                <a href="#"> Career</a>
                            </li>
                            <li>
                                <a href="#"> Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#"> Terms & Conditions</a>
                            </li>
                            <li>
                                <a href="#"> Client Gateway</a>
                            </li>
                            <li>
                                <a href="#"> Ranking</a>
                            </li>
                            <li>
                                <a href="#"> Case Studies</a>
                            </li>
                            <li>
                                <a href="#"> Frequently Ask Questions</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-6 paddingtop-bottom">
                        <h6 className="heading7">LATEST POST</h6>
                        <div className="post">
                            <p>
                                {' '}
                                Facebook launches new camera app for Instagram{' '}
                            </p>
                            <p>
                                {' '}
                                Contrary to popular belief, Lorem Ipsum is not
                                simply random text.{' '}
                            </p>
                            <p>
                                {' '}
                                There are many variations of passages of Lorem
                                Ipsum available.{' '}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 paddingtop-bottom">
                        <div className="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-width="300" data-height="300" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                            <blockquote cite="https://www.facebook.com/facebook" className="fb-xfbml-parse-ignore">
                                <a href="https://www.facebook.com/facebook">Facebook</a>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </footer>


    )
}

