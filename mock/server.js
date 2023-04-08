const route = require('koa-route');
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const app = new Koa();

const readJsonFile = (resourceName) => {
  const filePath = path.join(__dirname, `/resources/${resourceName}`);
  return JSON.parse(fs.readFileSync(filePath));
}

app.use(route.get('/enrollments', ctx => {
  ctx.body = readJsonFile('enrollments.json').sort(() => (Math.random()*10 - 5));
}));

app.use(route.get('/grade', ctx => {
  ctx.body = readJsonFile('grades.json');
}));

app.use(route.get('/gradestatistics', ctx => {
  const gradestatistics = readJsonFile('gradestatistics.json');

  if (gradestatistics[ctx.query.courseCode]) {
    ctx.body = gradestatistics[ctx.query.courseCode];
  } else {
    ctx.status = 404;
  }
}));

app.use(route.get('/exam', ctx => {
  const filePath = path.join(__dirname, '/resources/examNotebook.pdf');
  const stats = fs.statSync(filePath); 
  if(stats.isFile()){
    // ctx.set('Content-Type', 'application/octet-stream');
    ctx.set('Content-Disposition', 'attachment; filename=examNotebook.pdf');
    ctx.set('Content-Length', stats.size);
    
    ctx.body = fs.createReadStream(filePath);
  } else {
    ctx.status='404'
  }
}));

app.listen(3030);
console.log('mock server listening on port 3030');
// console.log(__dirname);
const child = child_process.fork(
  'node_modules/react-scripts/bin/react-scripts.js',
  ['start'],
  {stdio: ['ipc', process.stdout, process.stderr]}
);
// child.on('error', (error) => {
//   console.error(error);
// })

// child.stderr.on('data', data => {
//   console.error(data);
// })

// child.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });