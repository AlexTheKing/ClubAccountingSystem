<template>
  <div class="chat-login" v-bind:class="{ 'chat-login-shake' : isAuthorizationFailed }">
    <div class="error-block" v-bind:class="{ 'auth-failed-block' : isAuthorizationFailed }">
      <h3>Authorization failed</h3>
      <h5>Wrong name or password</h5>
    </div>
    <input placeholder="Name" v-model="name" @keyup.enter="authorize"
           v-bind:class="{ 'auth-failed-input' : isAuthorizationFailed }"/>
    <input placeholder="Password" v-model="password" type="password" @keyup.enter="authorize"
           v-bind:class="{ 'auth-failed-input' : isAuthorizationFailed }"/>
    <button v-on:click="authorize">Login</button>
  </div>
</template>

<script>
import { UserService } from '../service/UserService';

export default {
  name: 'ChatLogin',
  data () {
    return {
      name: '',
      password: '',
      isAuthorizationFailed: false
    };
  },
  beforeCreate () {
    if (UserService.isAuthorized()) {
      this.$router.push('/chat');
    }
  },
  methods: {
    authorize () {
      this.isAuthorizationFailed = false;
      UserService.authorize(this.name, this.password).then(() => {
        this.$router.push('/chat');
      }).catch((err) => {
        console.log(err);
        this.isAuthorizationFailed = true;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chat-login {
    background-color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 48px;
    width: 300px;
    margin-top: -120px;
    margin-left: -220px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }
  .chat-login:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  input {
    background-color: rgb(243, 243, 243);
    border: none;
    padding: 8px;
    display: block;
    margin: 14px 0;
    width: 100%;
    box-sizing: border-box;
  }
  button {
    padding: 12px;
    background-color: #28a0139c;
    color: white;
    display: block;
    width: 100%;
    border: none;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }
  button:hover {
    background-color: #28a013cc;
  }
  .error-block {
    display: none;
    background-color: rgba(225, 0, 0, 0.73);
    transition: display 200ms ease-in;
    color: white;
    padding: 8px;
  }
  .auth-failed-input {
    border: 1px solid red;
    border-radius: 4px;
  }
  .chat-login-shake {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  }
  .auth-failed-block {
    display: block;
  }
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
