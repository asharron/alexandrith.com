import React, { Component } from 'react';
import { connect } from 'react-redux'
import { pullPosts } from '../actions/actions';
import Post from '../components/Post';

//Fetch and dispatch blog posts
//TODO: Pass down to children and make this component be strictly a container
const queryGrabPosts = (dispatch) => {
        fetch('http://alexandrith.com:90/index.php/wp-json/wp/v2/posts').then((res) => {
            return res.json();
        }).then((body) => {
            dispatch(pullPosts(body));
        }).catch((err) => {
            console.log(err);
        });
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       grabPosts: () => queryGrabPosts(dispatch) 
    }
}

class Feed extends Component {

    componentWillMount() {
        this.props.grabPosts();
    }

    render() {
        return (
            <div>
                {this.props.posts.map((post, index) => {
                    return <Post key={index} title={post.title.rendered} content={post.content.rendered}/>;
                })}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);