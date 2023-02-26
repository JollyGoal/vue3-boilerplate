<template>
  <div>
    <router-link :to="$i18nRoute({ name: 'Home' })">Home</router-link>|
    <router-link :to="$i18nRoute({ name: 'About' })">About</router-link>|
    <router-link to="/not-exist">Not Exist</router-link>

    <main>
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <KeepAlive>
            <Suspense>
              <!-- main content -->
              <component :is="Component"></component>

              <!-- loading state -->
              <template #fallback>
                <div>Loading...</div>
              </template>
            </Suspense>
          </KeepAlive>
        </template>
        <template v-else>
          <div>Loading..........</div>
        </template>
      </router-view>
    </main>
  </div>
</template>

<style lang="scss">
@import "./assets/scss/colors.scss";
@import "./assets/scss/fonts.scss";
@import "./assets/scss/index.scss";

:root {
  color: var(--primary);
  font-size: max(16px, 0.73vw);
}

@media screen and (max-width: 1024px) {
  :root {
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  :root {
    font-size: 12px;
  }
}

@media screen and (max-width: 600px) {
  :root {
    font-size: 10px;
  }
}

html {
  background-color: var(--background);
  font-family: "Roboto", cursive;
}

main {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
