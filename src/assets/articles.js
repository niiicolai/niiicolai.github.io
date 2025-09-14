export default [
  {
    header: "Command Injection",
    subheader: "Developing an API for IP Ping Requests",
    published: "2025-09-15",
    modified: "2025-09-15",
    body: `
## What is Command Injection?
Command injection can allow unauthorized users to execute commands on your server.

The problem arises when a command is invoked where the user can insert unsanitized input.

That unfiltered input may contain unintended command calls, which can give the user access to sensitive information on your server.

## Example
*The following shows an insecure way of implementing shell execution in Node.js.*

Imagine setting up an endpoint with Express.js in Node.js that allows the user to send input to an \`exec\` function call from Node's \`child_process\` module:

\`\`\`js 

import { exec } from 'node:child_process'
import os from "node:os";
import express from 'express'

// Ensure cross-platform support.
// Specify message count:
// win32 = -n 4
// other = -c 4
const platform = os.platform();
const options = \`\${platform === "win32" ? "-n" : "-c"} 4\`;

const app = express()
const port = 3000

app.use(express.json())

app.post('/ping', (req, res) => {
  const { ip } = req.body
  exec(\`ping \${options} \${ip}\`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(\`Error: \${stderr}\`)
    }
    res.send(\`\${stdout}\`)
  })
})

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`)
})
\`\`\`

If you send the following HTTP request using \`curl\`:
\`\`\`bash
curl -H 'Content-Type: application/json' \\
      -d '{ "ip":"127.0.0.1"}' \\
      -X POST \\
      http://localhost:3000/ping
\`\`\`

You’ll get a response back with details about the ICMP messages that were sent:
\`\`\`

Pinging 127.0.0.1 with 32 bytes of data:
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128

Ping statistics for 127.0.0.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms
\`\`\`

By utilizing shell expansion, you can add additional system calls to the request.

For example, in Microsoft Windows Command Prompt an ampersand (&) can be used to chain commands. Suppose the server had a system variable called JWT_SECRET and you sent the following HTTP request:
\`\`\`bash
curl -H 'Content-Type: application/json' \\
      -d '{ "ip":"127.0.0.1 & echo %JWT_SECRET%"}' \\
      -X POST \\
      http://localhost:3000/ping
\`\`\`

By adding \`& echo %JWT_SECRET%\`, we tell the server to also print the value of the system variable \`JWT_SECRET\`, if it exists.

Note that the syntax \`echo %VARIABLE%\` is specific to Microsoft Windows Command Prompt and differs depending on which shell is used.

The response would then include both the ICMP details and the value of the system variable:
\`\`\`

Pinging 127.0.0.1 with 32 bytes of data:
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128

Ping statistics for 127.0.0.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms
MY_SUPER_SECRET_JWT_VALUE
\`\`\`

## Mitigation

How can you prevent command injection? The sections below outline three strategies to secure the example above.

### Input validation

The first problem in the insecure example is that the user’s input is not validated, which allows the user to send whatever they like.

Instead, you should check whether the user’s input is a valid IP address before executing ping.

For this, you can use the \`isIP(string)\` function from Node’s \`net\` module.

The function returns a number: 4 and 6 indicate the IP version, and 0 indicates it is not an IP address ([OpenJS Foundation, no date b](https://nodejs.org/api/net.html#netisipinput)). 

See the example below:
\`\`\`js

import net from "node:net";

console.log(net.isIP("127.0.0.1")) // => 4
console.log(net.isIP("::1")) // => 6
console.log(net.isIP("127.0.0.1 & echo %path%")) // => 0
\`\`\`

### Avoid shell interpretation

Another problem in the insecure example is that the \`exec\` function is used, where the user’s input is inserted directly into a string.

Instead, you can use the \`spawn\` function where the command arguments are passed as a separate argument.

Note: you should avoid passing \`{ shell: true }\` because it enables shell expansion demonstrated in the first example ([OpenJS Foundation, no date a](https://nodejs.org/api/child_process.html)).

See the example below:
\`\`\`js

import { spawn } from "node:child_process";
import os from "node:os";

const result = { output: "", error: "" };
const args =  [
  os.platform() === "win32" ? "-n" : "-c",
  "4",
  "127.0.0.1"
];
const ping = spawn("ping", args);

ping.stdout.on(
  "data",
  (data) => (result.output += data.toString())
);

ping.stderr.on(
  "data",
  (data) => (result.error += data.toString())
);

ping.on("close", (code) => {
  if (code !== 0) {
    console.log(result.error);
    return;
  }

  console.log(result.output);
});
\`\`\`

The final \`console.log\` returns the same ping response as when \`exec\` was used in the first example:
\`\`\`bash

Pinging 127.0.0.1 with 32 bytes of data:
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128

Ping statistics for 127.0.0.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms
\`\`\`

### Structure the output

An additional guardrail is to return a parsed response instead of the raw stdout content.

This approach ensures you control the output instead of relying on whatever comes from executing \`spawn\`.

For example, you could return an object with properties such as \`sent\`, \`received\`, \`lost\`:

\`\`\`js

import { spawn } from "node:child_process";
import os from "node:os";

const platform = os.platform();

function parsePingResult(output) {
  const result = { sent: 0, received: 0, lost: 0 };

  if (platform === "win32") {
    const match = output.match(/Sent = (\\d+), Received = (\\d+), Lost = (\\d+)/);
    if (match) {
      result.sent = parseInt(match[1], 10);
      result.received = parseInt(match[2], 10);
      result.lost = parseInt(match[3], 10);
    }
  } else {
    const match = output.match(
      /(\\d+) packets transmitted, (\\d+) received, (\\d+)% packet loss/
    );
    if (match) {
      result.sent = parseInt(match[1], 10);
      result.received = parseInt(match[2], 10);
      result.lost = result.sent - result.received;
    }
  }

  return result;
}

const result = { output: "", error: "" };
const args =  [
  platform === "win32" ? "-n" : "-c",
  "4",
  "127.0.0.1"
];
const ping = spawn("ping", args);

ping.stdout.on(
  "data",
  (data) => (result.output += data.toString())
);

ping.stderr.on(
  "data",
  (data) => (result.error += data.toString())
);

ping.on("close", (code) => {
  if (code !== 0) {
    console.log(result.error);
    return;
  }

  const parsedResult = parsePingResult(result.output);

  console.log(parsedResult);
});
\`\`\`

In the example, a helper method \`parsePingResult\` is added and used to parse a predefined format of the result.

The parsed result is \`{ sent: 4, received: 4, lost: 0 }\`.

### Full mitigation example

Combining the three mitigation strategies and applying them to the insecure example gives the following result:
\`\`\`js

import { spawn } from "node:child_process";
import net from "node:net";
import os from "node:os";
import express from "express";

const platform = os.platform();

function parsePingResult(output) {
  const result = { sent: 0, received: 0, lost: 0 };

  if (platform === "win32") {
    const match = output.match(/Sent = (\\d+), Received = (\\d+), Lost = (\\d+)/);
    if (match) {
      result.sent = parseInt(match[1], 10);
      result.received = parseInt(match[2], 10);
      result.lost = parseInt(match[3], 10);
    }
  } else {
    const match = output.match(
      /(\\d+) packets transmitted, (\\d+) received, (\\d+)% packet loss/
    );
    if (match) {
      result.sent = parseInt(match[1], 10);
      result.received = parseInt(match[2], 10);
      result.lost = result.sent - result.received;
    }
  }

  return result;
}

const app = express()
const port = 3000

app.use(express.json())

app.post('/ping', (req, res) => {
  const { ip } = req.body;

  // Step 1. Validate the user input
  if (!net.isIP(ip)) {
    return res.status(400).send("The provided ip is not a valid IP");
  }

  const result = { output: "", error: "" };
  const args =  [
    platform === "win32" ? "-n" : "-c",
    "4",
    ip
  ];

  // Step 2. Use spawn
  const ping = spawn("ping", args, {
    timeout: 10000,
  });

  ping.stdout.on(
    "data",
    (data) => (result.output += data.toString())
  );

  ping.stderr.on(
    "data",
    (data) => (result.error += data.toString())
  );

  ping.on("close", (code) => {
    if (code !== 0) {
      console.log(result.error);
      return res.status(500).send("Internal Server Error");
    }

    // Step 3. Return a parsed result
    res.send(parsePingResult(result.output));
  });
})

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`)
})
\`\`\`

Now you’ll get an error message if you try to execute the HTTP request from the first example:
\`\`\`bash
curl -H 'Content-Type: application/json' \\
      -d '{ "ip":"127.0.0.1 & echo %JWT_SECRET%"}' \\
      -X POST \\
      http://localhost:3000/ping

The provided ip is not a valid IP
\`\`\`

If you send the request with a valid IP, you will get the parsed response:
\`\`\`bash
curl -H 'Content-Type: application/json' \\
      -d '{ "ip":"127.0.0.1"}' \\
      -X POST \\
      http://localhost:3000/ping

{"sent":4,"received":4,"lost":0}
\`\`\`

### Further Restrictions

Depending on the use case, you may want to add additional restrictions to prevent harmful commands from being executed on your server.

For example, you could consider restricting the user's privileges or running the commands within a sandbox environment to isolate their effects.

## References

OpenJS Foundation (no date a) Child process | Node.js v24.8.0 documentation. Available at: [https://nodejs.org/api/child_process.html](https://nodejs.org/api/child_process.html) (visited 09/15/2025).

OpenJS Foundation (no date b) Net | Node.js v24.8.0 documentation. Available at: [https://nodejs.org/api/net.html#netisipinput](https://nodejs.org/api/net.html#netisipinput) (visited 09/15/2025).

`,
  },
 
];
