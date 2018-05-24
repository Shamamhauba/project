<template>
<div id="app">
    <div class="body-wrapper">

        <!-- MAIN -->
        <div class="main">

            <!-- MAIN CONTENT -->
            <div class="main-content">
                <div class="container-fluid">
                    <!-- <DashHome></DashHome> -->
                     <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import DashHome from './components/DashHome'

export default {
  name: 'App',
  components: {
    DashHome
  }
}
</script>
<style>

</style>
