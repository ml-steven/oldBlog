import {
  getStore,
  setStore
} from '@/utils/store'
const common = {

  state: {
    screen: -1,
    isCollapse: false,
    isShade: false,
    showCollapse: getStore({
      name: 'showCollapse'
    }) || true,
    simCode: ''
  },
  actions: {},
  mutations: {
    SET_SHADE: (state, active) => {
      state.isShade = active
    },
    SET_COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse
    },
    SET_SCREEN: (state, screen) => {
      state.screen = screen
    },
    SET_SHOWCOLLAPSE: (state, active) => {
      state.showCollapse = active
      setStore({
        name: 'showCollapse',
        content: state.showCollapse
      })
    },
    SET_SIMCODE: (state, code) => {
      state.simCode = code
    }
  }
}
export default common