<template>
  <div>

    <div class="login-page__wrapper">

      <div class="login-page__title">
        <img src="@/assets/logo.png" alt="Vue logo">
        <h1>{{ loginPage.form.title }}</h1>
      </div>

      <form id="form" class="login-page__form" @submit.prevent>
        <p>{{ loginPage.form.description }}</p>
        <input id="username"
               type="text"
               :placeholder="loginPage.form.usernamePlaceholder"
               v-model="loginPage.usernameValue">
        <input id="phoneNumber"
               type="text"
               :placeholder="loginPage.form.phoneNumberPlaceholder"
               v-model="loginPage.userPhoneNumberValue">
        <div class="login-page__button-wrap">
          <button @click="logIn()" type="button">{{ loginPage.form.btnText }}</button>
        </div>
      </form>
    </div>

    <div class="login-page__wrapper login-page__wrapper-clue">
      <p>If you don't remember...</p>
      <br>
      <div>
        <span>Test username: </span>
        <b>{{ loginPage.usernameExample }}</b>
      </div>
      <div>
        <span>Test phone number: </span>
        <b>{{ loginPage.phoneNumberExample }}</b>
      </div>
      <br>
      <div>
        <span>JsonPlaceholder:</span>
        <b><a target="_blank" href="https://jsonplaceholder.typicode.com/users">Users</a></b>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginPage',

  data () {
    return {
      loginPage: {
        /* Data */
        currentUser: {},
        usernameValue: '',
        userPhoneNumberValue: '',

        /* Example text */
        usernameExample: 'Bret',
        phoneNumberExample: '1-770-736-8031 x56442',

        /* Form */
        form: {

          /* Text */
          title: 'Login page',
          description: 'Description',

          /* Inputs */
          usernamePlaceholder: 'Your Username',
          phoneNumberPlaceholder: 'Your Phone',

          /* Button */
          btnText: 'Login'
        }
      }
    }
  },

  created () {
    this.getUsers()
  },

  computed: {
    ...mapGetters([
      'ALL_USERS'
    ])
  },

  methods: {
    ...mapActions([
      'getUsers'
    ]),

    setCurrentUserToState () {
      this.$store.commit('setCurrentUser', this.loginPage.currentUser)
    },

    defineCurrentUser () {
      const usernameValue = this.loginPage.usernameValue
      const userPhoneNumberValue = this.loginPage.userPhoneNumberValue
      let currentUser = {}

      this.ALL_USERS.forEach(function (item) {
        if (item.username === usernameValue && item.phone === userPhoneNumberValue) {
          currentUser = item
        }
      })

      this.loginPage.currentUser = currentUser
    },

    validateUserName () {
      const usernameValue = this.loginPage.usernameValue
      return this.ALL_USERS.some(function (users) {
        return users.username === usernameValue
      })
    },

    validatePhoneNumber () {
      const userPhoneNumberValue = this.loginPage.userPhoneNumberValue
      return this.ALL_USERS.some(function (users) {
        return users.phone === userPhoneNumberValue
      })
    },

    validateForm () {
      return this.validateUserName() && this.validatePhoneNumber()
    },

    logIn () {
      if (this.validateForm()) {
        this.defineCurrentUser()
        this.setCurrentUserToState()

        localStorage.setItem('signIn', true)
      } else {
        localStorage.setItem('signIn', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /* Variables */
  $main-green: #42b983;

  .login-page__title {
    padding: 15px 25px;
    text-align: center;
    background-color: #A5A5A5;

    h1 {
      display: inline-block;
      vertical-align: middle;
      font-size: 17px;
      line-height: 21px;
      color: #5F5F5F;
    }

    img {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }

  .login-page__form {
    padding: 15px 25px 30px;

    p {
      margin-bottom: 14px;
      font-size: 15px;
      line-height: 21px;
      color: #5F5F5F;
    }
  }

  .login-page__wrapper {
    overflow: hidden;
    position: relative;
    max-width: 447px;
    border: 0;
    border-radius: 5px;
    margin: 100px auto 0;
    font-size: 14px;
    background-color: #C4C4C4;

    input {
      display: block;
      width: 100%;
      height: 40px;
      margin-bottom: 20px;
      padding: 6px 10px;
      border: 1px solid #dadce0;
      border-radius: 4px;
      font-size: 17px;
      line-height: 21px;
      letter-spacing: -0.025em;
      outline: none;
      color: #353535;
      background-color: white;

      &::placeholder {
        color: lightgrey;
      }

      &::-webkit-input-placeholder       {opacity: 1; transition: opacity 0.3s ease;}
      &:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.3s ease;}

      &.error {
        border: 1px solid red;
      }
    }
  }

  .login-page__button-wrap {
    text-align: center;
    margin-top: 25px;

    button {
      width: 397px;
      height: 41px;
      border: 0;
      border-radius: 5px;
      font-weight: 600;
      font-size: 17px;
      line-height: 21px;
      letter-spacing: 0.02em;
      background-color: #519945;
      color: white;

      &:hover {
        background-color: #3b7032;
      }

      &:active {
        box-shadow: 0 1px 18px 1px rgba(0, 0, 0, 0.2);
      }
    }
  }

  .login-page__wrapper-clue {
    padding: 20px 25px 15px 25px;
    margin: 100px auto 150px;

    span {
      display: inline-block;
      min-width: 142px;
      margin-bottom: 0;
      user-select: none;
    }

    b {
      font-weight: 600;

      a {
        color: black;
        text-decoration: underline;
      }
    }
  }
</style>
