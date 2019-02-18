import React, { Component } from 'react';
import HtmlToReactParser from 'html-to-react';
import styled from 'styled-components';

const htmlParser = new HtmlToReactParser.Parser();

const Content = styled.div`
    margin: 50px auto;
    width: 1000px;
    text-align: justify;
`;

const Title = styled.h2`
    font-size: 1.6em;
    text-align: center;
`;

const Body = styled.div`
    font-size: 1.2em;
`;

export default class Post extends Component {
    render() {
        return (
            <Content>
                <Title>{this.props.title}</Title>
                <Body>
                    {htmlParser.parse(this.props.content)}
                </Body>
            </Content>
        );
    }
}
