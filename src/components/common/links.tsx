/* ****** CAA Imports ****** */
// UI

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren } from 'react'

import classnames from 'classnames';

/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated
type LinkColor = 'orange'|'purple'|'green'|'black'|'white';

type LinkProps = {
    className?: string;
    to: string;
    color?: LinkColor;
    target?: string;
    rel?: string;
};

// create a component
export const Link = ({to, children, color, target, rel, className=''}: PropsWithChildren<LinkProps>) => {
    const classNames = classnames(
        'caa-link'
        , {
            'text-orange hover:text-orange-high': color === 'orange'
            , 'text-purple hover:text-purple-high': color === 'purple'
            , 'text-green hover:text-green-high': color === 'green'
            , 'text-black hover:text-schist-high': color === 'black'
            , 'text-white hover:text-schist-low': color === 'white'
        }
        , className
    )
    return (
        <a
            href={to}
            class={classNames}
            target={target}
            rel={rel}
        >
            {children}
        </a>
    );
}
