import React, { Component } from 'react';
var wsSocket = new WebSocket("ws://0.0.0.0:3001/");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Maho" },
      messages: [] // messages coming from the server will be stored here as they arrive
    };

    this.ws = wsSocket;

    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeCurrentUser = this.changeCurrentUser.bind(this);

  }

  addNewMessage(message) {
    let userData = {
      type: "postMessage",
      username: message.username,
      content: message.content
    }
  
    let messageString = JSON.stringify(userData);

    this.ws.send(messageString);
  }

  changeCurrentUser(name) {
    let originalName = this.state.currentUser.name;

    let user = {
      type: "postNotification",
      content: `${originalName} has changed to ${name.currentUser}`,
    }

    let userString = JSON.stringify(user);

    this.ws.send(userString);

    console.log("This is name", name);


    this.setState({
      currentUser: {name: name.currentUser}
    });
  }

  componentDidMount() {
    wsSocket.onmessage = (event) => {
      let parseData = JSON.parse(event.data);

      switch (parseData.type) {
        case "incomingMessage":
          let oldMessages = this.state.messages;
          let newMessages = oldMessages.concat(JSON.parse(event.data));

          this.setState({
            messages: newMessages
          });
          break;

        case "incomingNotification":
          // let oldUsername = this.state.currentUser.name;

          // let newUsername = { name: parseData.currentUser }
          // this.setState({
          //   currentUser: newUsername,
          //   oldUser: oldUsername
          // });
          let oldMessages1 = this.state.messages;
          let newMessages1 = oldMessages1.concat(JSON.parse(event.data));

          this.setState({
            messages: newMessages1
          });
          break;

        case "refresh":
          this.setState({
            totalUsers: parseData.totalUsers
          });
          break;
      }
    }

    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);

  }

  render() {
    return (
      <div>
        <Nav totalUsers={this.state.totalUsers} />
        <MessageList oldUser={this.state.oldUser} currentUser={this.state.currentUser} messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} changeCurrentUser={this.changeCurrentUser} addNewMessage={this.addNewMessage} messages={this.state.messages} />
      </div>
    );
  }

}

class Nav extends Component {
  render() {
    return (
      <nav className="navbar" >
        <a href="/" className="navbar-brand">Chatty</a>
        <label>Total Users: {this.props.totalUsers}</label>
      </nav>
    );
  }
}

class MessageList extends Component {

  render() {
    const listMessages = this.props.messages.map(({ type, id, username, content}) => {
      if (type === 'incomingNotification') {
        return (
          <div className="message system">
            { content }
          </div>
        )
      } else {
        return (
          <div className="message" key={id}>
            <span className="message-username">{username}</span>
            <span className="message-content">{content}</span>
          </div>
        )
      }
    });

    // const newUser = this.props.currentUser.name;
    // const oldUser = this.props.oldUser;
    // let notification;



    // if (oldUser) {
    //   notification = (
    //     <div className="message system">
    //       {oldUser} changed their name to {newUser}.
    //     </div>
    //   );
    // } else {
    //   notification = (
    //     <div className="message system">
    //     </div>
    //   );
    // }

    return (
      <main className="messages">
        {listMessages}
      </main>
    );
  }
}

class ChatBar extends Component {
  constructor() {
    super();
    this.createNewMessage = this.createNewMessage.bind(this);
    this.createCurrentUser = this.createCurrentUser.bind(this);
  }

  createNewMessage(e) {
    e.preventDefault();
    let messageArray = this.props.messages;
    let highest = 0;

    //generating new id by incrementing highest id val
    for (let x of messageArray) {
      if (x.id > highest) {
        highest = x.id;
      }
    }

    if (e.keyCode === 13) {
      var newMessage = {
        username: e.target.previousSibling.placeholder,
        content: e.target.value,
        id: highest + 1
      }

      e.target.value = "";

      this.props.addNewMessage(newMessage);
    }
  }

  createCurrentUser(e) {
    e.preventDefault();

    if (e.keyCode === 13) {
      var newCurrentUser = {
        currentUser: e.target.value
      }

      if (e.target.value === "") {
        var newCurrentUser = {
          currentUser: "Anonymous"
        }
      }

      this.props.changeCurrentUser(newCurrentUser);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyUp={this.createCurrentUser} placeholder={this.props.currentUser.name} />
        <input className="chatbar-message" onKeyUp={this.createNewMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default App;