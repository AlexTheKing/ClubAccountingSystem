<template>
  <div>
    <div align="left" class="chat-window-buttons">
      <button ref="copyButton" v-on:click="onCopy" v-bind:data-clipboard-text="this.room_id">
        {{ isCopied ? 'Copied to clipboard!' : 'Get number of this chat' }}
      </button>
    </div>
    <div class="chat-window">
      <ChatCompanions class="chat-window-companions" v-bind:room_id="1"/>
      <div class="chat-window-chat-box">
        <ChatMessages class="chat-window-messages" v-bind:room_id="1"/>
        <ChatInput class="chat-window-chat-input" v-bind:room_id="1"/>
      </div>
    </div>
  </div>
</template>

<script>
import ChatCompanions from './ChatCompanions';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { UserService } from '../service/UserService';
import ClipboardJS from 'clipboard';

export default {
  name: 'ChatWindow',
  components: { ChatInput, ChatMessages, ChatCompanions },
  data () {
    return {
      room_id: 1,
      isCopied: false
    };
  },
  mounted () {
    /* eslint-disable no-new */
    new ClipboardJS(this.$refs.copyButton);
  },
  beforeCreate () {
    if (!UserService.isAuthorized()) {
      this.$router.push('/');
    }
  },
  methods: {
    onCopy () {
      this.isCopied = true;
      this.$refs.copyButton.disabled = true;
      const timeoutObj = setTimeout(() => {
        this.isCopied = false;
        this.$refs.copyButton.disabled = false;
        clearTimeout(timeoutObj);
      }, 3000);
    }
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
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
  .chat-window-chat-box {
    flex-grow: 6;
    margin-left: 12px;
  }
  .chat-window-messages {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
  .chat-window-chat-input {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    width: 100%;
    margin-top: 12px;
  }
  .chat-window-buttons {
    margin-bottom: 12px;
  }
  button {
    padding: 12px;
    color: white;
    background-color: rgba(0, 12, 255, 0.94);
    border: none;
    transition: all 100ms ease-in;
  }
  button:hover {
    background-color: rgba(53, 67, 255, 0.7);
  }
</style>
