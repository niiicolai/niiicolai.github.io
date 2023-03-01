import './Post.css';

function Post(props) {

    return (
        <a href={props.post.post_url} target='_blank' className='Post-a'>
            <section className='Post'>
                <header>
                    <h2>{props.post.title}</h2>
                </header>

                <img src={props.post.image_url} alt='post image' />

                <footer>
                    <small>{props.post.created}</small>                    
                    <small>Medium</small>
                </footer>
            </section>
        </a>
    );
}

export default Post;