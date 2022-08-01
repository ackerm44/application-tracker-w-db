import StatusesDAO from "../dao/statusesDAO.js"

export default class StatusesController {
  static async apiGetStatuses(req, res, next) {
    // const statusesPerPage = req.query.jobsPerPage ? parseInt(req.query.jobsPerPage, 10) : 20
    // const page = req.query.page ? parseInt(req.query.page, 10) : 0

    // let filters = {}
    // if (req.query.status) {
    //   filters.status = req.query.status
    // } else if (req.query.company) {
    //   filters.company = req.query.company
    // }

    const { statusesList, totalNumStatuses } = await StatusesDAO.getStatuses()

    let response = {
      statuses: statusesList,
    //   page: page,
    //   filters: filters,
    //   entries_per_page: jobsPerPage,
      total_results: totalNumStatuses,
    }
    res.json(response)
  }
//   static async apiGetRestaurantById(req, res, next) {
//     try {
//       let id = req.params.id || {}
//       let restaurant = await RestaurantsDAO.getRestaurantByID(id)
//       if (!restaurant) {
//         res.status(404).json({ error: "Not found" })
//         return
//       }
//       res.json(restaurant)
//     } catch (e) {
//       console.log(`api, ${e}`)
//       res.status(500).json({ error: e })
//     }
//   }

//   static async apiGetRestaurantCuisines(req, res, next) {
//     try {
//       let cuisines = await RestaurantsDAO.getCuisines()
//       res.json(cuisines)
//     } catch (e) {
//       console.log(`api, ${e}`)
//       res.status(500).json({ error: e })
//     }
//   }
}