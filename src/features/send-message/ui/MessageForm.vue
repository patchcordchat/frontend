<template>
  <form class="message-form">
    <div class="message-form__inner">
      <div class="message-form__attach-wrapper">
        <p-icon class="message-form__attach-icon" icon="misc.attach" />
      </div>

      <textarea class="message-form__textarea" style="height: 56px"></textarea>

      <div class="message-form__buttons"></div>
    </div>
  </form>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.message-form {
  position: relative;
  flex-shrink: 0;
  margin-top: -1rem;
  padding-inline: var(--space-xs);
  padding-inline-start: calc(var(--space-md) - 1px);

  &__inner {
    position: relative;
    display: flex;
    width: 100%;
    margin-bottom: var(--space-xs);
    text-indent: 0;
    border: 1px solid var(--border-muted);
    border-radius: var(--radius-sm);
    background: var(--chat-background-default);
    transition: border-color 0.2s ease;
  }

  &__textarea {
    width: 100%;
  }
}
</style>
