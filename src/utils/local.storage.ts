export function StoreInLocalStorage(key: string, value: string) {
  localStorage.setItem(`NewVisionDashboard-${key}`, value)
}

export function retriveFromLocalStorage(key: string) {
  return localStorage.getItem(`NewVisionDashboard-${key}`)
}

export function existInLocalStorage(key: string) {
  return localStorage.getItem(`NewVisionDashboard-${key}`) !== null
}

export function removeKeyFromLocalStorage(key: string) {
  return localStorage.removeItem(`NewVisionDashboard-${key}`)
}

export function clearLocalStorage(key: string) {
  return localStorage.clear()
}
