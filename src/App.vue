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
  $body-background-color: #828282;
  $border-color: #dadce0;
  $green: #519945;
  $dark-green: #3b7032;

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

  html, body {
    height: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    -webkit-text-size-adjust: none;
    font-size: 16px;
    line-height: 1.154;
    letter-spacing: .25px;
    font-weight: 400;
    background-color: $body-background-color;
  }

  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style-type: none;
  }

  a {
    display: inline-block;
    text-decoration: underline;
    transition: .4s;
    color: $green;

    &:hover {
      color: $dark-green;
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
    border: 0;
    outline: 0;
    transition: .3s;
    cursor: pointer;

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
    -webkit-text-fill-color: #363b43 !important;

    &, &:hover, &:focus, &:active {
      -webkit-box-shadow: 0 0 0 20px white inset !important;
    }
  }

  /* Classes */
  .main-wrapper {
    min-height: 100%;
    padding-bottom: 270px;
  }

  .header {
    width: 100%;
    height: 60px;
    background-color: #474747;
  }

  .footer {
    width: 100%;
    margin-top: -270px;
    height: 270px;
    background-color: #474747;
  }

  .container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 15px;
  }
</style>
