import { onMounted, onBeforeUnmount } from "vue"

export function useInfiniteScroll({ wrapper, retrieve, newsCount, currentPage, pageSize, scrollEnd, cb = () => { }, load = 3 }) {

  let loadFlag = true;

  const isServer = typeof window === 'undefined';

  const startInfiniteScroll = () => {
    if (!isServer) {
      document.addEventListener("scroll", handleScroll);
    }
  }

  const handleScrollFinish = () => {
    if (!isServer) {
      document.removeEventListener("scroll", handleScroll);
    }
    scrollEnd()
  }

  onMounted(() => {
    startInfiniteScroll()
  });

  onBeforeUnmount(() => {
    if (!isServer) {
      document.removeEventListener("scroll", handleScroll);
    }
  });

  let offsetHeight;
  const isLoadReady = () => {
    if (window.innerWidth <= 1366 && window.innerWidth) {
      offsetHeight = (wrapper.value.offsetHeight * 0.7) - 2000
    } else {
      offsetHeight = wrapper.value.offsetHeight - 2000
    }
    console.log(offsetHeight - window.innerHeight <= window.pageYOffset)
    return offsetHeight - window.innerHeight <= window.pageYOffset

  }

  const callBack = () => {
    loadFlag = true;
    cb()
    if (newsCount.value <= currentPage.value * pageSize) handleScrollFinish()
  }

  const loadData = () => {
    if (
      newsCount.value === null ||
      newsCount.value > currentPage.value * pageSize
    ) {
      // At initial state two bars are should be loaded
      // in order to fullfil content wrap
      retrieve(currentPage.value === 0 ? load : 1, () => callBack())
    } else {
      handleScrollFinish()
    }
  }

  // let fetchTimeout;
  const loadDataThrottler = () => {
    if (loadFlag) {
      loadData()
      loadFlag = false
    }
  };

  const handleScroll = () => {
    if (
      newsCount.value !== null &&
      newsCount.value <= currentPage.value * pageSize
    ) {
      handleScrollFinish()
    }
    if (wrapper.value.offsetHeight !== 0) {
      if (isLoadReady()) {
        loadDataThrottler();
      }
    } else {
      loadDataThrottler();
    }
  };

  return { startInfiniteScroll, loadData, handleScrollFinish }
}
