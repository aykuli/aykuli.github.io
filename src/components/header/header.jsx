import React from 'react';
import { NavLink } from 'react-router-dom';

import social from '../../constants/contact';
import mainInfo from '../../constants/main';
import socialContainer from '../social/social';

import './header.scss';

export default function Header() {
    return (
        <div className="header__wrap">
            <header className="header">
                <div className="header__logo"></div>
                <nav className="header__nav">
                    <NavLink className="nav__link" exact to='/about'>About</NavLink>
                    <NavLink className="nav__link" exact to='/#portfolio'>Portfolio</NavLink>
                </nav>
                <div className="header__info">
                    <h1 className="header__title">{`${mainInfo.name} ${mainInfo.surName}`}</h1>
                    <p className="header__desc">{`${mainInfo.profession}`}</p>
                    {socialContainer(social)}
                </div>
            </header>
        </div>
    )
}