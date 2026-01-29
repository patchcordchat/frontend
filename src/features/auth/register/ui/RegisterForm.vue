<template>
  <auth-box title="Создать учётную запись">
    <form class="register-form" @submit.prevent="onSubmit">
      <p-text-field
        v-model="email"
        v-bind="emailAttrs"
        label="Адрес электронной почты"
        maxlength="999"
        autocomplete="username"
        type="email"
        name="email"
        :error="serverError ?? errors.email"
        required
      />

      <p-text-field
        v-model="globalName"
        v-bind="globalNameAttrs"
        label="Отображаемое имя"
        maxlength="32"
        autocomplete="off"
        type="text"
        name="global_name"
        :error="serverError ?? errors.global_name"
      />

      <p-field-hint class="register-form__field-hint">
        Это имя увидят другие пользователи. Можно добавлять специальные символы и эмодзи.
      </p-field-hint>

      <p-text-field
        v-model="username"
        v-bind="usernameAttrs"
        label="Имя пользователя"
        maxlength="32"
        autocomplete="off"
        type="text"
        name="username"
        :error="serverError ?? errors.username"
        required
      />

      <p-field-hint class="register-form__field-hint">
        Используйте только цифры, буквы, нижнее подчёркивание и точки.
      </p-field-hint>

      <p-text-field
        v-model="password"
        v-bind="passwordAttrs"
        label="Пароль"
        autocomplete="new-password"
        type="password"
        name="password"
        :error="serverError ?? errors.password"
        required
      />

      <div class="register-form__date-of-birth">
        <p-label size="md" text="Дата рождения" required />

        <div class="register-form__date-of-birth-fields">
          <p-select :items="days" label="День" v-model="selectedDay" />

          <p-select
            :items="months"
            item-title="title"
            item-value="value"
            label="Месяц"
            v-model="selectedMonth"
          />

          <p-select :items="years" label="Год" v-model="selectedYear" />
        </div>
      </div>

      <p-checkbox
        v-model="promotionalEmailOptIn"
        v-bind="promotionalEmailOptInAttrs"
        label="(Необязательно) Я не против получать электронные письма с новостями Patchcord, советами и специальными предложениями. От рассылки можно отписаться в любое время."
      />

      <div class="register-form__consent">
        Нажимая кнопку «Создать учётную запись», вы соглашаетесь с
        <p-anchor href="https://patchcord.org/terms" target="_blank"
          >Пользовательским соглашением</p-anchor
        >
        Patchcord и подтверждаете, что ознакомились с
        <p-anchor href="https://patchcord.org/privacy" target="_blank"
          >Политикой конфиденциальности</p-anchor
        >
      </div>

      <p-button
        width="max"
        size="md"
        type="submit"
        :loading="isSubmitting"
        :disabled="isSubmitting"
      >
        Создать учётную запись
      </p-button>

      <p-anchor size="sm" to="login">Уже зарегистрированы? Войти</p-anchor>
    </form>
  </auth-box>
</template>

<script setup lang="ts">
import AuthBox from '@/widgets/auth-box'
import { PTextField, PAnchor, PButton, PSelect, PLabel, PCheckbox, PFieldHint } from '@/shared/ui'
import { useRegisterForm } from '../model/useRegisterForm'

const {
  username,
  usernameAttrs,
  globalName,
  globalNameAttrs,
  email,
  emailAttrs,
  password,
  passwordAttrs,
  promotionalEmailOptIn,
  promotionalEmailOptInAttrs,
  selectedDay,
  selectedMonth,
  selectedYear,
  days,
  months,
  years,
  errors,
  serverError,
  isSubmitting,
  onSubmit,
} = useRegisterForm()
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.register-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  &__date-of-birth {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  &__date-of-birth-fields {
    display: flex;
    gap: var(--space-xs);
    width: 100%;
  }

  &__consent {
    @include mixins.text-sm-normal;

    color: var(--text-secondary);
  }

  &__field-hint {
    margin-top: calc(var(--space-xs) * -1);
  }
}
</style>
