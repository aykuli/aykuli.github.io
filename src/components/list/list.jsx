import React from 'react';
import './list.scss';

export default function list(info, isOpen) {
    return (
        <ul className={ isOpen ? "list" : "list hidden"} key={info[0][0]}>
            {info.map((item,index) => item.map((el, i) => subList(item, el, i)))}
        </ul>
    );
}

function subList(arr, el, i) {
    switch(i) {
        case 0:
            return (
                <li key={el} className="list__item">
                    <a href={arr[i+1]}>{el}</a>
                </li>
            );
        case 1:
            return;
        default: 
            return (
                <ul key={el}>
                    <li key={`${el}-${i}`}>{el}</li>
                </ul>
            );
    }
}