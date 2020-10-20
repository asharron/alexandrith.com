import React from 'react';
import "../../styles/main.scss";
import "./_commonLayout.scss";
import Header from '../../components/header/Header';

export default function CommonLayout({children}) {
    return (
        <div className={"common-layout"}>
            <Header />
            <div className={"common-layout__content"}>
                {children}
            </div>
        </div>
    )
}