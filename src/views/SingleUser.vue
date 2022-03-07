<template>
  <div>

    <header class="wrapper header">
      <div class="breadcrumbs__wrapper">
        <a href="/users">Users</a>
        <span class="delimeter"> > </span>
        <a :href="`/users/` + userId">User (id:{{ userId }})</a>
      </div>

      <div class="header__log-out">
        <router-link :to="{name: 'LoginPage'}">
          <button @click="signOut()" type="button" class="btn-green">Log Out</button>
        </router-link>
      </div>
    </header>

    <div class="single-user__wrapper wrapper">
      <h1>Info</h1>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Name: </p>
        <span>{{ CERTAIN_USER.name }}</span>
      </div>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Username: </p>
        <span>{{ CERTAIN_USER.username }}</span>
      </div>
      <hr>
      <br>

      <h1>Address</h1>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Street: </p>
        <span>{{ CERTAIN_USER.address.street }}</span>
      </div>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Suite: </p>
        <span>{{ CERTAIN_USER.address.suite }}</span>
      </div>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">City: </p>
        <span>{{ CERTAIN_USER.address.city }}</span>
      </div>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Zipcode: </p>
        <span>{{ CERTAIN_USER.address.zipcode }}</span>
      </div>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Geo Lat: </p>
        <span>{{ CERTAIN_USER.address.geo.lat }}</span>
      </div>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Geo Lng: </p>
        <span>{{ CERTAIN_USER.address.geo.lng }}</span>
      </div>
      <hr>
      <br>

      <h1>Contact Us</h1>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Phone: </p>
        <a :href="`tel:` + CERTAIN_USER.phone">{{ CERTAIN_USER.phone }}</a>
      </div>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Email: </p>
        <a :href="`mailto:` + CERTAIN_USER.email">{{ CERTAIN_USER.email }}</a>
      </div>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Website: </p>
        <a :href="`http://` + CERTAIN_USER.website">{{ CERTAIN_USER.website }}</a>
      </div>
      <hr>
      <br>

      <h1>Company</h1>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Name: </p>
        <span>{{ CERTAIN_USER.company.name }}</span>
      </div>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">CatchPhrase: </p>
        <span>{{ CERTAIN_USER.company.catchPhrase }}</span>
      </div>
      <div class="single-user__text-wrap">
        <p class="single-user__text-label">Bs: </p>
        <span>{{ CERTAIN_USER.company.bs }}</span>
      </div>
    </div>

    <div class="wrapper single-user__posts-wrapper">
      <h1>
        <span>{{ CERTAIN_USER.name }}</span>
        <span> Posts</span>
      </h1>
      <div>
        <router-link
          class="single-user__post"
          :to="{ name: 'UsersListPage' }"
          v-for="post in filterUsersPosts"
          :key="post.id">
          <p class="single-user__post-title">{{ post.title }}</p>
          <p>{{ post.body }}</p>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SingleUserPage',

  data () {
    return {
      userId: ''
    }
  },

  methods: {
    ...mapActions([
      'getUser',
      'getPosts'
    ]),

    signOut () {
      localStorage.setItem('signIn', false)
    },

    getUserId () { return Number(this.userId) }
  },

  computed: {
    ...mapGetters([
      'CERTAIN_USER',
      'POSTS'
    ]),

    filterUsersPosts () {
      return this.POSTS.filter((post) => {
        return post.userId === this.getUserId()
      })
    }
  },

  created () {
    this.userId = this.$route.params.id
  },

  mounted () {
    this.getUser(this.userId)
    this.getPosts()
  }
}
</script>

<style lang="scss" scoped>
  // Variables
  $dark-text: #363b43;
  $border-color: #dadce0;
  $green: #42b983;

  .single-user__wrapper {
    margin-bottom: 20px;

    h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      color: $green;
    }

    hr {
      border-color: $green;
      margin-top: 30px;
    }
  }

  .single-user__text-wrap {
    margin-bottom: 4px;
  }

  .single-user__text-label {
    display: inline-block;
    width: 200px;
  }

  .single-user__posts-wrapper {
    padding-bottom: 0;
    margin-bottom: 20px;

    h1 {
      font-size: 24px;
      margin-bottom: 30px;
    }
  }

  a.single-user__post {
    display: block;
    border-radius: 8px;
    border: 1px solid $border-color;
    margin: 0 auto;
    padding: 15px;
    margin-bottom: 20px;
  }

  .single-user__post-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }
</style>
