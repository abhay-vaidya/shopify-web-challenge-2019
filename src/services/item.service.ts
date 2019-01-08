import axios from 'axios'

const basePath = process.env.REACT_APP_API_BASE
const itemLimit = process.env.REACT_APP_ITEM_LIMIT

const getItems = () =>
  axios
    .get(`${basePath}/swm_waste_wizard_APR?limit=${itemLimit}`)
    .then((response) => response.data)

export default {
  getItems
}
