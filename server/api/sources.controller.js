import SourcesDAO from "../dao/sourcesDAO.js"

export default class SourcesController {
  static async apiGetSources(req, res, next) {
    // const sourcesPerPage = req.query.jobsPerPage ? parseInt(req.query.jobsPerPage, 10) : 20
    // const page = req.query.page ? parseInt(req.query.page, 10) : 0

    // let filters = {}
    // if (req.query.status) {
    //   filters.status = req.query.status
    // } else if (req.query.company) {
    //   filters.company = req.query.company
    // }

    const { sourcesList, totalNumSources } = await SourcesDAO.getSources()

    let response = {
      sources: sourcesList,
    //   page: page,
    //   filters: filters,
    //   entries_per_page: jobsPerPage,
      total_results: totalNumSources,
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