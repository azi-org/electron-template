import { defineStore } from 'pinia'

const useMainStore = defineStore('app', {
  state: () => {
    return {}
  },
  actions: {},
})

const store = useMainStore()

store.$subscribe((mutation, state) => {
  sessionStorage.setItem('app', JSON.stringify({ ...state }))
})

const value = sessionStorage.getItem('main-store')
if (value) {
  store.$state = JSON.parse(value)
}

export { useMainStore }
