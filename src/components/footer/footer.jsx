import React from 'react';
import { NavLink } from 'react-router-dom';

import social from '../../constants/contact';
import socialContainer from '../social/social';

import './footer.scss';

export default function Footer() {
    return (
        <div className="footer__wrap">
            <footer className="footer">
                <div className="footer__social">
                    {socialContainer(social)}
                </div>
                <nav className="footer__nav">
                    <NavLink className="nav__link" exact to='/about'>About</NavLink>
                    <NavLink className="nav__link" exact to='/#portfolio'>Portfolio</NavLink>
                </nav>
                <p className="footer__year">© {new Date().getFullYear()} Aynur Shauerman</p>
            </footer>
        </div>
    )
}