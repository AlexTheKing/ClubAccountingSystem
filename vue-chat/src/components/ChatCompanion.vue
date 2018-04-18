<template>
  <li>
    <div class="chat-companion">
      {{name}}
    </div>
  </li>
</template>

<script>
export default {
  name: 'ChatCompanion',
  props: ['name']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chat-companion {
    float: left;
    padding: 4px;
    margin: 4px;
    background-color: #fff;
    width: auto;
  }
</style>
