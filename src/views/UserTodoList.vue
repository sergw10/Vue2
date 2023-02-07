<template>
  <div>
    <div class="user-todo--page container">

      <!-- Current User Info -->
      <div class="user-info--wrapper">
        <div class="user-info--item">
          <span class="user-info--item-title">Username:</span>
          <span>{{ CURRENT_USER.username }}</span>
        </div>
        <div class="user-info--item">
          <span class="user-info--item-title">Name:</span>
          <span>{{ CURRENT_USER.name }}</span>
        </div>
        <div class="user-info--item">
          <span class="user-info--item-title">User ID:</span>
          <span>{{ CURRENT_USER.id }}</span>
        </div>

        <br>

        <div class="user-info--item">
          <span class="user-info--item-title">Email:</span>
          <span>
            <a class="user-info--item-link" :href="`mailto:` + CURRENT_USER.email">{{ CURRENT_USER.email }}</a>
          </span>
        </div>
        <div class="user-info--item">
          <span class="user-info--item-title">Phone:</span>
          <span>
            <a class="user-info--item-link" :href="`tel:` + CURRENT_USER.phone">{{ CURRENT_USER.phone }}</a>
          </span>
        </div>
        <div class="user-info--item">
          <span class="user-info--item-title">Website:</span>
          <span>
            <a class="user-info--item-link" :href="`http://` + CURRENT_USER.website">{{ CURRENT_USER.website }}</a>
          </span>
        </div>

        <br>

        <div class="user-info--item">
          <span class="user-info--item-title">City:</span>
          <span>{{ CURRENT_USER.address.city }}</span>
        </div>
        <div class="user-info--item">
          <span class="user-info--item-title">Street:</span>
          <span>{{ CURRENT_USER.address.street }}</span>
        </div>
        <div class="user-info--item">
          <span class="user-info--item-title">Suite:</span>
          <span>{{ CURRENT_USER.address.suite }}</span>
        </div>
        <div class="user-info--item">
          <span class="user-info--item-title">Zipcode:</span>
          <span>{{ CURRENT_USER.address.zipcode }}</span>
        </div>

        <br>

        <div class="user-info--item">
          <span class="user-info--item-title">Geo lat:</span>
          <span>{{ CURRENT_USER.address.geo.lat }}</span>
        </div>
        <div class="user-info--item">
          <span class="user-info--item-title">Geo lng:</span>
          <span>{{ CURRENT_USER.address.geo.lng }}</span>
        </div>
      </div>

      <!-- To-Do List Table -->
      <div class="todo-list--wrapper">
        <div class="todo-list--table">

          <!-- Table Header -->
          <div class="todo-list--table-item todo-list--table-header">
            <div class="todo-list--table-item-id">ID</div>
            <div class="todo-list--table-item-title">Title</div>
            <div class="todo-list--table-item-status">Status</div>
          </div>

          <!-- Table Body -->
          <div v-for="todoItem in todoItemsForCurrentUser" :key="todoItem.id" class="todo-list--table-item">
            <div class="todo-list--table-item-id">
              <span>{{ todoItem.id }}</span>
            </div>
            <div class="todo-list--table-item-title">
              <span>{{ todoItem.title }}</span>
            </div>
            <div class="todo-list--table-item-status">
              <span>{{ todoItem.completed }}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserTodoList',

  data () {
    return {
      todoItemsForCurrentUser: []
    }
  },

  methods: {
    ...mapActions([
      'getTodoItems'
    ]),

    setFilterTodoItemsToData () {
      this.todoItemsForCurrentUser = this.filterTodoItemsForCurrentUser()
    },

    filterTodoItemsForCurrentUser () {
      const userId = this.CURRENT_USER.id

      return this.All_TODO_ITEMS.filter((todoItem) => {
        return todoItem.userId === userId
      })
    },

    signOut () {
      localStorage.setItem('signIn', false)
    }
  },

  computed: {
    ...mapGetters([
      'CURRENT_USER',
      'All_TODO_ITEMS'
    ])
  },

  mounted () {
    this.getTodoItems()
    this.filterTodoItemsForCurrentUser()
    this.setFilterTodoItemsToData()
  }
}
</script>

<style lang="scss" scoped>
  .user-todo--page {
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    align-items: flex-start;
  }

  /* User info */
  .user-info--wrapper,
  .todo-list--wrapper {
    padding: 30px;
    border-radius: 5px;
    background-color: #C4C4C4;
  }

  .user-info--wrapper {
    width: 500px;
  }

  .user-info--item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 4px;
  }

  .user-info--item-title {
    display: inline-block;
    width: 96px;
    font-weight: 600;
  }

  .user-info--item-link {
    color: #25a50f;
    text-decoration: underline;

    &:hover {
      color: #3b7032;
    }
  }

  /* List */
  .todo-list--wrapper {
    width: 1270px;
    margin-left: 30px;
  }

  .todo-list--table-item {
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
    padding: 2px 0;

    &.todo-list--table-header {
      border-bottom: 1px solid black;
    }
  }

  .todo-list--table-item-id,
  .todo-list--table-item-title,
  .todo-list--table-item-status {
    width: 33.33%;
  }

  .todo-list--table-item-status {
    text-align: right;
  }
</style>
