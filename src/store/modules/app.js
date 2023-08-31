

const state = {
 count:0
}

const mutations = {
    GeTCOUNT(state,data){
        state.count = data
    }
}

const actions = {
getcount({commit},data){
    commit('GeTCOUNT',data)
}
}

export default {
  state,
  mutations,
  actions
}