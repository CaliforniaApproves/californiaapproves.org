import React from 'react'

import {
    BrowserRouter
    , Routes
    , Route
} from "react-router";


import Root from './components/root';
import FaqPage from './faq-page/root';
import LandingPage from './landing-page/root';
import AboutPage from './about-page/root';
import ContactPage from './contact-page/root';
import DonatePage from './donate-page/root';
import Approval101Page from './approval-101-page/root';
import ArticlesPage from './articles-page/root';

import './assets/stylesheets/all.scss';

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Root>
                    <Routes>
                        <Route path="/" element={<LandingPage />}/>
                        <Route path="/faq" element={<FaqPage />}/>
                        <Route path="/about" element={<AboutPage />}/>
                        <Route path="/contact" element={<ContactPage />}/>
                        <Route path="/donate" element={<DonatePage />}/>
                        <Route path="/approval-101" element={<Approval101Page />}/>
                        <Route path="/articles" element={<ArticlesPage />}/>
                    </Routes>
                </Root>
            </BrowserRouter>
        );
    }
}