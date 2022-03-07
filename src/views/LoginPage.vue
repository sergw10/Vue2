<template>
  <div>

    <div class="login-page__wrapper">
      <div class="login-page__title">
        <img src="@/assets/logo.png" alt="Vue logo">
        <h1>{{ form.title }}</h1>
      </div>
      <form id="form" class="login-page__form" @submit.prevent>
        <label for="login">{{ form.mailLabelText }}</label>
        <input
          id="login"
          type="text"
          v-model="form.userEmailValue">
        <label for="password">{{ form.passLabelText }}</label>
        <input
          id="password"
          type="password"
          v-model="form.userPasswordValue">
        <div class="login-page__button-wrap">
          <router-link :to="'/users'">
              <button @click="validateForm()" type="button">{{ form.btnText }}</button>
          </router-link>
        </div>
      </form>
    </div>

    <div class="login-page__wrapper login-page__wrapper-clue">
      <p>If you don't remember, just copy!</p>
      <br>
      <span>Your Email: </span>
      <b>{{ form.emailClue }}</b>
      <span>Your Password: </span>
      <b>{{ form.passwordClue }}</b>
    </div>

  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data () {
    return {
      form: {
        userEmailValue: '',
        userPasswordValue: '',

        title: 'Login Page',
        mailLabelText: 'Mail:',
        passLabelText: 'Password:',
        btnText: 'Sign in',
        emailClue: 'admin@example.com',
        passwordClue: 'password'
      }
    }
  },

  methods: {
    setDataToLocalStorage () {
      localStorage.setItem('email', this.form.userEmailValue)
      localStorage.setItem('password', this.form.userPasswordValue)
    },

    checkSignIn () {
      return localStorage.getItem('signIn') === 'true'
    },

    validateEmail () {
      return this.form.userEmailValue === this.form.emailClue
    },

    validatePassword () {
      return this.form.userPasswordValue === this.form.passwordClue
    },

    validateForm () {
      this.setDataToLocalStorage()

      this.validateEmail() && this.validatePassword()
        ? localStorage.setItem('signIn', true)
        : localStorage.setItem('signIn', false)

      if (!this.checkSignIn()) event.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
  // Variables
  $green: #42b983;

  .login-page__title {
    margin-bottom: 35px;
    text-align: center;

    h1 {
      display: inline-block;
      vertical-align: middle;
      font-size: 24px;
      font-weight: 400;
    }

    img {
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }
  }

  .login-page__wrapper {
    position: relative;
    width: 380px;
    border-radius: 8px;
    border: 1px solid #dadce0;
    margin: 150px auto 0;
    padding: 48px 40px 36px;
    font-size: 14px;

    label {
      display: inline-block;
      font-weight: 600;
      margin-bottom: 5px;
      color: $green;
    }

    input {
      display: block;
      width: 100%;
      height: 40px;
      margin-bottom: 28px;
      padding: 6px 8px;
      border: 1px solid #dadce0;
      border-radius: 4px;
      color: #202124;
      line-height: 24px;
      font-size: 16px;
      outline: none;
      background-color: transparent;

      &.error {
        border: 1px solid red;
      }
    }
  }

  .login-page__wrapper-clue {
    margin: 30px auto 0;
    padding: 10px 20px;

    p {
      text-align: center;
    }

    b {
      font-weight: 900;
      color: $green;
      font-size: 18px;
    }

    span {
      user-select: none;
      display: inline-block;
      width: 130px;
    }
  }

  .login-page__button-wrap {
    text-align: center;

    button {
      max-width: 246px;
    }
  }
</style>
