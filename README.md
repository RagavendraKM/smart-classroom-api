# Smart Classroom API

This repository is the backend REST API for the [Smart Classroom](https://github.com/peterpogorski/smartclassandroid) mobile application.


Smart Classroom improves classroom interactions between students and teachers by transitioning mobile devices from a distraction to an educational asset. Smart Classroom optimizes class time by significantly reducing the amount of time required for students and teachers to coordinate classroom participation. This refers to tedious tasks such as manually prompting individual students for attendance, physically handing out quizzes during the lecture, and having to weeks just to see simple quiz results.


Many students today are interacting with their mobile devices for hours each day while in the classroom. When students use their devices in the classroom, it distracts them from learning and makes it more difficult for teachers to teach. By introducing Smart Classroom to schools, students will be encouraged to bring their mobile devices to classroom lectures so that they can actively participate in class using a familiar medium. Additionally, teachers will have an easier time interacting with the class as they will also be actively using their mobile devices throughout their lectures. Smart Classroom actively provides the first step to modernizing the classroom by creating educational value on mediums that have previously been classified as distractions.


The Smart Classroom application is specifically designed to be used by teachers and students in a classroom. The target classroom clientele was focused primarily on high-school classrooms; however, the application can easily be used in both an elementary and even university setting. This tool can be used in by students and teachers in classrooms around the world.


## Mobile Application
### [Smart Classroom Android App](https://github.com/peterpogorski/smartclassandroid)


## Authors

Smart Classroom was built as the project component of the course ECE 452 - Software Architecture at the University of Waterloo.

* [Maxwell Carter](https://github.com/maxcarter)
* [Run Qiu (Sam) Li](https://github.com/LiRq95)
* [Peter Pogorski](https://github.com/peterpogorski)
* [Kevin Truong](https://github.com/ktruong7)


## Installation

* Prerequisite: [Node.js](https://nodejs.org/en/)


### Install Dependencies

```
npm install
```


### Configure API

Modify [config.js](https://github.com/maxcarter/smart-classroom-api/blob/master/config.js) to include your development and production database connection details. It is recommended to host your database on [mLab](https://mlab.com/).


### Start Server

```
node server.js
```

## Cloud Foundry

* Prerequisite: [Cloud Foundry CLI](https://github.com/cloudfoundry/cli)

This application has been configured to work on a [Cloud Foundry](https://www.cloudfoundry.org/) Platform as a Service. Before pushing to the cloud ensure that you have logged in using `cf login`.

```
cf push
```


## Documentation

### [API Documentation](https://github.com/maxcarter/smart-classroom-api/wiki)

* [Authentication](https://github.com/maxcarter/smart-classroom-api/wiki/Authenticate)
* [Classrooms](https://github.com/maxcarter/smart-classroom-api/wiki/Classrooms)
* [Students](https://github.com/maxcarter/smart-classroom-api/wiki/Students)
* [Teachers](https://github.com/maxcarter/smart-classroom-api/wiki/Teachers)
* [Goals](https://github.com/maxcarter/smart-classroom-api/wiki/Goals)
* [Quizzes](https://github.com/maxcarter/smart-classroom-api/wiki/Quizzes)

## Software Architecture

The REST API is designed with a layered software architecture that focuses on composability and adaptability. When a Hyper-Text Transfer Protocol (HTTP) request comes from the mobile application, the Node.js server uses the Express.js routing framework to map the request to the corresponding route.


The first layer of the API represents the routes. A route is a JavaScript function that is associated to a Uniform Resource Locator (URL) path endpoint. The function is executed by the Express.js router when the client specifies the path endpoint in the URL. These routes are uniquely defined based on the REST architectural style and implement GET, PUT, POST, and DELETE, HTTP request functionality for each collection in the database.


Each route is composed of modules, as shown in Figure 5. Modules correspond directly to Express.js middleware functions. Express.js middleware functions are JavaScript functions built into the framework that have reference to the request object, response object, and the next middleware function. The route can be thought of a linked-list, where each link is a module (Express.js middleware function). When a request comes in, the route executes the modules linearly, from the first module down to the last module. This is done by having the modules invoke the callback to the next express middleware function. Modules are independent in execution and can be used by multiple routes. Building a route in such a way allows for the route to be composable. Each module invokes a variety of controllers to accomplish the desired task and formulate a JavaScript Object Notation (JSON) response.


Controllers, in the context of this API, correspond to a dedicated interaction with a domain specific extension. Controllers can be structured in any format but typically are simply a set of functions, available to the Module, that interact with their corresponding domain specific extension. For this backend, the only domain specific extension is the MongoDB database, which in turn corresponds to the API having a database controller to encapsulate the interactions. Designing the API in this way allows for adaptability of new technologies and features with minimal effort.


![Smart Classroom REST API](https://raw.github.com/maxcarter/smart-classroom-api/master/assets/architecture.png)
