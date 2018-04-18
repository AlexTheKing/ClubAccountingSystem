<template>
  <div class="chat-messages" ref="messagebox">
    <ul>
      <ChatMessage v-for="message in messages"
                   v-bind:key="message._id"
                   v-bind:name="message.name"
                   v-bind:data="message.data"/>
    </ul>
  </div>
</template>

<script>
import ChatMessage from './ChatMessage';
import { UserService } from '../service/UserService';
import MessageEvents from '../constants/MessageEvents';
import { io } from '../service/ConnectionService';

export default {
  name: 'ChatMessages',
  props: ['room_id'],
  components: { ChatMessage },
  methods: {
    load () {
      const data = {room_id: this.room_id};
      io.emit(MessageEvents.GET_ALL_MESSAGES_FOR_ROOM_REQUEST, UserService.authenticateRequest(data));
    },
    updateMessages (messages) {
      this.messages = messages;
    }
  },
  data () {
    this.load();
    io.on(MessageEvents.GET_ALL_MESSAGES_FOR_ROOM_RESPONSE, this.updateMessages);
    io.on(MessageEvents.UPDATE_MESSAGES_FOR_ROOM, this.load);
    return {
      messages: []
    };
  },
  updated () {
    this.$refs.messagebox.scrollTop = this.$refs.messagebox.scrollHeight;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chat-messages {
    margin: 12px;
    background-color: rgb(250, 250, 250);
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  ul {
    list-style-type: none;
    padding: 18px;
    display: flex;
    flex-direction: column;
  }
</style>
