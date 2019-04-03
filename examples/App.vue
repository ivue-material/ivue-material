<style lang="scss">
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
                <li>
                    <router-link to="/affix">Affix</router-link>
                </li>
                <li>
                    <router-link to="/Elevation">Elevation</router-link>
                </li>
                <li>
                    <router-link to="/Layout">Layout</router-link>
                </li>
                <li>
                    <router-link to="/Button">Button</router-link>
                </li>
                <li>
                    <router-link to="/Icon">Icon</router-link>
                </li>
                <li>
                    <router-link to="/IvueList">IvueList</router-link>
                </li>
                <li>
                    <router-link to="/IvueSpin">IvueSpin</router-link>
                </li>
                <li>
                    <router-link to="/IvueCarousel">IvueCarousel</router-link>
                </li>
                <li>
                    <router-link to="/IvueSwitch">IvueSwitch</router-link>
                </li>
                <li>
                    <router-link to="/IvueBottomNav">IvueBottomNav</router-link>
                </li>
                <li>
                    <router-link to="/IvueBreadcrumbs">IvueBreadcrumbs</router-link>
                </li>
                <li>
                    <router-link to="/IvueSelect">IvueSelect</router-link>
                </li>
                <li>
                    <router-link to="/IvueAutoComplete">IvueAutoComplete</router-link>
                </li>
                <li>
                    <router-link to="/IvueInput">IvueInput</router-link>
                </li>
                <li>
                    <router-link to="/IvueStepperStep">IvueStepperStep</router-link>
                </li>
                <li>
                    <router-link to="/IvueUpLoad">IvueUpLoad</router-link>
                </li>
                <li>
                    <router-link to="/IvueProgress">IvueProgress</router-link>
                </li>
                <li>
                    <router-link to="/IvueNotice">IvueNotice</router-link>
                </li>
                <li>
                    <router-link to="/IvueMessage">IvueMessage</router-link>
                </li>
                <li>
                    <router-link to="/IvueTabs">IvueTabs</router-link>
                </li>
                <li>
                    <router-link to="/IvueLoadingBar">IvueLoadingBar</router-link>
                </li>
                <li>
                    <router-link to="/IvueBadge">IvueBadge</router-link>
                </li>
                <li>
                    <router-link to="/IvueDatePicker">IvueDatePicker</router-link>
                </li>
                <li>
                    <router-link to="/IvueVirtualCollection">IvueVirtualCollection</router-link>
                </li>
                <li>
                    <router-link to="/IvueCollapse">IvueCollapse</router-link>
                </li>
                <li>
                    <router-link to="/IvueCascader">IvueCascader</router-link>
                </li>
                <li>
                    <router-link to="/IvueTooltip">IvueTooltip</router-link>
                              <li>
                    <router-link to="/IvueTouch">IvueTouch</router-link>
                </li>
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
