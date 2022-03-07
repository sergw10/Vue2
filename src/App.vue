<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  // Variables
  $dark-text: #363b43;
  $border-color: #dadce0;
  $green: #42b983;

  // Reset CSS
  *, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  html, body, div, span, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, img, b, i, ol, ul, li, form, label, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, footer, header, hgroup, menu, nav, section, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style-type: none;
  }

  a {
    display: inline-block;
    text-decoration: none;
    transition: hover .7s;
    color: $green;
    &:hover {
      color: #3ca172;
      text-decoration: underline;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button[type="button"] {
    display: inline-block;
    text-align: center;
    padding: 8px 24px;
    border-radius: 4px;
    border: 1px solid $border-color;
    background-color: transparent;
    outline: 0;
    font-weight: 600;
    letter-spacing: .25px;
    transition: .3s;
    color: $green;
    cursor: pointer;
    &:hover {
      background-color: #f7f8f8;
    }
    &:active {
      background-color: rgba(95,99,104,0.1);
      box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15);
    }

    &.btn-green {
      color: white;
      background-color: $green;
      &:hover {
        background-color: #4ccd92;
      }
      &:active {
        background-color: #3ca172;
        box-shadow: 0 1px 2px 0 rgba(66,185,131,.3), 0 2px 6px 2px rgba(66,185,131,0.15);
      }
    }
  }

  textarea {
    resize: none;

    &:focus {
      outline: 0;
    }
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: $dark-text !important;

    &, &:hover, &:focus, &:active {
      -webkit-box-shadow: 0 0 0 20px white inset !important;
    }
  }

  body {
    font-family: 'Open Sans', sans-serif;
    -webkit-text-size-adjust: none;
    font-size: 13px;
    line-height: 1.154;
    letter-spacing: .25px;
    font-weight: 400;
    color: $dark-text;
  }

  .wrapper {
    display: block;
    width: 96%;
    border-radius: 8px;
    border: 1px solid $border-color;
    margin: 0 auto;
    padding: 36px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 20px 36px;
    margin: 20px auto;
  }

  .breadcrumbs__wrapper {
    font-weight: 600;
    padding-top: 10px;
  }

  .delimeter {
    display: inline-block;
    position: relative;
    top: .5px;
    margin: 0 8px;
    font-weight: 600;
    color: $green;
  }
</style>
