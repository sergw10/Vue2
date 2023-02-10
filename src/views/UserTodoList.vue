<template>
  <div>
    <div class="user-todo--page container">

      <!-- Current User Info -->
      <div class="user-info--wrapper">
        <div class="user-info--block">
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
        </div>

        <div class="user-info--block">
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
      </div>

      <div class="todo-list--wrapper">

        <!-- To-Do Table Settings -->
        <div class="todo-list--table-settings">
          <div class="filter-title--wrap">
            <label for="title-search--field">Search</label>
            <input id="title-search--field" class="title-search--field" placeholder="Search title..." type="text">
          </div>

          <div class="selects-wrap">
            <div class="filter-status--select-wrap">
              <label for="filter-status--select">Select Status</label>
              <select id="filter-status--select"
                      class="filter-status--select"
                      @change="onChangeStatusSelect($event)"
                      v-model="statusFilterSelect">
                <option disabled selected value="">--- select status ---</option>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
                <option value="favorites">Favorites</option>
              </select>
            </div>

            <div class="filter-userId--select-wrap">
              <label for="filter-userId--select">Select User ID</label>
              <select id="filter-userId--select"
                      class="filter-userId--select"
                      @change="onChangeUserIdSelect($event)"
                      v-model="userIdFilterSelect">
                <option selected value="">--- empty value ---</option>
                <option v-for="option in userIdFilterSelectOptions"
                        v-bind:value="option.value"
                        :key="option.id">{{ option.text }}</option>
              </select>
            </div>
          </div>

          <div class="table-settings--btn-wrapper">
            <button @click="openPopupNewTodo()" type="button" class="open-popup--btn btn-green">Create Todo</button>
            <button @click="openPopupNewTodo()" type="button" class="open-popup--btn-mobile btn-green">+</button>
          </div>
        </div>

        <!-- To-Do Table -->
        <div class="todo-list--table">

          <!-- Table Header -->
          <div class="todo-list--table-header">
            <div class="todo-list--table-item-id">
              <span class="text">Item ID</span>
              <span class="mobile-text">I/ID</span>
            </div>
            <div class="todo-list--table-item-userId">
              <span class="text">User ID</span>
              <span class="mobile-text">U/ID</span>
            </div>
            <div class="todo-list--table-item-title">Title</div>
            <div class="todo-list--table-item-favorite">Favorites</div>
            <div class="todo-list--table-item-status">Status</div>
          </div>

          <!-- Table Body -->
          <div class="todo-list--table-body" v-if="searchResultList.length">
            <div v-for="todoItem in searchResultList" :key="todoItem.id" class="todo-list--table-item">
              <div class="todo-list--table-item-id">
                <span>{{ todoItem.id }}</span>
              </div>

              <div class="todo-list--table-item-userId">
                <span>{{ todoItem.userId }}</span>
              </div>

              <div class="todo-list--table-item-title">
                <span>{{ todoItem.title }}</span>
              </div>

              <div class="todo-list--table-item-favorite">
                <button v-if="todoItem.favorites" @click="removeItemFromFavorite(todoItem.id)" type="button">&hearts;</button>
                <button v-else @click="addItemToFavorite(todoItem.id)" type="button">&#9825;</button>
              </div>

              <div class="todo-list--table-item-status text-green" v-if="todoItem.completed">Completed</div>
              <div class="todo-list--table-item-status text-red" v-else>Uncompleted</div>

              <!-- For mobile -->
              <div class="todo-list--table-item-status-mobile text-green" v-if="todoItem.completed"><div></div></div>
              <div class="todo-list--table-item-status-mobile text-red" v-else><div></div></div>
            </div>
          </div>
          <div class="todo-list--table-body" v-else>
            <div class="todo-list--table-empty-text">No data found... :(</div>
          </div>

        </div>
      </div>

      <div :class="{ 'open': isAddNewItemPopupOpen }" class="modal-popup--wrapper">
        <div class="new-todo--popup-wrap">

          <button @click="closeModal()" class="close-modal--btn" type="button">
            <div></div>
            <div></div>
          </button>

          <p class="new-todo--popup-title">New Todo item</p>

          <div class="new-todo--user-id-wrap">
            <label for="new-todo--user-id">User ID</label>
            <input id="new-todo--user-id"
                   @keypress="isNumber($event)"
                   name="new-todo--user-id"
                   v-model="newTodoUserId"
                   maxlength="6"
                   type="text">
          </div>

          <div class="new-todo--title-wrap">
            <label for="new-todo--title">Title</label>
            <textarea id="new-todo--title"
                      v-model="newTodoTitle"
                      maxlength="220"
                      name="new-todo--title"></textarea>
          </div>

          <div class="new-todo--btn-wrap">
            <button @click="addNewTodoItemToState()" class="new-todo--add-btn btn-green" type="button">Add</button>
            <button @click="closeModal()" class="new-todo--cancel-btn btn-red" type="button">Cancel</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserTodoList',

  data () {
    return {
      searchResultList: [],
      searchOptions: {
        title: '',
        status: 'all',
        userId: ''
      },

      /* Select */
      statusFilterSelect: '',
      userIdFilterSelect: '',
      userIdFilterSelectOptions: {},

      /* Popup */
      isAddNewItemPopupOpen: false,
      newTodoUserId: '',
      newTodoTitle: ''
    }
  },

  computed: {
    ...mapGetters([
      'ALL_USERS',
      'CURRENT_USER',
      'All_TODO_ITEMS'
    ])
  },

  methods: {
    onChangeStatusSelect (event) {
      this._setSearchOptions(this.searchOptions.title, event.target.value, this.searchOptions.userId)
      this._filterSearchResultItems()
    },

    _filterSearchResultItems () {
      const searchOptionUserId = this.searchOptions.userId

      /* Status filtering */
      if (this.searchOptions.status === 'all') {
        this.searchResultList = this.All_TODO_ITEMS
      } if (this.searchOptions.status === 'completed') {
        this.searchResultList = this.All_TODO_ITEMS.filter((todoItem) => {
          return todoItem.completed === true
        })
      } else if (this.searchOptions.status === 'uncompleted') {
        this.searchResultList = this.All_TODO_ITEMS.filter((todoItem) => {
          return todoItem.completed === false
        })
      } else if (this.searchOptions.status === 'favorites') {
        this.searchResultList = this.All_TODO_ITEMS.filter((todoItem) => {
          return todoItem?.favorites === true
        })
      }

      /* User Id filtering */
      if (this.searchOptions.userId !== '') {
        this.searchResultList = this.searchResultList.filter((todoItem) => {
          return +todoItem.userId === +searchOptionUserId
        })
      }
    },

    onChangeUserIdSelect (event) {
      this._setSearchOptions(this.searchOptions.title, this.searchOptions.status, event.target.value)
      this._filterSearchResultItems()
    },

    _setSearchOptions (title, status, userId) {
      this.searchOptions = {
        title,
        status,
        userId
      }
    },

    _setIdsToSelect () {
      for (let i = 0; i < this.ALL_USERS.length; i++) {
        this.userIdFilterSelectOptions[i] = {
          value: this.ALL_USERS[i].id,
          text: this.ALL_USERS[i].id
        }
      }
    },

    _setTodoItemsInTableFromState () {
      this.searchResultList = this.All_TODO_ITEMS
    },

    _addNewIdToUserIdSelect (NewId) {
      const newIndex = this.userIdFilterSelectOptions.length + 1
      this.userIdFilterSelectOptions[newIndex] = {
        value: NewId,
        text: NewId
      }
    },

    addNewTodoItemToState () {
      if (this.newTodoUserId === '') return
      if (this.newTodoTitle === '') return

      const newTodoOptions = {
        userId: this.newTodoUserId,
        title: this.newTodoTitle,
        id: this.All_TODO_ITEMS.length + 1,
        completed: false,
        favorites: false
      }

      this.$store.commit('setNewTodoItem', newTodoOptions)
      this._addNewIdToUserIdSelect(this.newTodoUserId)

      this.closeModal()
    },

    addItemToFavorite (todoItemId) {
      this.$store.commit('addFavoriteItemToState', +todoItemId)
      this.$forceUpdate()
      this._setTodoItemsInTableFromState()
    },

    removeItemFromFavorite (todoItemId) {
      this.$store.commit('removeFavoriteItemFromState', +todoItemId)
      this.$forceUpdate()
      this._setTodoItemsInTableFromState()
    },

    isNumber (event) {
      const charCode = (event.which) ? event.which : event.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        event.preventDefault()
      } else {
        return true
      }
    },

    openPopupNewTodo () {
      this.isAddNewItemPopupOpen = true
    },

    closeModal () {
      this.isAddNewItemPopupOpen = false
      this.newTodoUserId = ''
      this.newTodoTitle = ''
    }
  },

  mounted () {
    this._setTodoItemsInTableFromState()
    this._setIdsToSelect()
  }
}
</script>

<style lang="scss" scoped>
  /* Variables */
  $red: #ce2525;
  $dark-red: #a60202;

  .user-todo--page {
    display: flex;
    align-items: flex-start;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  /* User info */
  .user-info--wrapper {
    width: 400px;
    padding: 20px 25px;
    border-radius: 5px;
    background-color: white;
  }

  .user-info--item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 4px;
  }

  .user-info--item-title {
    display: inline-block;
    min-width: 96px;
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

  .todo-list--wrapper {
    width: 1180px;
    margin-left: 20px;
  }

  /* Table Navigation */
  .todo-list--table-settings {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    border-radius: 5px;
    padding: 20px 25px;
    margin-bottom: 15px;
    background-color: white;

    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 3px;
      letter-spacing: 0.03em;
    }
  }

  /* Search */
  .filter-title--wrap {
  }

  /* Select */
  .selects-wrap {
    display: flex;
  }

  .filter-status--select-wrap,
  .filter-userId--select-wrap {
    margin: 0 20px;

    select {
      min-width: 120px;
      height: 30px;
      padding: 4px;
      border: 1px solid #b6b3b3;
      border-radius: 4px;
      font-size: 15px;
      color: black;
      cursor: pointer;
    }
  }

  .title-search--field {
    transition: border 0.4s ease;
    max-width: 220px;
    height: 30px;
    padding: 4px 10px;
    border: 1px solid #b6b3b3;
    border-radius: 4px;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.02em;
    outline: none;
    color: #353535;
    background-color: white;

    &:focus {
      border-color: #313131;
    }

    &::placeholder {
      color: lightgrey;
    }

    &::-webkit-input-placeholder       {opacity: 1; transition: opacity 0.3s ease;}
    &:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.3s ease;}
  }

  .table-settings--btn-wrapper {
    align-self: flex-end;
  }

  /* Table */
  .todo-list--table {
    border-radius: 5px;
    padding: 10px 25px;
    background-color: white;
  }

  .todo-list--table-header {
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
    border-bottom: 1px solid grey;
    margin-bottom: 8px;
    padding: 5px 10px;
    font-weight: 600;

    .todo-list--table-item-favorite {
      text-align: left;
    }
    .todo-list--table-item-status {
      padding-right: 20px;
    }
  }

  .todo-list--table-body {
    min-height: 450px;
    max-height: 650px;
    overflow: hidden auto;
    padding-right: 5px;
    margin-bottom: 8px;

    .todo-list--table-item-status-mobile {
      display: none;
      width: 15%;
      height: 14px;
      margin-top: 4px;
      padding-right: 15px;
      text-align: right;

      &.text-red {
        div {
          background-color: red;
        }
      }

      &.text-green {
        div {
          background-color: #25a50f;
        }
      }

      div {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%
      }
    }
  }

  .todo-list--table-empty-text {
    text-align: center;
    margin: 20px 0 0;
    font-size: 18px;
    font-weight: 600;
  }

  .todo-list--table-item {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    border: 1px solid lightgrey;
    border-radius: 5px;
    margin-bottom: 8px;
    padding: 8px 10px;
  }

  .todo-list--table-item-id,
  .todo-list--table-item-userId {
    width: 10%;

    .mobile-text {
      display: none;
    }
  }

  .todo-list--table-item-title {
    width: 55%;
    word-wrap: break-word;
  }

  .todo-list--table-item-favorite {
    width: 10%;
    text-align: center;

    button {
      transition: .3s ease;
      min-width: 34px;
      width: 34px;
      min-height: 34px;
      height: 34px;
      padding: 4px 0 0;
      border-radius: 50%;
      background-color: white;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }

  .todo-list--table-item-status {
    width: 15%;
    text-align: right;
    font-weight: 600;
  }

  .text-green {
    color: #25a50f;
  }

  .text-red {
    color: red;
  }

  /* Modal popup */
  .modal-popup--wrapper {
    display: none;
    opacity: 0;
    transition: all 0.5s ease-in;
    align-items: flex-start;
    justify-content: center;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.70);

    &.open {
      display: flex;
      opacity: 1;
    }
  }

  .new-todo--popup-wrap {
    position: relative;
    width: 300px;
    margin: 120px auto 0;
    padding: 20px 25px;
    border-radius: 5px;
    background-color: white;

    label {
      display: block;
      margin-bottom: 4px;
    }

    input,
    textarea {
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
    }

    textarea {
      min-height: 90px;
      resize: vertical;
    }
  }

  .close-modal--btn {
    position: absolute;
    top: -12px;
    right: -12px;
    padding: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $red;

    &:hover {
      background-color: $dark-red;
    }

    div {
      position: relative;
      width: 16px;
      height: 2px;
      margin: 0 auto;
      background-color: white;

      &:first-child {
        top: 1px;
        transform: rotate(-45deg);
      }
      &:last-child {
        top: -1px;
        transform: rotate(45deg);
      }
    }
  }

  .open-popup--btn-mobile {
    display: none;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 0;
    margin: 0 0 0 auto;
    font-size: 25px;
  }

  .new-todo--popup-title {
    text-align: center;
    margin-bottom: 20px;
  }

  .new-todo--user-id-wrap {
    margin-bottom: 20px;
  }

  .new-todo--btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;

    button {
      min-width: 110px;
    }
  }

  @media (max-width: 1150px) {
    .user-info--wrapper {
      min-width: 280px;
    }

    .todo-list--wrapper {
      margin-left: 15px;
    }

    .todo-list--table-item-userId {
      width: 12%;
    }

    .todo-list--table-item-title {
      width: 48%;
    }

    .todo-list--table-item-favorite {
      width: 15%;
    }
  }

  @media (max-width: 1130px) {
    .user-todo--page {
      margin-top: 15px;
      margin-bottom: 60px;
      flex-wrap: wrap;
    }

    .user-info--wrapper {
      display: flex;
      width: 100%;
      margin-bottom: 15px;
      padding: 15px;
    }

    .user-info--block {
      width: 50%;
      padding-right: 15px;

      br {
        display: none;
      }
    }

    .todo-list--wrapper {
      margin-left: 0;
    }

    .todo-list--table-settings {
      padding: 15px;
    }

    .todo-list--table {
      padding: 10px 15px;
    }
  }

  @media (max-width: 840px) {
    .filter-userId--select-wrap {
      margin-right: 0;
    }

    .open-popup--btn {
      display: none;
    }

    .open-popup--btn-mobile {
      padding-top: 2px;
      display: flex;
    }
  }

  @media (max-width: 730px) {
    .todo-list--table-settings {
      position: relative;
      flex-direction: column-reverse;
    }

    .todo-list--table-item-userId,
    .todo-list--table-item-id {

      .text {
        display: none;
      }

      .mobile-text {
        display: inline;
      }
    }

    .todo-list--table-header {

      .todo-list--table-item-favorite {
        display: none;
      }

      .todo-list--table-item-status {
        width: 30%;
      }
    }

    .todo-list--table-body {

      .todo-list--table-item-status {
        display: none;
      }

      .todo-list--table-item-status-mobile {
        display: inline-block;
      }
    }

    .selects-wrap {
      width: 100%;
      padding-right: 55px;
    }

    .table-settings--btn-wrapper {
      position: absolute;
      top: 25px;
      right: 15px;
    }

    .filter-title--wrap,
    .title-search--field {
      width: 100%;
      max-width: none;
    }

    .filter-title--wrap {
      margin-top: 15px;
    }

    .filter-status--select-wrap {
      margin: 0;
    }

    .filter-userId--select-wrap {
      margin: 0 30px;
    }
  }

  @media (max-width: 600px) {
    .user-info--wrapper {
      flex-wrap: wrap;
    }
    .user-info--block {
      width: 100%;
      padding: 0;
    }
  }

  @media (max-width: 500px) {
    .selects-wrap {
      flex-wrap: wrap;
      flex-direction: column;
    }

    .filter-status--select-wrap {
      margin-bottom: 15px;
    }

    .filter-userId--select-wrap {
      margin: 0;
    }

    .filter-status--select-wrap,
    .filter-userId--select-wrap {

      select {
        min-width: 0;
        width: 200px;
      }
    }
  }

  @media (max-width: 400px) {
    .filter-status--select-wrap,
    .filter-userId--select-wrap {

      select {
        width: 100%;
      }
    }
  }
</style>
