import React from 'react';
import Header from './header';
import Footer from './footer';

const Root = ({children}: { children: React.ReactNode }) => {
        return (
            <div id="root-component" className="ca-approves-root max-w-(--breakpoint-2xl) m-auto">
                <Header></Header>
                {children}
                <Footer></Footer>
            </div>
        );
}
export default Root;
