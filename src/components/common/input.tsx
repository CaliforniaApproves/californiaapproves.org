/* ****** CAA Imports ****** */
// UI

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren, type JSX } from 'react';

import classnames from 'classnames';

/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated
type InputColor = 'orange'|'purple'|'green'|'black';

type InputProps = JSX.IntrinsicElements["input"] & {
    className?: string;
    color: InputColor;
    label?: string;
    labelHidden?: boolean;
    placeholder?: string;
};

// create a component
const Input = ({color, type, label, placeholder, labelHidden=false, className='', id, required=false, name}: PropsWithChildren<InputProps>) => {
    return (
        <div className={classnames(
            'caa-input'
            , {
                [className]: className != null
            }
        )}>
            <label htmlFor={label} className={classnames({"sr-only": labelHidden})}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                name={name || label}
                className={classnames(
                    "block w-full rounded-2xl border-0 p-3 text-center text-black shadow-xs ring-1 ring-inset placeholder:text-schist-high focus:ring-2 focus:ring-inset sm:text-sm lg:text-base sm:leading-6 bg-schist"
                    , {
                        "ring-purple focus:ring-purple-high": color === 'purple'
                        , "ring-green focus:ring-green-high": color === 'green'
                        , "ring-orange focus:ring-orange-high": color === 'orange'
                        , "ring-black focus:ring-black-high": color === 'black'
                    }
                )}
                placeholder={placeholder}
                required={required}
            />
            </div>
    );
}

//make this component available to the app
export default Input
