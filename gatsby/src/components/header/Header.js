import React from 'react';
import { Link } from 'gatsby';
import './_header.scss';

export default function Header() {
    return (
        <nav className={'header'}>
            <Link to={'#'} className={'header__link'}>Home</Link>
            <Link to={'#'} className={'header__link'}>Blog</Link>
            <Link to={'#'} className={'header__link'}>About</Link>
            <Link to={'#'} className={'header__link'}>Projects</Link>
            <Link to={'#'} className={'header__link'}>Art</Link>
            <Link to={'#'} className={'header__link'}>Resume</Link>
        </nav>
    );
}