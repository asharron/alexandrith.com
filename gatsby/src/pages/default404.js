import React from 'react';
import {Link} from 'gatsby';
import './four-oh-four.scss';

export default function FourOhFour() {
    return (
        <div className={'four-oh-four'}>
            <div className={'four-oh-four__emoji'}>&#129300;</div>
            <h1 className={'four-oh-four__title'}>Oops! That page doesn't exist!</h1>
            <p><Link to={'/'}>Click here to go back to the Home page</Link></p>
        </div>
    );
}