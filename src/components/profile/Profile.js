import "./Profile.css"

function Profile(props) {

    return (
        <div className="Profile">
            <header className="header">
                
                <div>
                    <img src="/selfie.jpeg" alt="Profile image" />
                </div>
                <div>
                    <small>WHO</small>
                    <strong>Nicolai Berg Andersen</strong>
                </div>
                <div>
                    <small>LOCATED</small>
                    <strong>Copenhagen, Denmark</strong>
                </div>
            </header>

            <section>
                <header>
                    <small>WEB DEVELOPMENT</small>
                </header>
                <div>
                    <p>I have experience working with several programming languages such as Python, Ruby, C#, Java, and Javascript, as well as a variety of libraries and frameworks such as Ruby on Rails, Sinatra, Spring Boot, Flask, OpenCV, JQuery, Typescript, React, and databases such as MySQL, PostgreSQL, SQLite, and Microsoft SQL.</p>
                </div>
            </section>

            <section>
                <header>
                    <small>GAME DEVELOPMENT</small>
                </header>
                <div>
                    <p>
                        I have garnered extensive experience in mobile game development for both IOS and Android platforms since 2021 while working independently. My most recent game, <a href="https://c7pixel.com/lemonade_shop" target="_blank">Lemonade Shop</a>, has received over 20,000 downloads. Furthermore, I have developed several lesser-known games before Lemonade Shop. My skill set encompasses various facets of game development, including 3D modeling, animation, programming, among others.
                    </p>
                </div>
            </section>

            <section>
                <header>
                    <small>TECH WRITER</small>
                </header>
                <div>
                    <p>
                        As a tech writer, my job is to stay up-to-date with the latest technologies and trends in the industry. I enjoy researching and learning about new technologies and writing about them in a way that is both informative and accessible to readers of all levels.
                        In my free time, I enjoy exploring new programming languages, libraries, and frameworks, and tinkering with personal coding projects. Overall, my passion for technology and writing has led me to pursue a career as a tech writer, and I am excited to continue exploring and sharing my knowledge with others.
                    </p>
                </div>
            </section>

            <section>
                <header>
                    <small>CONNECT WITH ME</small>
                </header>
                <div className="social-links">
                    <a href="mailto:niiicolai@gmail.com"><i className="fa-solid fa-at"></i></a>
                    <a href="https://twitter.com/NiicoBerg" target="_blank"><i className="fa-brands fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/in/nicolai-berg-andersen-ab1279b3/" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a>                    
                    <a href="https://github.com/niiicolai" target="_blank"><i className="fa-brands fa-github"></i></a>
                    <a href="https://www.youtube.com/channel/UCrOOui6OMX1WVrh7jzuc5Sw" target="_blank"><i className="fa-brands fa-youtube"></i></a>
                </div>
            </section>
        </div>
    );
}

export default Profile;