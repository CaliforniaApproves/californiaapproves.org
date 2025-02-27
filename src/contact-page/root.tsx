/* ****** CAA Imports ****** */
// UI
import TopSection from './top-section';
import InfoSection from './info-section';
import ContactForm from './contact-form';

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren } from 'react'
import update from 'immutability-helper';

/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const ContactPage = () => {
    return (
        <div className='caa-contact-page'>
            <TopSection/>
            <ContactForm/>
            <InfoSection/>
        </div>
    );
}

//make this component available to the app
export default ContactPage
