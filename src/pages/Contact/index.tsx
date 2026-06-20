import TopSection from './top-section';
import InfoSection from './info-section';
import ContactForm from './contact-form';



import React, { PropsWithChildren } from 'react'





// create a component
export function Contact() {
    return (
        <div className='caa-contact-page'>
            <title>Contact California Approves</title>
            <TopSection/>
            <ContactForm/>
            <InfoSection/>
        </div>
    );
}