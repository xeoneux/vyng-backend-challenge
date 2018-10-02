Vyng Backend Challenge
=

Vyng is a video ringtone application where users can create channels and use them as ringtones for when people call them.

Using MongoDB v3.x (or Postgres v10.x), NodeJS LTS+, Express v4.x, and the hosting of your choice, create a RESTful API server which allows users to do the following:

1. Create channels with a unique name
1. Get their channels
1. Create and add a video entry to a channel.

### Models

Channel model must include at a minimum:
* Unique ID
* Name
* Owner referencing a user id

Video model must include at a minimum:
* Unique ID
* URL
* Channel referencing a channel id

User model must include at a minimum:
* Unique ID
* Name

### Unit Tests
All of the APIs should have unit test coverage where `npm test` should test your package. We recommend [jest](https://github.com/facebook/jest), but other frameworks will work.

### Criteria
Your work will be evaluated primarily on:
* How much of the task was completed. We ask that you do not spend more than 6 hours total.
* Code style and consistency. We use the [Airbnb styleguide](https://github.com/airbnb/javascript).
* Idiomatic use of NodeJS, Express, ES6+, and utility libraries such as [lodash](https://github.com/lodash/lodash)
* Correct and consistent use of promises, async/await, and error handling
* Avoidance of callback hell
* Proper and efficient queries
* Correct unit tests with close to or at 100% coverage
* Documentation, prioritization of tasks, quality of code, and other technical communication

### Restrictions
Do not use code generation frameworks, boilerplates, or work from other projects, including your own.

### Hosting
You'll need to make the API available on a server. There are low cost and free options such as Heroku and mLab. Please let us know if you have trouble hosting your project.

### Submission
Fork this project. When finished, send the URL to your fork and the URL of your running instance of the API to us. **DO NOT PUT ANY KEYS IN YOUR REPOSITORY**

### Extra Credit
If you have extra time and want to show off extra skill, then you may spend no more than 2 additional hours on:
* Create a simple front end (preferably React) to test your backend.
* Integration Test Runner
* Indicate next steps and ideas on: optimizations, micro-services, scale/high availability, company management of data, realtime stats, analytics, etc.
* Anything else you feel is cool and relevant to this project.
