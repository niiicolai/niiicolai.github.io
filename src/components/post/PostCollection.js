import Post from "./Post";
import Posts from './Posts.json';

import "./PostCollection.css";

function PostCollection() {
    const posts = Posts;

    return (
      <div className="Post-Collection">
        {posts.map(function(post, index) {
            return <Post key={index} post={post} />
        })}
      </div>
    );
  }
  
  export default PostCollection;