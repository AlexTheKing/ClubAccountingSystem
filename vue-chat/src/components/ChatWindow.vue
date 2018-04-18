<template>
  <div class="chat-window">
    <ChatCompanions class="chat-window-companions" v-bind:room_id="1"/>
    <div class="chat-window-messages">
      <ChatMessages v-bind:room_id="1"/>
      <ChatInput v-bind:room_id="1"/>
    </div>
  </div>
</template>

<script>
import ChatCompanions from './ChatCompanions';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export default {
  name: 'ChatWindow',
  components: { ChatInput, ChatMessages, ChatCompanions },
  data () {
    return {
      room_id: 1
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chat-window {
    display: flex;
  }
  .chat-window-companions {
    flex-grow: 1;
  }
  .chat-window-messages {
    flex-grow: 6;
  }
</style>
