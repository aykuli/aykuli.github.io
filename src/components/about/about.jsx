import React, { useState } from 'react';
import './about.scss';

import table from '../table/table';
import list from '../list/list';

import info from '../../constants/about';

function Button({ id, title, info, type}) {
    const [isOpen, setOpen] = useState(false);
    return (
        <div key={id} className="about__btn--wrap">
            <button className="about__btn" onClick={() => setOpen(!isOpen)}>
            <h3 className="about__title">{title}</h3>
                <svg className="about__arrow" fill="#0f1c20" version="1.1" viewBox="0 0 512 512" width="20" height="20">
                    <path d="M201.5,0.3L16.3,185.5h108.9c0,337.7,261.5,326.8,370.4,326.8C277.7,436.1,277.7,338,277.7,185.5h108.9L201.5,0.3z"/>
                </svg>
            </button>
            {(type === 'table') ? table(info, isOpen) : list(info, isOpen)}
        </div>
    )
}

export default function About() {
    return (
        <div className="about__wrap">
            <h2 className="hidden">Page about my education related to front-end development</h2>
            {info.map(el => <Button key={el.id} {...el} />)}
        </div>
    )
}