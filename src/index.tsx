// Make svgr imports work `import Logo from "./logo.svg?react";`
/// <reference types="vite-plugin-svgr/client" />

import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';

import { About } from './pages/About';
import { Approval101 } from './pages/Approval-101';
import { Contact } from './pages/Contact';
import { Donate } from './pages/Donate';
import { Faq } from './pages/Faq';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { NotFound } from './pages/_404';
import './style.css';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home}/>
					<Route path="/faq" component={Faq}/>
					<Route path="/about" component={About}/>
					<Route path="/contact" component={Contact}/>
					<Route path="/donate" component={Donate}/>
					<Route path="/approval-101" component={Approval101}/>
					<Route default component={NotFound} />
				</Router>
			</main>
			<Footer />
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
