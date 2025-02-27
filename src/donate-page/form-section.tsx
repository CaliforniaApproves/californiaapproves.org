/* eslint-disable react/no-unknown-property */
/* ****** CAA Imports ****** */
// UI

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
const FormSection = () => {
    return (
        <div className='px-8 py-10 bg-linear-to-bl from-purple to-tan flex flex-col items-center'>
            <div className='flex flex-col'>
                <div className='text-white mb-10 text-center'>
                    <h1 className='mb-4'>Donate to California Approves</h1>
                    <h5>Your donation will help bring better democracy to California</h5>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className='flex justify-center'>
                        <script src="https://donorbox.org/widget.js" data-paypalExpress="false"></script><iframe src="https://donorbox.org/embed/california-approval-voting?default_interval=o&hide_donation_meter=true" name="donorbox" data-allowpaymentrequest="allowpaymentrequest" seamless={true} frameBorder="0" scrolling="no" height="700px" width="100%" style={{maxWidth: "500px", minWidth: "250px", maxHeight:"none!important"}}></iframe>
                    </div>
                    <div className='text-white'>
                        <h2 className='mb-4'>We believe in a better democracy</h2>
                        <p className='text-base'>California Approves strives to make California elections more expressive and fair. We believe that voting systems shape voter and candidate behavior. Better voting systems let voters be more honest and incentivize candidates to better represent the electorate.</p>
                        <br/>
                        <p className='text-base'>We are a group of grassroots volunteers dedicating our free time to bring better democracy to California. Donations to our organization help us educate voters on Approval Voting, fund ballot measures to get Approval Voting on the ballot, and generally bring awareness to voting reform.</p>
                        <br/>
                        <p className='text-base'>The state of California requires we gather employment information on all donations.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

//make this component available to the app
export default FormSection
