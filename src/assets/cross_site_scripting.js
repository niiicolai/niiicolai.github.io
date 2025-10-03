export default {
  header: "Cross Site Scripting (XSS)",
  subheader: "Adding a website to your server",
  published: "2025-10-03",
  modified: "2025-10-03",
  dependencies: [
    { text: 'MySQL Community Edition', color: 'red', url: 'https://www.mysql.com/products/community/' },
    { text: 'express', color: 'green', url: 'https://www.npmjs.com/package/express?activeTab=readme' },
    { text: 'mysql2', color: 'yellow', url: 'https://www.npmjs.com/package/mysql2#installation' },
    { text: 'dotenv', color: 'purple', url: 'https://www.npmjs.com/package/dotenv' },
  ],
  body: `
## What is Cross-Site Scripting (XSS)?

Attackers can exploit XSS vulnerabilities to inject client-side scripts into websites, causing them to execute in other users’ browsers.

These attacks can lead to anything from session hijacking to unauthorized modifications of user data.

The problem occurs when user input is inserted into the DOM without being properly encoded or sanitized. For example, when allowing users to write comments, perform searches, and more.

XSS attacks can be categorized into several types: Stored, Reflected, and DOM-based ([The OWASP Foundation, no date a](https://owasp.org/www-community/Types_of_Cross-Site_Scripting)).

## 1 Insecure Example - Stored
*The following shows an insecure way to display user input on an HTML page.*

The first XSS type, Stored, typically arises when persistent input data are stored on the server, for example, in a database.

To illustrate this attack, begin by creating a database that includes a table for storing comments.
\`\`\`sql
-- Create db
create database xss_db;
-- Create table
create table \`comments\` (
	id INT NOT NULL AUTO_INCREMENT,
    content TEXT NOT NULL,
    PRIMARY KEY (id)
);
-- Add a sample comment.
insert into \`comments\` (content) VALUES ('test');
\`\`\`

After creating the database, add a \`.env\` file to the empty project to store the database credentials:
\`\`\`
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=xss_db
\`\`\`

Note: Be sure to add \`.env\` to \`.gitignore\` to prevent accidentally pushing it to a public repository when using Git.

Next, create a simple HTTP server that includes two routes:
\`\`\`js
import mysql from "mysql2/promise";
import express from "express";
import "dotenv/config";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
});

const page = async () => {
  const [results] = await pool.execute("SELECT * FROM comments");

  return \`
        <html>
            <head><title>Comment</title></head>
            <body>
                <h1>Sample Article</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <h2>Comments:</h2>
                \${results.map((c) => \`<p>\${c.content}</p>\`).join("")}
                <form action="/comment" method="post">
                    <input type="text" name="content" placeholder="Enter comment" />
                    <input type="submit" />
                </form>
            </body>
        </html>
    \`.trim();
};

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const html = await page();
  res.send(html);
});

app.post("/comment", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).send("content is required");

    await pool.execute("INSERT INTO comments (content) VALUES (?)", [content]);
    const html = await page();

    res.send(html);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`);
});
\`\`\`

The first route, \`/\`, returns a simple dynamic HTML document containing a list of comments for a sample article.

The second route, \`/comment\`, is used to create new comments and also returns the dynamic HTML document after processing the submission.

If you examine the HTML in the function \`page()\`, you will notice that user input is inserted by appending a string with the comments:
\`\`\`js
\${results.map((c) => \`<p>\${c.content}</p>\`).join("")}
\`\`\`

The first part, \`results.map((c) => <p>\${c.content}</p>)\`, returns the comments as a list of strings, and \`.join("")\` converts the list into a single string.

The result is a string like \`<p>comment 1</p><p>comment 2</p>\`, depending on the content of the comments.

Now, if you start the server and visit the root path, you will see a simple website with a form where you can submit a comment.

If you add a new comment and press Send, the page will reload with the updated comments.

Try adding the following comments to observe the stored XSS in action:
* \`<style>h1 { color: red; }</style>\` - this will turn the article’s \`<h1>\` header red for everyone who visits the page.
* \`<script>alert("Hello")</script>\` - this will display a pop-up alert with the text "Hello" for everyone who visits the page.

The two examples above are relatively harmless, but imagine if the page used cookies for authorization and someone added a script that exfiltrated the page’s cookies to an external server.

## 2 Insecure Example - Reflective
*The following shows an insecure way to display user input on an HTML page.*

The second type of XSS attack also involves the server, but instead of saving the script, it is injected into the server’s response. For example, this can occur in a search result or an error message.

Let’s rewrite the first example so it returns an article based on an id:
\`\`\`js
import express from "express";

const sampleArticles = [
  { id: 1, title: 'article 1' },
  { id: 2, title: 'article 2' },
];

const html = (id) => {
  const article = sampleArticles.find((a) => a.id == id);
  const articleHtml = article 
    ? \`<p>\${article.title}</p>\` 
    : \`<p>Unable to find article with id: \${id}\`;

  return  \`
        <html>
            <head><title>Article</title></head>
            <body>
                \${articleHtml}
            </body>
        </html>
    \`.trim();
}

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/:id", async (req, res) => {
  res.send(html(req.params.id));
});

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`);
});
\`\`\`

Now the page shows an article’s title when the following URL is visited:
\`\`\`
http://localhost:3000/1
\`\`\`

If the id does not correspond to an article, the page will display an error:
\`\`\`
http://localhost:3000/hello
\`\`\`

However, the page displays a pop-up if you visit the following URL:
\`\`\`
http://localhost:3000/%3Cscript%3Ealert(%22hello%22)%3C%2Fscript%3E
\`\`\`

Note: \`%3C\` = less-than sign, \`%3E\` = greater-than sign, \`%2F\` = slash, and \`%22\` = quotation mark.

The outcome is similar to Example #1, but the script is executed only when the specific link is visited, rather than for all users visiting the page.

## 3 Insecure Example - DOM-based
*The following shows an insecure way to display user input on an HTML page.*

The final example resembles the second one, but here the vulnerability arises from JavaScript dynamically modifying the DOM using user input.

For example, the HTML document may contain a \`<script>\` tag that reads a property from the URL and inserts it into the DOM:
\`\`\`js
import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(\`
        <html>
            <head><title>Welcome</title></head>
            <body>
              <p>Welcome, <span id="name-output"></span></p>
              <script>
                const element = document.getElementById("name-output");
                const name = new URLSearchParams(window.location.search).get("name");
                element.innerHTML = name ? name : "Unknown"; 
              </script>
            </body>
        </html>
    \`.trim());
});

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`);
});
\`\`\`

Now, the page displays "Welcome, user" when the following URL is visited:
\`\`\`
http://localhost:3000/?name=user
\`\`\`

This time, if you add a \`<script>\` tag and visit the URL, nothing will happen:
\`\`\`
http://localhost:3000/?name=%3Cscript%3Ealert(%22hello%22)%3C%2Fscript%3E
\`\`\`

This is because the HTML document has already been parsed, but an attacker may abuse an event to trigger JavaScript using an \`img\` element:
\`\`\`
http://localhost:3000/?name=<img%20src=x%20onerror=alert(%22hello%22)>
\`\`\`

Note: \`%20\` represents a space.

When the image fails to load, the \`onerror\` event is triggered, causing the alert to execute.

## Mitigation
The following section describes how you can mitigate XSS attacks.

### Encoding and Sanitization
The problem in the three examples is that user input is inserted directly into the DOM without any encoding or sanitization.

Input should either be encoded so the browser displays it as text (for example, the less-than sign \`<\` can be encoded as the HTML entity \`&lt;\`) or sanitized to remove malicious parts of the input.

However, there are many pitfalls in attempting to catch every vulnerability; attackers may obfuscate scripts using encodings such as hexadecimal.

You should therefore consider using a library recommended by organizations such as OWASP (Open Web Application Security Project).

For example, OWASP provides a cheat sheet that mentions the library DOMPurify, which can be used for HTML sanitization ([The OWASP Foundation, no date b](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#html-sanitization)). 

For instance, try modifying the last example to:
\`\`\`js
import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(\`
        <html>
            <head><title>Welcome</title></head>
            <body>
              <p>Welcome, <span id="name-output"></span></p>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.7/purify.min.js" integrity="sha512-78KH17QLT5e55GJqP76vutp1D2iAoy06WcYBXB6iBCsmO6wWzx0Qdg8EDpm8mKXv68BcvHOyeeP4wxAL0twJGQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
              <script>
                const element = document.getElementById("name-output");
                const name = new URLSearchParams(window.location.search).get("name");
                const output = DOMPurify.sanitize(name);
                element.innerHTML = output; 
              </script>
            </body>
        </html>
    \`.trim());
});

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`);
});
\`\`\`

The following has been added to load a minified version of DOMPurify from Cloudflare's CDN:
\`\`\`js
<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.7/purify.min.js" integrity="sha512-78KH17QLT5e55GJqP76vutp1D2iAoy06WcYBXB6iBCsmO6wWzx0Qdg8EDpm8mKXv68BcvHOyeeP4wxAL0twJGQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
\`\`\` 

Now, the page will remove malicious parts of user input because we pass it through \`DOMPurify.sanitize()\` before inserting it into the DOM.

For example, try visiting the page with the \`img\` element:
\`\`\`
http://localhost:3000/?name=<img%20src=x%20onerror=alert(%22hello%22)>
\`\`\`

The result is the \`onerror\` event will be removed, and the img element will be rendered as \`<img src=x>\`.

Note: According to DOMPurify's GitHub page, it does not work in legacy browsers such as Internet Explorer. However, the property \`isSupported\` can be used to check whether the browser supports it ([Cure53, no date](https://github.com/cure53/DOMPurify)).

### Safe DOM APIs

Another approach is to use DOM methods like \`.textContent\` rather than \`.innerHTML\`.

\`.textContent\` treats the input as plain text, while \`.innerHTML\` parses it as HTML and inserts DOM elements.

Modify the previous example to use \`.textContent\` instead:
\`\`\`js
import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(\`
        <html>
            <head><title>Welcome</title></head>
            <body>
              <p>Welcome, <span id="name-output"></span></p>
              <script>
                const element = document.getElementById("name-output");
                const name = new URLSearchParams(window.location.search).get("name");
                element.textContent = name; 
              </script>
            </body>
        </html>
    \`.trim());
});

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`);
});
\`\`\`

Visit the page using an \`img\` element to see the result:
\`\`\`
http://localhost:3000/?name=<img%20src=x%20onerror=alert(%22hello%22)>
\`\`\`

Now, the page shows Welcome, \`<img src=x onerror=alert("hello")>\` as text, preventing the img element from executing any script.

### Content Security Policy

Another mitigation technique is CSP, which controls what resources a webpage is permitted to load.

For instance, CSP can restrict JavaScript or CSS to specific domains and prevent inline scripts from executing.

You can set the policy via a \`<meta>\` tag in the HTML or in the HTTP response headers.

Next, we will add CSP to the earlier example to block all inline scripts and event handlers:
\`\`\`js
import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const { name } = req.query;

  res.send(\`
        <html>
            <head>
              <title>Welcome</title>
              <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self';">
            </head>
            <body>
              <p>Welcome, \${name ? name : 'No name'}</p>
            </body>
        </html>
    \`.trim());
});

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`);
});
\`\`\`

The provided Content Security Policy (CSP) contains two directives: \`default-src\` and \`script-src\`, both of which are set to 'self'.

The \`default-src\` directive defines the default source policy. In this case, 'self' means that only resources from the same origin are allowed.

The \`script-src\` directive specifies the permitted script sources, which are also set to 'self'. In addition, it blocks inline scripts and event handlers from being executed.

If you ever need inline scripts, you can use a nonce or a hash to allow specific scripts or tags. 

For more details on Content Security Policy directives, I recommend visiting [developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy).

Now, visiting the following link causes the page to display an error message:
\`\`\`
http://localhost:3000/?name=%3Cimg%20src=x%20onerror=alert(%22hello%22)%3E
\`\`\`

The browser's console will display an error message like this:
\`\`\`
Refused to execute inline event handler because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.
\`\`\`

### Frameworks
Another mitigation is to use a framework for developing the website, as they often provide built-in protections that help you avoid XSS vulnerabilities.

For example, you can create a new React application using Vite:
\`\`\`bash
cd Desktop/

npm create vite@latest

Need to install the following packages:
create-vite@8.0.2
Ok to proceed? (y) y

> npx
> create-vite

│
◇  Project name:
│  test
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript
│
◇  Use rolldown-vite (Experimental)?:
│  No
│
◇  Install with npm and start now?
│  Yes
│
◇  Scaffolding project in C:\\Users\\username\\Desktop\\test...
│
◇  Installing dependencies with npm...
⠧
\`\`\`

Then, update \`./src/App.tsx\` as follows:
\`\`\`js
function App() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const name = urlSearchParams.get("name");

  return (
    <p>
      Welcome, {name}!
    </p>
  )
}

export default App;
\`\`\`

Finally, try visiting the page and injecting a \`script\` or \`img\` tag:
\`\`\`
http://localhost:5173/?name=%3Cscript%3Ealert(%22hello%22)%3C%2Fscript%3E
http://localhost:5173/?name=%3Cimg%20src=x%20onerror=alert(%22hello%22)%3E
\`\`\`

You will see the page behave similarly to the example that uses the safe DOM API (\`.textContent\`); it will output the injection as plain text, e.g. \`Welcome, <img src=x onerror=alert("hello")>!\`.

However, although the example above outputs the name as text, you should be aware that it is possible to inject input into the DOM if attributes such as \`dangerouslySetInnerHTML\` are used. For example:
\`\`\`
<span dangerouslySetInnerHTML={{ __html: name as any }} />
\`\`\`
This will leave the page open to XSS attacks if the \`name\` is not encoded or sanitized as shown in earlier examples.

## Final Thoughts

As discussed in the mitigation section, there are multiple ways to strengthen your defense against XSS, from proper HTML sanitization to enforcing security headers like CSP.

These measures are just part of a broader strategy. You should also consider additional headers such as \`X-Content-Type-Options\`, \`Referrer-Policy\`, and \`Permissions-Policy\`. 

Further, if your site uses cookies, enabling the \`HttpOnly\` flag provides extra protection against attacks.

Finally, as illustrated in the section about frameworks, developing your website using a framework can help you avoid mistakes that are easy to make when building self-rolled solutions.

## References
The OWASP Foundation (No date a) Types of XSS | OWASP Foundation. Available at: [https://owasp.org/www-community/Types_of_Cross-Site_Scripting](https://owasp.org/www-community/Types_of_Cross-Site_Scripting) (visited 10/03/2025).

The OWASP Foundation (No date b) HTML Sanitization. Cross Site Scripting Prevention - OWASP Cheat Sheet Series. Available at: [https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#html-sanitization](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#html-sanitization) (visited 10/03/2025).

Cure53 (No date) DOMPurify - a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG. DOMPurify works with a secure default, but offers a lot of configurability and hooks. [https://github.com/cure53/DOMPurify](https://github.com/cure53/DOMPurify) (visited 10/03/2025).
`,
};
