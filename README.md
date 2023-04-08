# University Grades Application

## Preview

### Desktop Mode
![image](https://waic0083.github.io/static/images/desktop.png)
### Mobile Mode
![image](https://waic0083.github.io/static/images/mobile.png)

## Assumptions
1. This is an application for students
2. Student information including student ID, semesters already exist while user launch this page
3. for "/enrollments" endpoint, if courseCode been omitted in request parameters. the endpoint will retrive all enrolled courses against the current student.
4. for "/grades" endpoint, if courseCode been omitted in request parameters. the endpoint will retrive all enrolled courses against the current student.

## Technologies Used
 - React + Redux + Saga
 - UI library: Ant Design
 - Create React App
## Steps for checking demo on live (Node.js required)
1. install dependencies: npm install
2. start up dev mode with mock server: npm run dev
3. launch link (http://localhost:3000) in your browser

## Guidance
![image](https://waic0083.github.io/static/images/UI.png)

## Best Practices
1. Pure function to reduce side effects
2. Currying to reduce boilerplate code
3. Samll size component
4. No magic string
5. Responsive UI
6. Testable side effects by Saga