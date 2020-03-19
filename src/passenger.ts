import { exec, execSync } from 'child_process';
import { createServer } from 'http';

const stoppedResult = execSync("node_modules/forever/bin/forever stopall");
console.log(`result: ${stoppedResult.toString()}`);

exec("node_modules/forever/bin/forever start build/index.js", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Backend Test');
});

server.listen(() => {
  console.log(`Server running...`);
});