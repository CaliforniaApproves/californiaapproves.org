import React from 'react'

import {
    BrowserRouter
    , Routes
    , Route
} from "react-router";


import Root from './components/root';
import { Faq } from './pages/Faq';
import { Home } from './pages/Home/index';
import { About } from './pages/About/index';
import { Contact } from './pages/Contact';
import { Donate } from './pages/Donate';
import { Approval101 } from './pages/Approval-101';

import './assets/stylesheets/all.scss';

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Root>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/faq" element={<Faq />}/>
                        <Route path="/about" element={<About />}/>
                        <Route path="/contact" element={<Contact />}/>
                        <Route path="/donate" element={<Donate />}/>
                        <Route path="/approval-101" element={<Approval101 />}/>
                    </Routes>
                </Root>
            </BrowserRouter>
        );
    }
}