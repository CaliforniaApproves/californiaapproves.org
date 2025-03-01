import React from 'react'

import {
    BrowserRouter
    , Routes
    , Route
} from "react-router";


import Root from './components/root';
import FaqPage from './pages/Faq';
import { Home } from './pages/Home/index';
import { About } from './pages/About/index';
import ContactPage from './pages/Contact';
import DonatePage from './pages/Donate';
import Approval101 from './pages/Approval-101';
import ArticlesPage from './pages/Articles';

import './assets/stylesheets/all.scss';

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Root>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/faq" element={<FaqPage />}/>
                        <Route path="/about" element={<About />}/>
                        <Route path="/contact" element={<ContactPage />}/>
                        <Route path="/donate" element={<DonatePage />}/>
                        <Route path="/approval-101" element={<Approval101 />}/>
                        <Route path="/articles" element={<ArticlesPage />}/>
                    </Routes>
                </Root>
            </BrowserRouter>
        );
    }
}