


import React from 'react' ;

import { BrowserRouter , Switch , Route , Redirect } from 'react-router-dom' ;

import Home from './home' ;

const Pages = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/pages/home" component={Home} />
                    <Redirect from="/" to="/pages/home"  />
                </Switch>
            </BrowserRouter>

        </>
    )
}

export default Pages ;