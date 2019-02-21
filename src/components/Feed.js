import React, { Component } from 'react';
import Post from './Post';

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentWillMount() {
        fetch('http://alexandrith.com:90/index.php/wp-json/wp/v2/posts').then((res) => {
            return res.json();
        }).then((body) => {
            console.log(body);
            this.setState({ posts: [...body] });
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                {this.state.posts.map((post, index) => {
                    console.log(post.title.rendered);
                    return <Post key={index} title={post.title.rendered} content={post.content.rendered}/>;
                })}
            </div>
        );
    }
}
