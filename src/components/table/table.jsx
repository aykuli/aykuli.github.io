import React from 'react';
import './table.scss';

export default function table(info) {
    return (
        <table>
            {info.map((row, index) => {
                console.log(row);
            return <tr>{row.map((td, index) => <td>{td}</td>)}</tr>;})}
        </table>
    )
}