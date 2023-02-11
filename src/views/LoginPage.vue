<template>
  <div>

    <div class="login-page--wrapper">

      <div class="login-page--title">
        <img src="@/assets/logo.png" alt="Vue logo">
        <h1>{{ loginPage.form.title }}</h1>
      </div>

      <form id="form" class="login-page--form" @submit.prevent>
        <p class="form-description">{{ loginPage.form.description }}</p>
        <div class="login-page--input-block" :class="{ error: !loginPage.isValidUserName }">
          <input id="username"
                 type="text"
                 :placeholder="loginPage.form.usernamePlaceholder"
                 @keypress="noDigits($event)"
                 v-model="loginPage.usernameValue">
          <span class="error-text">Error name</span>
        </div>
        <div class="login-page--input-block" :class="{ error: !loginPage.isValidPhone}">
          <input id="phoneNumber"
                 type="text"
                 :placeholder="loginPage.form.phoneNumberPlaceholder"
                 v-model.trim="loginPage.userPhoneNumberValue">
          <span class="error-text">Error phone</span>
        </div>
        <div class="login-page--button-wrap">
          <button @click="logIn()" class="btn-green" type="button">{{ loginPage.form.btnText }}</button>
        </div>
      </form>
    </div>

    <div class="login-page--wrapper login-page--wrapper-clue">
      <span>If you don't remember... </span>
      <b class="bold-text">
        <a target="_blank" href="https://jsonplaceholder.typicode.com/users">Users</a>
      </b>
      <br>
      <br>
      <div>
        <span>Test username: </span>
        <b class="bold-text">{{ loginPage.usernameExample }}</b>
      </div>
      <br>
      <div>
        <span>Test phone number: </span>
        <b class="bold-text">{{ loginPage.phoneNumberExample }}</b>
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
        isValidUserName: true,
        isValidPhone: true,

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
    this.getAllTodoItems()
  },

  computed: {
    ...mapGetters([
      'ALL_USERS',
      'All_TODO_ITEMS'
    ])
  },

  methods: {
    ...mapActions([
      'getUsers',
      'getAllTodoItems'
    ]),

    _defineCurrentUser () {
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

    _validateUserName () {
      const usernameValue = this.loginPage.usernameValue

      const result = this.ALL_USERS.some(function (users) {
        return users.username === usernameValue
      })

      this.loginPage.isValidUserName = result
      return result
    },

    _validatePhoneNumber () {
      const userPhoneNumberValue = this.loginPage.userPhoneNumberValue

      const result = this.ALL_USERS.some(function (users) {
        return users.phone === userPhoneNumberValue
      })

      this.loginPage.isValidPhone = result
      return result
    },

    _validateForm () {
      return this._validateUserName() && this._validatePhoneNumber()
    },

    noDigits (event) {
      if ('1234567890'.indexOf(event.key) !== -1) event.preventDefault()
    },

    logIn () {
      if (this._validateForm()) {
        this._defineCurrentUser()
        this._setCurrentUserToState()

        this.$router.push({
          name: 'UserTodoListPage',
          params: {
            id: this.loginPage.currentUser.id
          }
        })

        this.loginPage.usernameValue = ''
        this.loginPage.userPhoneNumberValue = ''
      }
    },

    _setCurrentUserToState () {
      this.$store.commit('setCurrentUser', this.loginPage.currentUser)
    }
  }
}
</script>

<style lang="scss" scoped>
  /* Variables */
  $green: #519945;
  $dark-green: #3b7032;

  .login-page--title {
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

  .login-page--form {
    padding: 15px 25px 30px;

    .form-description {
      margin-bottom: 14px;
      font-size: 15px;
      line-height: 21px;
      color: #5F5F5F;
    }
  }

  .login-page--wrapper {
    overflow: hidden;
    position: relative;
    max-width: 447px;
    border: 0;
    border-radius: 5px;
    margin: 100px auto 0;
    font-size: 14px;
    background-color: #C4C4C4;
  }

  .login-page--input-block {
    margin-bottom: 20px;

    &.error {
      input {
        border-color: red;
      }

      .error-text {
        display: inline-block;
      }
    }

    .error-text {
      display: none;
      margin-top: 4px;
      font-size: 14px;
      color: red;
    }

    input {
      transition: border 0.4s ease;
      display: block;
      width: 100%;
      height: 40px;
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

  .login-page--button-wrap {
    text-align: center;
    margin-top: 25px;

    button {
      width: 397px;
      height: 41px;
    }
  }

  .login-page--wrapper-clue {
    padding: 20px 25px 15px 25px;
    margin: 100px auto 150px;

    span {
      user-select: none;
    }

    .bold-text {
      font-weight: 600;
    }
  }

  @media (max-width: 515px) {
    .login-page--button-wrap button {
      width: 100%;
    }

    .login-page--wrapper {
      margin-top: 50px;
      max-width: 90%;
    }
  }

  @media (max-width: 400px) {
    .login-page--form {
      padding: 15px 15px 25px;
    }
  }
</style>
