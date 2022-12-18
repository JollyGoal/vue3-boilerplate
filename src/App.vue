<template>
  <div>
    <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive>
          <Suspense>
            <!-- main content -->
            <component :is="Component"></component>

            <!-- loading state -->
            <template #fallback><div>Loading...</div></template>
          </Suspense>
        </KeepAlive>
      </template>
      <template v-else>
        <div>Loading..........</div>
      </template>
    </router-view>
  </div>
</template>

<style>
@font-face {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('./assets/fonts/Inter-Italic.woff2#iefix') format('woff2'),
    url('./assets/fonts/Inter-Italic.woff') format('woff');
}
.inter {
  font-family: 'Inter';
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
