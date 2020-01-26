import React from 'react';
import './table.scss';

export default function table(info) {
    return (
        <table className="table hidden">
            <tbody>
                {info.map((row, index) => <tr   key={`row-${index}`} 
                                                className="table__row">
                    {row.map((td, index) => <td key={`${td}-${index}`} 
                                                className={index ? 'table__td' 
                                                : 'table__td bold'}>{td}</td>
                    )}</tr>)}
            </tbody>
        </table>
    )
}