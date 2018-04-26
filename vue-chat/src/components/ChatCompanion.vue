<template>
  <li>
    <div class="chat-companion" v-bind:class="{ 'is-me' : isUser }">
      {{name}}
    </div>
  </li>
</template>

<script>
import { UserService } from '../service/UserService';

export default {
  name: 'ChatCompanion',
  props: ['name'],
  data () {
    return {
      isUser: this.name === UserService.user.name
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chat-companion {
    float: left;
    padding: 4px;
    margin: 4px;
    background-color: #fff;
    font-size: 16px;
    transition: margin 50ms ease-in;
    color: cornflowerblue;
  }
  li:hover .chat-companion {
    background-color: rgb(243, 243, 243);
    margin: 16px 4px;
  }
  li:hover {
    background-color: rgb(243, 243, 243);
  }
  .is-me {
    color: #ff8e51;
  }
</style>
