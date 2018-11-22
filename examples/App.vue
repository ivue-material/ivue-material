<style lang="scss">
@import "../src/styles/index.scss";
</style>
<style lang="scss" scoped>
nav {
  margin-bottom: 40px;

  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    display: inline-block;
  }
  li + li {
    border-left: solid 1px #bbb;
    padding-left: 10px;
    margin-left: 10px;
  }
}
.container {
  padding: 10px 40px 0;
}
.v-link-active {
  color: #bbb;
}
</style>
<template>
    <div class="container">
        <nav>
            <ul>
                <li><router-link to="/affix">Affix</router-link></li>
                <li><router-link to="/Elevation">Elevation</router-link></li>
                <li><router-link to="/Layout">Layout</router-link></li>
                <li><router-link to="/Button">Button</router-link></li>
                <li><router-link to="/Icon">Icon</router-link></li>
                <li><router-link to="/IVueList">IVueList</router-link></li>
                <li><router-link to="/IVueSpin">IVueSpin</router-link></li>
                <li><router-link to="/IVueCarousel">IVueCarousel</router-link></li>
                <li><router-link to="/IVueSwitch">IVueSwitch</router-link></li>
                <li><router-link to="/IVueBottomNav">IVueBottomNav</router-link></li>
                <li><router-link to="/IVueBreadcrumbs">IVueBreadcrumbs</router-link></li>
                <li><router-link to="/IVueSelect">IVueSelect</router-link></li>
                <li><router-link to="/IVueAutoComplete">IVueAutoComplete</router-link></li>
                <li><router-link to="/IVueInput">IVueInput</router-link></li>
                <li><router-link to="/IVueStepperStep">IVueStepperStep</router-link></li>
                <li><router-link to="/IVueUpLoad">IVueUpLoad</router-link></li>
                <li><router-link to="/IVueProgress">IVueProgress</router-link></li>
                <li><router-link to="/IVueNotice">IVueNotice</router-link></li>
                <li><router-link to="/IVueMessage">IVueMessage</router-link></li>
                <li><router-link to="/IVueTabs">IVueTabs</router-link></li>
                <li><router-link to="/IVueLoadingBar">IVueLoadingBar</router-link></li>
                <li><router-link to="/IVueBadge">IVueBadge</router-link></li>
                <li><router-link to="/IVueDatePicker">IVueDatePicker</router-link></li>
            </ul>
        </nav>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <router-view></router-view>
    </div>
</template>
<script>
module.exports = {
  data () {
    return {
      bottomNav2: 0
    }
  },
  mounted: function () {
  },
  beforeDestroy: function () {

  },
  methods: {

  }
}
</script>
