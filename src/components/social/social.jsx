import React from 'react';

import './social.scss';

export default function socialContainer(social) {
    return (
        <div className="social">
            {social.map(el => {
                return (
                    <a  key={el.id}
                        className={`social__icon social__${el.id}`} 
                        href={el.href}
                        title={el.href}
                    >
                        <span className="social__hidden">Account on {el.id}</span>
                    </a>
                )
            })}
        </div>
    )
}