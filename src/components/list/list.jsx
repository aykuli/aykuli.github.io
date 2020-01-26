import React from 'react';
import './list.scss';

export default function list(info) {
    console.log('list')
    return (
        <ul key={info[0][0]}>
            {info.map((item,index) => item.map((el, i) => <li key={el}>{i === 0 ? <a href={item[i+1]}>{el}</a> : console.log('111')}</li>))}
        </ul>
    );
}