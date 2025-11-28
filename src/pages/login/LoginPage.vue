<template>
  <auth-box title="С возвращением!" subtitle="Мы так рады видеть вас снова!">
    <div class="login-form">
      <p-text-field label="Адрес электронной почты или номер телефона" required />
      <p-text-field label="Пароль" required />
      <p-anchor size="sm">Забыли пароль?</p-anchor>
      <p-button width="max" size="lg">Вход</p-button>
      <div class="login-form__need-account">
        <span>Нужна учётная запись?</span>
        <p-anchor size="sm" to="register">Зарегистрироваться</p-anchor>
      </div>
    </div>
  </auth-box>
</template>

<script setup lang="ts">
import AuthBox from '@/widgets/auth-box'
import { PTextField, PAnchor, PButton } from '@/shared/ui'
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  &__need-account {
    @include mixins.text-sm-normal;

    display: flex;
    gap: var(--space-xs);
  }
}
</style>
