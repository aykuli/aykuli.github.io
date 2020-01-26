import React from 'react';

import './portfolio.scss';

import projects from '../../constants/projects/projects';

function renderProject({id, title, deploy, properties,repLink} ) {
    return (
        <div key={id} className="project">
            <div title={title}>
                <picture>
                    <source className="project__img" 
                            media="(min-width: 800px)"
                            srcSet={`${require(`../../constants/projects/imgs/${id}.jpg`)}`}
                    />
                    <img    className="project__img" 
                            src="https://placekitten.com/300/225"
                            alt={title} 
                    />
                </picture>
            </div>
            <div className="project__props">
            <h2 className="project__title">{title}</h2>
                <ul className="project__props--list">
                    {properties.map((item, index) => <li     key={`${id}-${index}`}
                                                        className="project__prop"
                                                >{item}</li>
                    )}
                </ul>
                {repLink || deploy ? <h3 className="project__links">Links:</h3> : null}
                <ul className="project__props--list">
                    {repLink ? (
                        <li key={`${id}-rep`} className="project__prop">
                            <a  className="project__link" 
                                href={repLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >repository</a>
                        </li>
                    ) : null}
                    {deploy ? (
                        <li key={`${id}-deploy`} className="project__prop">
                            <a  className="project__link" 
                                href={deploy}
                                target="_blank"
                                rel="noopener noreferrer"
                            >deploy</a>
                        </li>
                    ) : null}
                </ul>
            </div>
        </div>
    )
}

export default function Portfolio() {
    const data = projects;
        return (
            <div className="projects__wrap">
                <section className="projects">
                    {data.map(el => renderProject(el))}
                </section>
            </div>
        )
}