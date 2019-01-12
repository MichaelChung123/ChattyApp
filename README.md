React Boilerplate
=====================

A minimal and light dev environment for ReactJS.

### Usage

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:lighthouse-labs/react-simple-boilerplate.git
cd react-simple-boilerplate
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Screenshots

## Chatty App
![Chatty App](https://github.com/MichaelChung123/ChattyApp/blob/master/docs/display-app.png)

## Sending Message to All Users On The Server
![Sending Message to All Users On The Server](https://github.com/MichaelChung123/ChattyApp/blob/master/docs/main-paired.png)

## Sending Message to All Users On The Server
![Pre Sending Message to All Users On The Server](https://github.com/MichaelChung123/ChattyApp/blob/master/docs/pre-send-reg-msg.png)

![Sending Message to All Users On The Server](https://github.com/MichaelChung123/ChattyApp/blob/master/docs/send-reg-msg.png)

## Changing The Messenger's Name
![Pre Changing The Messenger's Name](https://github.com/MichaelChung123/ChattyApp/blob/master/docs/pre-new-user-msg.png)

![Changing The Messenger's Name](https://github.com/MichaelChung123/ChattyApp/blob/master/docs/new-user-msg.png)

## Displaying & Updating The Amount of Users On The Server
![Pre Displaying & Updating The Amount of Users On The Server](Uhttps://github.com/MichaelChung123/ChattyApp/blob/master/docs/log-third-user.pngRL)

![Displaying & Updating The Amount of Users On The Server](https://github.com/MichaelChung123/ChattyApp/blob/master/docs/show-display-count.png)



### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
