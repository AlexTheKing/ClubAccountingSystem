<template>
  <div class="modal" v-bind:class="{ 'displayed' : isVisible }">
    <div class="modal-content">
      <span class="close" v-on:click="close">&times;</span>
      <input type="text" placeholder="Copy here chat number and press Enter"
             v-model="chatNumber" @keyup.enter="addChat">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatAddRoomModal',
  data () {
    return {
      chatNumber: '',
      isVisible: false
    };
  },
  methods: {
    addChat () {
      console.log(this.chatNumber);
    },
    show () {
      this.isVisible = true;
    },
    close () {
      this.isVisible = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .displayed {
    display: block;
  }
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .close:hover, .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>
