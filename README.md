## 1. Overview
Leader Talks
============
The website is designed to show the information about the speakers of the community The community holds a lot of virtual events with venture capitalists, tech industry specialists, entrepreneurs, etc, and the website helps to manage information about the speakers and events.

![ezgif com-gif-maker](https://user-images.githubusercontent.com/33399226/138623718-d8df3f25-5f02-4616-b4eb-654e4b0194de.gif)
### Features:
- List of speakers - implemented as an infinite scroll.
- Sign in/ sing up - supporting google, twitter, email, phone.
- Admin panel - managing speakers with admin credentials.
- Form - creating speaker card with drag and drop file uploader and file validation (size, type).

### Requirements

- The IDE/text editor of your choice, such as  [WebStorm](https://www.jetbrains.com/webstorm),  [Atom](https://atom.io/),  [Sublime](https://www.sublimetext.com/), or  [VS Code](https://code.visualstudio.com/)
- The package manager  [npm](https://www.npmjs.com/), which typically comes with  [Node.js](https://nodejs.org/en/)
- A terminal/console
- A browser of your choice, such as Chrome
- [Google Cloud Patform](https://cloud.google.com/)
- [Firebase](https://console.firebase.google.com/) console

### Architecture

- [Google Cloud Patform](https://cloud.google.com/) - cloud infrastructure for development.
- [Firebase](https://console.firebase.google.com/) - works on top of GCP. Used for hosting, data storing, analytics, monitoring, and testing.
- [Nebular](https://akveo.github.io/nebular/) Angular UI Library - Library for web application.
- [Taiga UI](https://github.com/TinkoffCreditSystems/taiga-ui) - Angular UI Kit

## 2 Getting Started

Clone the [GitHub repository](https://github.com/honoyr/leader_talks)  from the command line:
```
git clone https://github.com/honoyr/leader_talks
```
Alternatively, if you do not have git installed, you can  [download the repository as a ZIP file](https://github.com/honoyr/leader_talks/archive/main.zip).

## 3. Create and set up a Firebase project

### **Create a Firebase project**

1.  Sign in to  [Firebase](https://console.firebase.google.com/).
2.  In the Firebase console, click  **Add Project**, and then name your Firebase project  **LeaderTalks**. Remember the project ID for your Firebase project.
3.  Click  **Create Project**.

**Important**: Your Firebase project will be named as **LeaderTalks**, but Firebase will automatically assign it a unique Project ID in the form  **LeaderTalks-1234**. This unique identifier is how your project is actually identified (including in the CLI), whereas  _ChatBot_  is simply a display name.

### Add a Firebase web app to the project

1.  Click the web icon  ![58d6543a156e56f9.png](https://firebase.google.com/codelabs/firebase-web/img/58d6543a156e56f9.png) to create a new Firebase web app.
2.  Register the app with the nickname  **LeaderTalks**, then check the box next to  **Also set up Firebase Hosting for this app**. Click  **Register app**.
3.  Click through the remaining steps. You don't need to follow the instructions now; these will be covered in later steps of this doc.

![ea9ab0db531a104c](https://user-images.githubusercontent.com/33399226/114799208-15ec5680-9d65-11eb-8d3e-4b9973509b2c.jpg)

## 4. Install the Firebase command-line interface

The Firebase command-line interface (CLI) allows you to use Firebase Hosting to serve your web app locally, as well as to deploy your web app to your Firebase project.

**Note**: To install the CLI, you need to install  [npm](https://www.npmjs.com/)  which typically comes with  [Node.js](https://nodejs.org/en/).

1.  Install the CLI by running the following npm command:

```
npm -g install firebase-tools
```

if it doesn't work, you may need to  [change npm permissions.](https://docs.npmjs.com/getting-started/fixing-npm-permissions)

2.  Verify that the CLI has been installed correctly by running the following command:

```
firebase --version
```

Make sure that the version of the Firebase CLI is v9 or later.

3.  Authorize the Firebase CLI by running the following command:

```
firebase login
```

We've set up the web app template to pull your app's configuration for Firebase Hosting from your app's local directory (the repository that you cloned earlier). But to pull the configuration, we need to associate your app with your Firebase project.

4.  Make sure that your command line is accessing your app's local  `root`  project directory.
5.  Associate your app with your Firebase project by running the following command:

```
firebase use --add
```

6.  When prompted, select your  **Project ID**, then give your Firebase project an alias. `.firebaserc` file

An alias is useful if you have multiple environments (production, staging, etc).

7.  Follow the remaining instructions on your command line.
8. `.firebaserc` file will be set up with your **Project ID**
```
{  
  "projects": {  
    "default": "<Project ID>"  
  }  
}
```
## 6. Deployment Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2.

#### Local environment
- Run Docker compase locally `docker-compose up`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Production environment

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## 7. Deployment Backend

#### Local environment
- Run your functions locally `npm run-script serve`.
#### Production environment
- Run deployment script to host functions in production `npm run-script deploy`
