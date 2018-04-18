<template>
  <input v-model="message" @keyup.enter="onSend" type="text" placeholder="Type here!"/>
</template>

<script>
import { io } from '../service/ConnectionService';
import MessageEvents from '../constants/MessageEvents';
import { UserService } from '../service/UserService';

export default {
  name: 'ChatInput',
  props: ['room_id'],
  data () {
    return {
      message: ''
    };
  },
  methods: {
    onSend () {
      const data = { data: this.message, room_id: this.room_id };
      io.emit(MessageEvents.NEW_MESSAGE, UserService.authenticateRequest(data));
      this.message = '';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input {
    background-color: rgb(250, 250, 250);
    border: none;
    height: 50px;
    width: 100%;
    margin: 0 12px;
    padding: 0 12px;
  }
</style>
