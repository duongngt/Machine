import React from 'react';

class Register extends React.Component {
  render(){
    
    return ( 
      <div className="styLogin">
      <h2>Login</h2>
      <form action="/action_page.php" method="post">
        <div class="imgcontainer">
          <img src="img_avatar2.png" alt="Avatar" class="avatar"/>
        </div>

        <div class="container">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required></input>

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required></input>
              
          <button type="submit">Login</button>
          <label>
            <input type="checkbox" checked="checked" name="remember"> Remember me</input>
          </label>
        </div>

        <div class="container" style="background-color:#f1f1f1">
          <button type="button" class="cancelbtn">Cancel</button>
          <span class="psw">Forgot <a href="#">password?</a></span>
        </div>
      </form>
      </div>
    );
  }
}

export default Login;