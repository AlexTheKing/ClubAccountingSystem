<template>
  <div class="chat-companions">
    <ul>
      <ChatCompanion v-for="(companion, index) in companions"
                     v-bind:key="companion.id"
                     v-bind:name="companion.name"
                     v-bind:class="{ 'line-between': (companions.length !== 1 && index !== companions.length - 1) }"/>
    </ul>
  </div>
</template>

<script>
import ChatCompanion from './ChatCompanion';
import { UserService } from '../service/UserService';
import UserEvents from '../constants/UserEvents';
import { io } from '../service/ConnectionService';

export default {
  name: 'ChatCompanions',
  props: ['room_id'],
  components: { ChatCompanion },
  methods: {
    updateCompanions (companions) {
      this.companions = companions;
    }
  },
  data () {
    const data = {room_id: this.room_id};
    io.emit(UserEvents.GET_ALL_USERS_FOR_ROOM_REQUEST, UserService.authenticateRequest(data));
    io.on(UserEvents.GET_ALL_USERS_FOR_ROOM_RESPONSE, this.updateCompanions);
    return {
      companions: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .chat-companions {
   background-color: white;
 }
 ul {
   list-style-type: none;
   display: flex;
   flex-direction: column;
   padding: 0 12px;
 }
  .line-between {
    border-bottom: 1px solid rgba(105, 105, 105, 0.2);
  }
</style>
