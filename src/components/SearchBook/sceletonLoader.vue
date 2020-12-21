<template>
  <section class="book-search-loader" ref="loader-wrap">

    <section
        class="book-search-loader__item"
        v-for="item of 3"
        :key="item"
    >
      <svg
          role="img"
          aria-labelledby="loading-aria"
          viewBox="0 0 1180 400"
          preserveAspectRatio="none"
      >
        <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            clip-path="url(#clip-path)"
            style='fill: url("#fill");'
        ></rect>
        <defs>
          <clipPath id="clip-path">
            <rect :x="loaderXoffset" y="30" rx="3" ry="3" width="10%" height="13" />
            <rect :x="loaderXoffset" y="60" rx="3" ry="3" width="18%" height="13" />
            <rect :x="loaderXoffset" y="150" rx="3" ry="3" width="50%" height="13" />
            <rect :x="loaderXoffset" y="180" rx="3" ry="3" width="52%" height="13" />
            <rect :x="loaderXoffset" y="210" rx="3" ry="3" width="57%" height="13" />
            <rect :x="loaderXoffset" y="240" rx="3" ry="3" width="56%" height="13" />
            <rect :x="loaderXoffset" y="270" rx="3" ry="3" width="33%" height="13" />
            <rect :x="loaderXoffset" y="300" rx="3" ry="3" width="60%" height="13" />
            <rect :x="loaderXoffset" y="330" rx="3" ry="3" width="50%" height="13" />
            <rect :x="loaderXoffset" y="358" rx="3" ry="3" width="64%" height="13" />
            <rect x="30" y="30" rx="0" ry="0" :width="loaderImgWidth" height="342" />
          </clipPath>
          <linearGradient id="fill">
            <stop
                offset="0.599964"
                stop-color="#b2aeae"
                stop-opacity="1"
            >
              <animate
                  attributeName="offset"
                  values="-2; -2; 1"
                  keyTimes="0; 0.25; 1"
                  dur="2s"
                  repeatCount="indefinite"
              ></animate>
            </stop>
            <stop
                offset="1.59996"
                stop-color="#dfdddd"
                stop-opacity="1"
            >
              <animate
                  attributeName="offset"
                  values="-1; -1; 2"
                  keyTimes="0; 0.25; 1"
                  dur="2s"
                  repeatCount="indefinite"
              ></animate>
            </stop>
            <stop
                offset="2.59996"
                stop-color="#b2aeae"
                stop-opacity="1"
            >
              <animate
                  attributeName="offset"
                  values="0; 0; 3"
                  keyTimes="0; 0.25; 1"
                  dur="2s"
                  repeatCount="indefinite"
              ></animate>
            </stop>
          </linearGradient>
        </defs>
      </svg>
    </section>




  </section>
</template>

<script>

  export default {
    name: "sceletonLoader",
    computed: {
      loaderXoffset () {
        return this.$breakpoint.xsOnly ? 620 : 310
      },
      loaderImgWidth () {
        return this.$breakpoint.xsOnly ? '45%' : '250'
      }
    }
  }
</script>

<style lang="scss">

  .book-search-loader {
    width: 100%;

    svg  {
      width: 100%;
      height: 380px;
    }

    &__item {
      margin-bottom: 3rem;
      background: #3e3e3d;
      border-radius: 5px;
    }

  }

</style>
