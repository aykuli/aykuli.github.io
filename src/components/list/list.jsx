import React from 'react';
import './list.scss';

export default function list(info) {
    console.log('list');
    return (
        <ul key={info[0][0]}>
            {info.map((item,index) => item.map((el, i) => subList(item, el, i)))}
        </ul>
    );
}

function subList(arr, el, i) {
    if (i === 0) {
        return <li key={el}><a href={arr[i+1]}>{el}</a></li>
    } else if (i === 1) {
        return;
    } else {
        return <ul><li>{el}</li></ul>
    }
}