import React from 'react'

import {
    BrowserRouter
    , Routes
    , Route
} from "react-router";


import { Faq } from './pages/Faq';
import { Home } from './pages/Home/index';
import { About } from './pages/About/index';
import { Contact } from './pages/Contact';
import { Donate } from './pages/Donate';
import { Approval101 } from './pages/Approval-101';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div id="root-component" className="ca-approves-root max-w-(--breakpoint-2xl) m-auto">
                    <Header></Header>
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/faq" element={<Faq />}/>
                            <Route path="/about" element={<About />}/>
                            <Route path="/contact" element={<Contact />}/>
                            <Route path="/donate" element={<Donate />}/>
                            <Route path="/approval-101" element={<Approval101 />}/>
                        </Routes>
                    <Footer></Footer>
                </div>
            </BrowserRouter>
        );
    }
}