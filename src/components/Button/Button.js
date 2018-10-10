import React from 'react';

export function Button(props){
    const {
        buttonName = 'Button',
        className = '',
        handleClick
    } = props;
    return (
        <button
            type="button"
            className={className}
            onClick={handleClick}
        >
            {buttonName}
        </button>
    );
}