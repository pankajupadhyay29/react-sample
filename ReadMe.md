# Student Performance Report
With this application a teacher can enter a list of student names along with his or her test score on a page and can see a summary of the class’ performance on a test. The summary shows the min, max, and average grade.

## Prerequisite
* You must have node
* You must have a modern browser with JavaScript enabled
* You should have port 8080 available
* if not available please update port in package.json by updating `script > test` as `webpack && http-server -p 8081 -o http://localhost:8081`

## How to run application
* Unzip the code
* Go to CMD/Terminal (cd to the code directory)
* Run `npm install`
* Then run `npm start`
* It will open the application in your default browser
* In case it doesn't open please open http://localhost:8080 in your browser

# How to run test cases
* Go to CMD/Terminal (cd to the code directory)
* Run `npm test`

# About Code
* This application is created using React and Redux (although this is very small application and redux is counter production for this but for complex enterprise application redux is very helpful)
* Storing data in localStorage
* Service is created and Observable are used there just to simulate actual REST service behavior
* Test is written using Mocha and Enzyme
* For component test case two approaches are followed
* In first approach direct component is being tested by providing all the props instead of testing connected component
* In second approach connected component is being tested by wrapping it in `Provider` and padding actual store
* First approach is recommended
