export default {
  header: "SQL Injection",
  subheader: "An API for your blog posts",
  published: "2025-09-22",
  modified: "2025-09-22",
  dependencies: [
    { text: 'MySQL Community Edition', color: 'red', url: 'https://www.mysql.com/products/community/' },
    { text: 'express', color: 'green', url: 'https://www.npmjs.com/package/express?activeTab=readme' },
    { text: 'mysql2', color: 'yellow', url: 'https://www.npmjs.com/package/mysql2#installation' },
    { text: 'dotenv', color: 'purple', url: 'https://www.npmjs.com/package/dotenv' },
  ],
  body: `
## What is SQL Injection?
An attacker can use SQL injection to execute SQL queries against your database.

Consequences range from unauthorized authentication bypass to data theft and, in extreme cases, database deletion.

This vulnerability usually occurs when user input is inserted directly into a query.

## #1 Insecure Example 
*The following shows an insecure way to fetch records from a MySQL database in Node.js.*

Suppose you are building an API to fetch posts stored in a MySQL database.

The database might contain a single table called \`posts\` with four columns:
- **id** — the primary key  
- **title** — the post’s title  
- **body** — the post’s content  
- **published** — a flag indicating whether the post is published (0 = private, 1 = public)

To create the database, use the following SQL:
\`\`\`sql
-- CREATE DB
create database sql_injection_example_db;
-- SELECT DB
use sql_injection_example_db;
-- CREATE TABLE
create table \`posts\` (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    published INT NOT NULL DEFAULT 0,
    PRIMARY KEY (PostId)
);
\`\`\`

Additionally, add a single post for testing purposes:
\`\`\`sql
-- INSERT SAMPLE POST
insert into \`posts\` (title, body, published) VALUES ('test', 'test', 0);
\`\`\`

Add a file called \`.env\` to the project, and ensure that \`.env\` is included in a \`.gitignore\` file if you are using Git for version control. This will prevent you from committing the \`.env\` file to a public repository.

The \`.env\` file is used to keep the credentials for connecting to the MySQL database separate from the JavaScript code.

See the example below:
\`\`\`
MYSQL_HOST=localhost
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=sql_injection_example_db
\`\`\`

Next, create a GET endpoint \`/post\` that allows the user to specify a title and retrieve the corresponding post.

However, the user is only allowed to see posts that are published, so you add \`AND published = 1\`:
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

const app = express();
const port = 3000;

app.use(express.json());

app.get("/post", async (req, res) => {
  const { title } = req.query;

  try {
    const sql = \`SELECT * FROM posts WHERE title = '\${title}' AND published = 1\`;
    const [results] = await pool.query(sql);

    res.send(results);
  } catch (err) {
    res.status(500).send(\`Error: \${err}\`);
  }
});

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`)
});
\`\`\`

If we start the server and send the following HTTP request using \`curl\`, the response should be an empty array because the post’s \`published\` flag is set to \`0\`:
\`\`\`bash
curl -X GET http://localhost:3000/post?title=test
[]
\`\`\`

However, if we add \`'; -- \`, the original SQL query \`SELECT * FROM posts WHERE title = '' AND published = 1\` becomes \`SELECT * FROM posts WHERE title = 'test'; -- ' AND published = 1\`, and the response returns the sample post:

\`\`\`bash
curl -X GET http://localhost:3000/post?title=test\\'%3B%20--%20
[{"Postid":1,"title":"test","body":"test","published":0}]
\`\`\`

Note: The expression \`'; -- \` is added to the URL as \`\\'%3B%20--%20\` because characters such as spaces must be escaped before being included in a URL (e.g., \`%3B = ;\`, \`%20 = space\`).

By adding \`';\` we close the SQL statement, and by adding \` -- \` we comment out the rest of the statement.

You might ask: What if we rearranged the original SQL statement to \`SELECT * FROM posts WHERE published = 1 AND title = 'test'\`, so that \`published = 1\` comes before the title? The answer is that it is still possible to bypass the check by adding \`' OR published = 0; -- \`, which makes the statement: \`SELECT * FROM posts WHERE published = 1 AND title = 'test' OR published = 0; -- '\`.

## #2 Insecure Example
*The following shows another insecure way to fetch records from a MySQL database in Node.js.*

Another question might be: What if we added an additional SQL statement after the SELECT statement, something more destructive like \`DROP DATABASE sql_injection_example_db;\`?

Let’s run the following example, where the SQL string contains multiple SQL statements:
\`\`\`js
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
});

const sql = \`
SELECT * FROM posts WHERE title = 'test' AND published = 0;
SELECT * FROM posts WHERE title = 'test' AND published = 0;
\`;
const [results] = await pool.query(sql);
console.log(results);
\`\`\`

The result outputs a parsing error:
\`\`\`bash
Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'SELECT * FROM posts WHERE title = 'test' AND published = 0' at line 2
    at PromisePool.query (C:\Users\niiic\Desktop\insecure-app\node_modules\mysql2\lib\promise\pool.js:36:22)
    at file:///C:/insecure-app/src/sql_injection.js:36:30
    at ModuleJob.run (node:internal/modules/esm/module_job:234:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:473:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:123:5) {
  code: 'ER_PARSE_ERROR',
  errno: 1064,
  sql: '\n' +
    "SELECT * FROM posts WHERE title = 'test' AND published = 0;\n" +
    "SELECT * FROM posts WHERE title = 'test' AND published = 0;\n",
  sqlState: '42000',
  sqlMessage: "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'SELECT * FROM posts WHERE title = 'test' AND published = 0' at line 2"
}
\`\`\`

Next, add the property \`multipleStatements: true\` to the \`pool\` object and execute the code again:
\`\`\`js
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
  multipleStatements: true,
});

const sql = \`
SELECT * FROM posts WHERE title = 'test' AND published = 0;
SELECT * FROM posts WHERE title = 'test' AND published = 0;
\`;
const [results] = await pool.query(sql);
console.log(results);
\`\`\`

As you can see below, the code outputs the result of multiple SQL statements:
\`\`\`bash
[
  [ { Postid: 1, title: 'test', body: 'test', published: 0 } ],
  [ { Postid: 1, title: 'test', body: 'test', published: 0 } ]
]
\`\`\`

What you should notice is \`mysql2\` prevents you by default from executing multiple SQL statements when using the \`query\` function.

You **must** be very careful when allowing multiple SQL statements. The following example shows the danger of allowing the option.

Configure #1 example to allow multiple SQL statements:
\`\`\`js
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
  multipleStatements: true,
});

const app = express();
const port = 3000;

app.use(express.json());

app.get("/post", async (req, res) => {
  const { title } = req.query;

  try {
    const sql = \`SELECT * FROM posts WHERE title = '\${title}' AND published = 1\`;
    const [results] = await pool.query(sql);

    res.send(results);
  } catch (err) {
    res.status(500).send(\`Error: \${err}\`);
  }
});

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`)
});
\`\`\`

First, a quick test HTTP request should return an empty array: 
\`\`\`bash
curl -X GET http://localhost:3000/post?title=test
[]
\`\`\`

Next, add \`'; DROP TABLE sql_injection_example_db; -- \` to the HTTP request, and the response contains details about both the SELECT and DROP statements:

\`\`\`bash
curl -X GET http://localhost:3000/post?title=test\\'%3BDROP%20DATABASE%20sql_injection_example_db%3B%20--%20
[[{"Postid":1,"title":"test","body":"test","published":0}],{"fieldCount":0,"affectedRows":1,"insertId":0,"info":"","serverStatus":16650,"warningStatus":0,"stateChanges":{"systemVariables":{},"schema":"","gtids":[],"trackStateChange":null},"changedRows":0},{"fieldCount":0,"affectedRows":0,"insertId":0,"info":"","serverStatus":2,"warningStatus":0,"changedRows":0}]
\`\`\`

Finally, try the first HTTP request again, and you will see a devastating error indicating that no database is selected:
\`\`\`bash
curl -X GET http://localhost:3000/post?title=test
Error: Error: No database selected
\`\`\`

The reason is that the database no longer exists, and with it, all your data. The second example clearly shows how improper configuration and handling can lead to devastating results.

## Mitigation
Luckily, SQL injection can be prevented relatively easily with proper configuration.

The following section describes mitigation strategies to avoid it.

### Prepared Statements
When reading the \`mysql2\` documentation, you may have noticed a feature called Prepared Statements. 

Prepared statements help separate the SQL query from the data.

So, instead of using \`pool.query(sql)\`, you replace \`query\` with \`execute\`, replace string interpolation with placeholder values, and pass the input values as an array:
\`\`\`js

const sql = \`SELECT * FROM posts WHERE title = ? AND published = 0\`;
const [results] = await pool.execute(sql, ['test']);
console.log(results) // => [ { Postid: 1, title: 'test', body: 'test', published: 0 } ]
\`\`\`

If you try to use the \`query\` function instead of the \`execute\` function with placeholder values, you will probably notice that the function also supports separation of SQL and values, so you might ask: why use \`execute\` over \`query\`?

According to an answer given by the author of the \`mysql2\` package, \`execute\` separates query and data and sends them in two steps, while \`query\` merges them into a single string sent to the server ([Sidorares, 2022](https://github.com/sidorares/node-mysql2/discussions/1601#discussioncomment-3311993)).

### Prevent Exposing Raw Error Messages

The first example returns a raw error if anything goes wrong while fetching a post with a specific title. This is not good practice because it allows an attacker to verify whether the endpoint validates malicious requests.

For example, if we add \`\\'\` after \`test\` in the HTTP request from the example, the response includes an error revealing that a SQL syntax error occurred:
\`\`\`bash
url -X GET http://localhost:3000/post?title=test\\'

Error: Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''test'' AND published = 1' at line 1
\`\`\`

A better approach is to return an internal server error when the server encounters an unhandled error, and to return a bad request if the title is missing:
\`\`\`js
app.get("/post", async (req, res) => {
  const { title } = req.query;

  if (!title) return res.status(400).send('title is required');

  try {
    const sql = \`SELECT * FROM posts WHERE title = ? AND published = 1\`;
    const [results] = await pool.execute(sql, [title]);

    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});
\`\`\`

This prevents any sensitive information from being sent to a potential attacker and helps the user send the request correctly.

If we retry the HTTP request, the response now includes an error message stating that the title is required:
\`\`\`bash
curl -X GET http://localhost:3000/post?title=

title is required
\`\`\`

In case of any errors, the response will be an Internal Server Error.

### Database User
Another way to avoid the execution of unwanted queries is to control the privileges of the MySQL user.

MySQL provides several options for restricting access to operations. For example, you can configure SELECT or INSERT access for a specific table.

Another option is to create a stored procedure and only grant the user execution access to it.

The following show how to implement a stored procedure that only allow published posts to be returned:
\`\`\`sql
DELIMITER //
CREATE PROCEDURE get_published_post_by_title(
    IN p_title VARCHAR(255)
)
BEGIN
    SELECT title, body
    FROM posts
    WHERE title = p_title AND published = 1;
END //
DELIMITER ;
\`\`\`

Add a published post and use \`CALL\` to execute the stored procedure:
\`\`\`sql
insert into \`posts\` (title, body, published) VALUES ('test2', 'test2', 1);

CALL get_published_post_by_title('test2');
-- title: test2, body: test2
\`\`\`

Now, let's create a new MySQL user who can only execute the stored procedure:
\`\`\`sql
CREATE USER 'limited_user'@'localhost' IDENTIFIED BY 'strongpassword';
GRANT EXECUTE ON PROCEDURE sql_injection_example_db.get_published_post_by_title TO 'limited_user'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

The first line creates the user. The username is \`limited_user\`, it can connect from \`localhost\`, and the password is \`strongpassword\`.

The second line grants execution privileges on the database \`sql_injection_example_db\` and the stored procedure \`get_published_post_by_title\` to the new user.

Finally, the \`FLUSH PRIVILEGES\` statement is executed to reload privileges.

Now, if you try to log in using the new user, you will see that you only have access to execute the \`get_published_post_by_title\` stored procedure.

To use this user in the JavaScript application, add the credentials to the \`.env\` file:
\`\`\`
MYSQL_HOST=localhost
MYSQL_USER=limited_user
MYSQL_PASSWORD=strongpassword
MYSQL_DATABASE=sql_injection_example_db
\`\`\`

Finally, we update the endpoint to execute the stored procedure instead of the SQL query:
\`\`\`js
app.get("/post", async (req, res) => {
  const { title } = req.query;

  if (!title) return res.status(400).send('title is required');

  try {
    const [results] = await pool.execute('CALL get_published_post_by_title(?)', [title]);

    res.send(results[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});
\`\`\`

Lastly, executing the HTTP request again will return the previously added published post:
\`\`\`bash
curl -X GET http://localhost:3000/post?title=test2
[{"title":"test2","body":"test2"}]
\`\`\`

### Return Only Specific Fields

While the following approach doesn't prevent SQL injection, it can be a good practice only to return the specific fields the user is allowed to read.

For example, a post may have another column with sentitive information we don't want to expose to the user. 

#1 example currently returns all fields by using an asterisk (*), however it would be better to replace the asterisk with \`title, body\`:
\`\`\`js
const sql = \`SELECT title, body FROM posts WHERE title = ? AND published = 0\`;
const [results] = await pool.execute(sql, ['test']);
console.log(results) // => [ { title: 'test', body: 'test' } ]
\`\`\`

### Full mitigation example

Finally, putting all the mitigation strategies together produces the following result:
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

const app = express();
const port = 3000;

app.use(express.json());

app.get("/post", async (req, res) => {
  const { title } = req.query;

  if (!title) return res.status(400).send('title is required');

  try {
    const [results] = await pool.execute('CALL get_published_post_by_title(?)', [title]);

    res.send(results[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`)
});
\`\`\`

## References

Sidorares (2022) Query vs Execute. sidorares/node-mysql2 · Discussions · GitHub. Available at: [https://github.com/sidorares/node-mysql2/discussions/1601#discussioncomment-3290262](https://github.com/sidorares/node-mysql2/discussions/1601#discussioncomment-3290262) (visited 09/21/2025).

`,
};
