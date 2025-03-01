import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter
    , Routes
    , Route
} from "react-router";
import { About } from './pages/About/index';
import { Approval101 } from './pages/Approval-101';
import { Contact } from './pages/Contact';
import { Donate } from './pages/Donate';
import { Faq } from './pages/Faq';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './pages/Home/index';
import './style.css'

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
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
    </React.StrictMode>
);
