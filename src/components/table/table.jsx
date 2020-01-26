import React from 'react';
import './table.scss';

export default function table(info) {

    return (
        <table className="table">
            {info.map((row, index) => {
                console.log(row);
            return <tr className="table__row">{row.map((td, index) => <td className={index ? 'table__td' : 'table__td bold'}>{td}</td>)}</tr>;})}
        </table>
    )
}