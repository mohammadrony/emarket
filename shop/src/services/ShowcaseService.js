import Api from "./Api"

export default {
    getShowcaseItems() {
        return Api().get('/showcase/getShowcaseItems')
    },
    createShowcaseItem(credentials) {
        return Api().post('/showcase/createShowcaseItem', credentials)
    },
    updateShowcaseItem(credentials) {
        return Api().put('/showcase/updateShowcaseItem', credentials)
    },
    deleteShowcaseItem(showcaseItemId) {
        return Api().delete(`/showcase/deleteShowcaseItem/${showcaseItemId}`)
    }
}
