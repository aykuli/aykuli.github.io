import React, { Fragment } from 'react';

import Header from './components/header/header';
import Footer from './components/footer/footer';

const App = ({children}) => {
    return (
        <Fragment>
            <Header  />
            {children}
            <Footer />
        </Fragment>
    )
    
};

export default App;