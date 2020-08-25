<template>
  <div class="home">
    <Creator />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Creator from '@/components/Creator.vue'; // @ is an alias to /src

@Component({
  components: {
    Creator,
  },
})
export default class Home extends Vue {}
</script>
