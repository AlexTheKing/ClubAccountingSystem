<template>
  <div id="app">
    <div class="buttons" align="right" v-bind:class="{ 'displayed' : isAuthorized }">
      <button class="functional-button" v-on:click="addChat">Add chat</button>
      <button class="functional-button" v-on:click="logout">Log out</button>
    </div>
    <router-view/>
    <ChatAddRoomModal />
  </div>
</template>

<script>
import { UserService } from './service/UserService';
import { io } from './service/ConnectionService';
import UserEvents from './constants/UserEvents';
import ChatAddRoomModal from "./components/ChatAddRoomModal";

export default {
  name: 'App',
  components: { ChatAddRoomModal },
  data () {
    io.on(UserEvents.AUTHORIZE_USER_SUCCESS_RESPONSE, () => {
      this.isAuthorized = true;
    });
    return {
      isAuthorized: UserService.isAuthorized(),
    };
  },
  methods: {
    logout () {
      UserService.logout();
      this.$router.push('/');
      this.isAuthorized = UserService.isAuthorized();
    }
  }
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
    margin-left: 12px;
    margin-right: 12px;
  }
  .functional-button {
    padding: 12px;
    width: 120px;
    color: white;
    background-color: rgba(0, 12, 255, 0.94);
    border: none;
    transition: all 100ms ease-in;
  }
  .functional-button:hover {
    background-color: rgba(53, 67, 255, 0.7);
  }
  body {
    background-color: rgba(74, 160, 52, 0.8);
  }
  .buttons{
    display: none;
  }
  .displayed {
    display: block;
  }
</style>
