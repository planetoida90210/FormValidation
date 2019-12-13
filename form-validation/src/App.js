import React, { Component } from 'react';
import './App.css'
import backgroundImage from './form-background-image.png'
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class App extends Component {
  state = {
    username: '',
    email: '',
    pass : '',
    accept: false,
    message: '',

    errors: {
    username: false,
    email: false,
    pass : false,
    accept: false,
    }
    }

    messages = {
      username_incorrect: 'Your Username should be longer than 10 characters and not contains space.',
      email_incorrect: 'Missing "@" in email.',
      password_incorrect: 'Passsword should have 8 characters.',
      accept_incorrect: 'Unconfirmed terms and conditions'
    }

    handleChange = (e) => {
    
      const name = e.target.name
      const type = e.target.type


      if(type === 'text' || type === 'password' || type === 'email') {
        const value = e.target.value;
        this.setState({
          [name]: value,
          
        })
      } else if (type === 'checkbox') {

        const checked = e.target.checked;
        this.setState({
          [name]: checked, 
        })
      }
    }

    handleSubmit = (e) => {
      e.preventDefault()

      const validation = this.formValidation()
      if(validation.correct) {
        this.setState({
          username: '',
          email: '',
          pass : '',
          accept: false,
          message: 'Formularz został wysłany',
      
          errors: {
          username: false,
          email: false,
          pass : false,
          accept: false,
          }  
        }) 
        console.log('formularz wysłany')
      } else {
        this.setState({
          errors: {
            username: !validation.username,
            email: !validation.email,
            pass : !validation.password,
            accept: !validation.accept,
            }
        })
      }
    }

    formValidation = () => {
      let username = false;
      let email = false;
      let password = false;
      let accept = false;
      let correct = false;

      if(this.state.username.length > 10 && this.state.username.indexOf(' ') === -1) {
        username = true;
      }

      if(this.state.email.indexOf('@') !== -1) {
        email = true;
      }

      if(this.state.pass.length === 8) {
        password = true;
      }

      if(this.state.accept) {
        accept = true;
      }

      if(username && email && password && accept) {
        correct = true;
      }

      return ({
        username,
        email,
        password,
        accept,
        correct
      })
    }

    componentDidUpdate() {
      if(this.state.message !== ""){
        setTimeout(()=> this.setState({
          message: '',
        }) , 3000)
      }
    }

  render() { 
    return ( 
      <div style={{backgroundImage:`url(${backgroundImage})`}} className="signupSection">
        <div className="info">
          <h2>Classic Game Moves</h2>
          <FontAwesomeIcon className='fa' icon={faGamepad} />
          <p>Are you ready for journey?</p>
        </div>
        <form className='signupForm' onSubmit={this.handleSubmit} noValidate>
          <h2>Sign up</h2>
          <label htmlFor="user">
      <input 
      type="text" 
      id="user" 
      name="username" 
      placeholder="Username"
      value={this.state.username}
      onChange={this.handleChange}
      />
   {this.state.errors.username && <span>{this.messages.username_incorrect}</span>}
          </label>

          <label htmlFor="email">
      <input 
      type="email" 
      id="email" 
      name="email" 
      placeholder="Email"
      value={this.state.email}
      onChange={this.handleChange}
      />
      {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}
          </label>

          <label htmlFor="password">
      <input 
      type="password" 
      id="password" 
      name="pass" 
      placeholder="Password"
      value={this.state.pass}
      onChange={this.handleChange}
      />
      {this.state.errors.pass && <span>{this.messages.password_incorrect}</span>}
          </label>
          <label htmlFor="accept">
      
            <input 
            className='terms'
            id="accept"
            name="accept"
            type="checkbox"
            checked={this.state.accept}
            onChange={this.handleChange}
            />
            <span className="terms">I accept terms and conditions</span>
          </label>
          {this.state.errors.accept && <span>{this.messages.accept_incorrect}</span>}
          <button>sign up</button>
        </form>
    {this.state.message && <h3>{this.state.message}</h3>}
      </div>
     );
  }
}
 
export default App;