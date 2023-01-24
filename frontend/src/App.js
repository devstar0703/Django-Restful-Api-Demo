

import React from 'react' ;

import { BrowserRouter  , Switch , Route , Redirect } from 'react-router-dom' ;

import Pages from './pages' ;
import Login from './components/login' ;

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/pages" component={ Pages } />
                    <Route exact path="/login" component={ () => <Login isLogged="false" /> } />
                    <Redirect from="/" to="/login" />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default App ;