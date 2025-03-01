/* ****** Twist Imports ****** */
// UI

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren } from 'react'


/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated
type PersonIntroProps = {
    title: string;
    name: string;
    intro?: string;
};

// create a component
const PersonIntro = ({children, title, name, intro}: PropsWithChildren<PersonIntroProps>) => {
    return (
        <div className='caa-person-intro flex flex-col lg:max-w-[33%] my-10'>
            {children}
            <h5 className='capitalize'>{title}</h5>
            <h2>{name}</h2>
            { intro &&
                <p>{intro}</p>
            }
        </div>
    );
}

//make this component available to the app
export default PersonIntro
