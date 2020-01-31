import React from 'react';

import './social.scss';

export default function socialContainer(social) {
    return (
        <div className="social">
            {social.map(({ id, href }) => {
                return (
                    <a  key={id}
                        className={`social__icon social__${id}`} 
                        href={href}
                        title={href}
                    >
                        <span className="social__hidden">Account on {id}</span>
                    </a>
                )
            })}
        </div>
    )
}