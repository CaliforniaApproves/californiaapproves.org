/* ****** CAA Imports ****** */
// UI

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren, useEffect, useState } from 'react'

import classNames from 'classnames';

/* ****** Assets ****** */
import RightArrow from '../../assets/icons/Arrow.svg?react';
import LeftArrow from '../../assets/icons/Back-Arrow.svg?react';


/* ****** Constants ****** */
// Imported

// Generated
type CarouselColors = 'tan'|'white'|'black';
type CarouselProps = {
    className?: string;
    color: CarouselColors;
};

// create a component
const Carousel = ({color, className='', children=[]}: PropsWithChildren<CarouselProps>) => {
    const [content, setContent] = useState(Array.isArray(children) ? children: [children]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setContent(Array.isArray(children) ? children: [children]);
        setIndex(0);
    }, [children])

    const leftClick = () => {
        if (index === 0) setIndex(content.length - 1);
        else setIndex(index - 1);
    }
    const rightClick = () => {
        if (index === content.length -1) setIndex(0);
        else setIndex(index + 1);
    }
    return (
        <div className={classNames(
            'caa-carousel flex flex-col lg:flex-row justify-around items-center text-center lg:text-left'
            , { [className]: className != null }
        )}>
            <LeftArrow
                className={classNames(
                    "fill-current w-14 h-14 mx-2 hidden lg:flex"
                    , {
                        'text-tan hover:text-tan-high': color === 'tan'
                        , 'text-white hover:text-schist-low': color === 'white'
                        , 'text-black hover:text-schist-high': color === 'black'
                    }
                )}
                onClick={leftClick}
            />
            {content[index]}
            <div className='flex flex-row items-center mt-6 lg:mt-0'>
                <LeftArrow
                    className={classNames(
                        "fill-current w-14 h-14 mx-2 flex lg:hidden"
                        , {
                            'text-tan hover:text-tan-high': color === 'tan'
                            , 'text-white hover:text-schist-low': color === 'white'
                            , 'text-black hover:text-schist-high': color === 'black'
                        }
                    )}
                    onClick={leftClick}
                />
                <RightArrow
                    className={classNames(
                        "fill-current w-14 h-14 mx-2"
                        , {
                            'text-tan hover:text-tan-high': color === 'tan'
                            , 'text-white hover:text-schist-low': color === 'white'
                            , 'text-black hover:text-schist-high': color === 'black'
                        }
                    )}
                    onClick={rightClick}
                />
            </div>
        </div>
    );
}

//make this component available to the app
export default Carousel;
