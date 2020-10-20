import React from "react";
import { graphql } from "gatsby"
import CommonLayout from '../layouts/commonLayout/CommonLayout';

export default function Home() {
    return (
        <CommonLayout>
            <div className={'emoji'}>👷</div>
            <h1>This area is under construction!</h1>
        </CommonLayout>
    )
}
