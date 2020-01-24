import React from 'react';

import social from '../../constants/contact';
import socialContainer from '../social/social';

import './footer.scss';

export default function Footer() {
    const date = new Date();
    console.log(date.getFullYear());
    return (
        <div className="footer__wrap">
            <footer className="footer">
                <div className="footer__social">
                    {socialContainer(social)}
                </div>
                <p className="footer__year">© {new Date().getFullYear()} Aynur Shauerman</p>
            </footer>
        </div>
    )
}