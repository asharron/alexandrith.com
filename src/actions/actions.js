export const PULL_POSTS = "PULL_POSTS";

export function pullPosts(posts) {
    return { type: PULL_POSTS, posts }
}