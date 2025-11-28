<template>
  <auth-box title="Создать учётную запись">
    <div class="register-form">
      <p-text-field label="Адрес электронной почты или номер телефона" required />
      <p-text-field label="Отображаемое имя" />
      <p-text-field label="Имя пользователя" required />
      <p-text-field label="Пароль" required />
      <div class="register-form__date-of-birth">
        <p-label size="md" text="Дата рождения" required />
        <div class="register-form__date-of-birth-fields">
          <p-select :items="[1, 2, 3, 4, 5, 6]" label="День" />
          <p-select :items="['Январь', 'Февраль', 'Март', 'Апрель', 'Май']" label="Месяц" />
          <p-select :items="[2001, 2002, 2003, 2004, 2005, 2006]" label="Год" />
        </div>
      </div>
      <p-checkbox
        label="(Необязательно) Я не против получать электронные письма с новостями Patchcord, советами и специальными предложениями. От рассылки можно отписаться в любое время."
      />
      <div class="register-form__consent">
        Нажимая кнопку «Создать учётную запись», вы соглашаетесь с
        <p-anchor>Пользовательским соглашением</p-anchor>
        Patchcord и подтверждаете, что ознакомились с
        <p-anchor>Политикой конфиденциальности</p-anchor>
      </div>
      <p-button width="max" size="lg">Создать учётную запись</p-button>
      <p-anchor size="sm" to="login">Уже зарегистрированы? Войти</p-anchor>
    </div>
  </auth-box>
</template>

<script setup lang="ts">
import AuthBox from '@/widgets/auth-box'
import { PTextField, PAnchor, PButton, PSelect, PLabel, PCheckbox } from '@/shared/ui'
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
}
</style>
