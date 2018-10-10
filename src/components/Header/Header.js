import React from 'react';

export function Header(props){
    const { title } = props;
    return (
        <div className="header">
            <h1>{title}</h1>
        </div>
    );
}