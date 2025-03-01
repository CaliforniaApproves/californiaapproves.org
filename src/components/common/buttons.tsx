/* ****** CAA Imports ****** */
// UI

// Logic

/* ****** Other Imports ****** */
// UI
import { Link } from "./links";
// Logic
import React, { PropsWithChildren, type JSX } from 'react';
import classnames from 'classnames';

/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated
type ButtonVariant = 'solid'|'outlined'|'text';
type ButtonColor = 'orange'|'purple'|'green'|'black';
type ButtonSize = 'sm'|'lg';

type ButtonProps = JSX.IntrinsicElements["button"] & {
    variant: ButtonVariant;
    color: ButtonColor;
    size?: ButtonSize
    className?: string;
}

type ActionButtonProps = ButtonProps & {
    onClick?: () => void;
};

export const ActionButton = ({variant, color, size='sm', onClick, children, className=''}: PropsWithChildren<ActionButtonProps>) => {

    const classNames = classnames(
        'caa-button rounded-2xl px-4 py-2 uppercase flex text-center tracking-[-0.01rem] justify-center items-center font-extrabold cursor-pointer'
        , {
            'text-white': variant === 'solid'
            , 'border-[6px]': variant === 'outlined'
        }
        , {
            'bg-orange hover:bg-orange-high': variant === 'solid' && color === 'orange'
            , 'bg-purple hover:bg-purple-high': variant === 'solid' && color === 'purple'
            , 'bg-green hover:bg-green-high': variant === 'solid' && color === 'purple'
            , 'bg-black hover:bg-schist-high': variant === 'solid' && color === 'black'
            , 'border-orange hover:border-orange-high': variant === 'outlined' && color === 'orange'
            , 'border-purple hover:border-purple-high': variant === 'outlined' && color === 'purple'
            , 'border-green hover:border-green-high': variant === 'outlined' && color === 'purple'
            , 'border-black hover:border-schist-high': variant === 'outlined' && color === 'black'
            , 'text-orange': variant === 'text' && color === 'orange'
            , 'text-purple': variant === 'text' && color === 'purple'
            , 'text-green': variant === 'text' && color === 'purple'
            , 'text-black': variant === 'text' && color === 'black'
        }
        , {
            'text-bsm h-[40px] w-[121px]': size === 'sm'
            , 'text-bsl h-[52px] w-[136px]': size === 'lg'
        }
        , className
    );
    return (
        <button className={classNames} onClick={onClick}>
            {children}
        </button>
    );
}

type NavButtonProps = ButtonProps & {
    link: string;
};

export const NavButton = ({variant, color, size='sm', link, children, className=''}: PropsWithChildren<NavButtonProps>) => {
    return (
        <Link to={link}>
            <ActionButton className={className} variant={variant} color={color} size={size}>
                {children}
            </ActionButton>
        </Link>
    );
}
