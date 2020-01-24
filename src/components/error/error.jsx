import React, { Component } from 'react';

import './error.scss';

export default class Error extends Component {
    render() {
        return (
            <p className="error__msg">This page doesn't exist
                <br />
                <a className="error__back" href="/">Back to main page</a>
            </p>
        )
    }
}