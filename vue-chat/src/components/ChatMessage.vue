<template>
  <li>
    <div class="chat-message"
         v-bind:class="{'chat-message-user' : isUser, 'chat-message-companion' : !isUser}">
      <div class="chat-message-owner"
           v-bind:class="{ 'chat-message-user-name' : isUser, 'chat-message-companion-name' : !isUser}">
        {{name}}
      </div>
      <div class="chat-message-data"
           v-bind:class="{ 'chat-message-user-data' : isUser, 'chat-message-companion-data' : !isUser}" v-html="dataEsc">
      </div>
    </div>
  </li>
</template>

<script>
import { UserService } from '../service/UserService';

export default {
  name: 'ChatMessage',
  props: ['name', 'data'],
  data () {
    return {
      isUser: this.name === UserService.user.name,
      dataEsc: ''
    };
  },
  beforeMount () {
    let entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };
    // eslint-disable-next-line
    this.dataEsc = this.data.replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });

    let emojis = {
      ':smile:': '😃',
      ':grinning:': '😁',
      ':face_with_tears:': '😂',
      ':smiling_eyes:': '😊',
      ':tongue_face:': '😋',
      ':relieved:': '😌',
      ':smirking:': '😏',
      ':pensive:': '😔',
      ':kiss:': '😘',
      ':angry:': '😠',
      ':crying:': '😢'
    };

    for (let key in emojis) {
      this.dataEsc = this.dataEsc.replace(key, emojis[key]);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chat-message {
    width: auto;
    height: auto;
    padding: 8px;
    background-color: #ffffff;
    border-radius: 2px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin: 4px;
  }
  .chat-message-user {
    float: right;
  }
  .chat-message-companion {
    float: left;
  }
  .chat-message-user-name {
    color: #ff8e51;
  }
  .chat-message-companion-name {
    color: cornflowerblue;
  }
  .chat-message-user-name, chat-message-user-data {
    text-align: right;
  }
  .chat-message-companion-name, chat-message-companion-data {
    text-align: left;
  }
  .chat-message-owner, .chat-message-data {
    padding: 4px;
  }
</style>
