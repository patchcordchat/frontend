<template>
  <div class="channel-page">
    <div></div>
    <div style="display: flex; flex: 1 1 auto; flex-direction: column">
      <main style="display: flex; flex: 1 1 auto; flex-direction: column">
        <div style="display: flex; flex: 1 1 auto" class="message-wrapper">
          <ol>
            <li v-for="message in messages" :key="message.id">
              <div>
                <div>
                  {{ message.content }}
                </div>
              </div>
            </li>
          </ol>
        </div>

        <form
          style="
            position: relative;
            flex-shrink: 0;
            margin-top: -16px;
            padding-inline: var(--space-xs);
          "
        >
          <div class="channel-textarea">
            <textarea name="" id=""></textarea>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const messages = [
  {
    id: 1,
    content: 'lorem ipsum',
  },
]
</script>

<style scoped lang="scss">
.channel-page {
  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  height: 100%;
  box-sizing: border-box;
  background: var(--background-base-lower);
}
</style>
