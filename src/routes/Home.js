import Profile from "../components/profile/Profile";
import PostCollection from "../components/post/PostCollection";

import './Home.css';

function Home() {
    
    return (
        <div className="Home">
            <div className="item">
                <div className="fixed">
                    <Profile />
                </div>
            </div>
            <div className="item">
                <PostCollection />
            </div>            
        </div>
    );
}

export default Home;