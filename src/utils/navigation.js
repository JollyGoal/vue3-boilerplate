export function useNavigation() {

  const hasBack = () => {
    return typeof window !== 'undefined' ? window.history.state.back !== null : false;
  }

  const goBack = () => {
    if (hasBack()) {
      return
    }
  }

  return { goBack, hasBack }
}
