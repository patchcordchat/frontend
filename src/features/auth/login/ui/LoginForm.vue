<template>
  <auth-box title="С возвращением!" subtitle="Мы так рады видеть вас снова!">
    <form class="login-form" @submit.prevent="onSubmit">
      <p-text-field
        v-model="email"
        v-bind="emailAttrs"
        label="Адрес электронной почты"
        maxlength="999"
        autocomplete="username"
        type="email"
        name="email"
        :error="errors.email ?? serverError"
        required
      />

      <p-text-field
        v-model="password"
        v-bind="passwordAttrs"
        label="Пароль"
        autocomplete="current-password"
        type="password"
        name="password"
        :error="errors.password ?? serverError"
        required
      />

      <p-anchor size="sm" to="reset">Забыли пароль?</p-anchor>

      <p-button
        width="max"
        size="md"
        type="submit"
        :loading="isSubmitting"
        :disabled="isSubmitting"
      >
        Вход
      </p-button>

      <div class="login-form__need-account">
        <span>Нужна учётная запись?</span>

        <p-anchor size="sm" to="register">Зарегистрироваться</p-anchor>
      </div>
    </form>
  </auth-box>
</template>

<script setup lang="ts">
import AuthBox from '@/widgets/auth-box'
import { PTextField, PAnchor, PButton } from '@/shared/ui'
import { useLoginForm } from '../model/useLoginForm'

const { email, emailAttrs, password, passwordAttrs, errors, serverError, isSubmitting, onSubmit } =
  useLoginForm()
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
