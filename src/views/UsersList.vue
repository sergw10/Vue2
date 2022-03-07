<template>
  <div>

    <header class="wrapper header">
      <div class="breadcrumbs__wrapper">
        <a href="/users">Users</a>
      </div>

      <div class="header__log-out">
        <router-link :to="{name: 'LoginPage'}">
          <button @click="signOut()" type="button" class="btn-green">Log Out</button>
        </router-link>
      </div>
    </header>

    <div class="users-list__wrapper wrapper">

      <div v-for="user in USERS" :key="user.id" class="user-item">
        <h3 class="user-item__name">{{ user.name }}</h3>
        <p class="user-item__username">
          <span>Username: </span>
          <span class="user-item__username-link">{{ user.username }}</span>
        </p>
        <div class="user-item__user-id">
          <router-link class="user-item__user-id-link" :to="{ name: 'SingleUserPage', params: {id: user.id}}">
            <span>ID: {{ user.id }}</span>
          </router-link>
        </div>
        <br>
        <p>
          <span>Email: </span>
          <a :href="`mailto:` + user.email" class="user-item__email">{{ user.email }}</a>
        </p>
        <p>
          <span>Phone: </span>
          <a :href="`tel:` + user.phone" class="user-item__phone">{{ user.phone }}</a>
        </p>
        <p>
          <span>Website: </span>
          <a :href="`http://` + user.website" target="_blank" class="user-item__website">{{ user.website }}</a>
        </p>
        <div class="user-item__btn-wrapper">
          <router-link :to="{ name: 'SingleUserPage', params: {id: user.id}}">
            <button type="button">{{ userItemBtnText }}</button>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UsersListPage',

  data () {
    return {
      userItemBtnText: 'More...'
    }
  },

  methods: {
    ...mapActions([
      'getUsers'
    ]),

    signOut () {
      localStorage.setItem('signIn', false)
    }
  },

  computed: {
    ...mapGetters([
      'USERS'
    ])
  },

  mounted () {
    this.getUsers()
  }
}
</script>

<style lang="scss" scoped>
  // Variables
  $border-color: #dadce0;
  $green: #42b983;

  .users-list__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .user-item {
    position: relative;
    min-width: 400px;
    border-radius: 8px;
    border: 1px solid $border-color;
    margin: 0 15px 30px;
    padding: 18px;
    font-size: 16px;

    p {
      margin-bottom: 7px;

      & > span {
        display: inline-block;
        min-width: 100px;
      }
    }
  }

  .user-item__btn-wrapper {
    text-align: right;
  }

  .user-item__name {
    font-weight: 600;
    font-size: 24px;
    color: $green;
    margin-bottom: 4px;
  }

  .user-item__user-id {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 46px;
    height: 46px;
    text-align: center;
    font-size: 14px;
    padding-top: 14px;
    border: 1px solid $border-color;
    border-radius: 50%;
    transition: .5s;

    &:hover {
      background-color: rgba($green, .3);
      border-color: $green;
    }
  }

  .user-item__username {
    font-size: 13px;
  }

  .user-item__username-link {
    font-weight: 600;
  }
</style>
