const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  openSidenav: false,
  sidenavColor: 'from-orange-400 to-orange-600',
  sidenavType: 'white',
  transparentNavbar: true,
  fixedNavbar: false,
  openConfigurator: false,
  isLoading: false,
}

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setOpenSidenav(state, action) {
      state.openSidenav = action.payload
    },
    setSidenavType(state, action) {
      state.sidenavType = action.payload
    },
    setSidenavColor(state, action) {
      state.sidenavColor = action.payload
    },
    setTransparentNavbar(state, action) {
      state.transparentNavbar = action.payload
    },
    setFixedNavbar(state, action) {
      state.fixedNavbar = action.payload
    },
    setOpenConfigurator: {
      reducer: (state, action) => {
        console.log(action)
        state.openConfigurator = action.payload
      },
    },
  },
})

export const {
  setSidenavType,
  setFixedNavbar,
  setOpenConfigurator,
  setOpenSidenav,
  setTransparentNavbar,
  setSidenavColor,
} = dashboard.actions
export default dashboard
