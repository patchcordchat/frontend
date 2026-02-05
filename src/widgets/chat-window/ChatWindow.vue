<template>
  <div class="chat">
    <div class="chat__upload-area"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.chat {
  &__upload-area {
    position: fixed;
    position: absolute;
    top: 0;
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--white);
    font-size: 36px;
    background: var(--opacity-black-80);
    opacity: 0;
    visibility: hidden;
    inset-inline-start: 0;
  }
}
</style>
