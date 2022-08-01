import express from "express"
import SourcesCtrl from "./sources.controller.js"


const router = express.Router()

router.route("/").get(SourcesCtrl.apiGetSources)
// router
//     .route("/review")
//     .post(RestaurantsCtrl.apiPostReview)
//     .put(RestaurantsCtrl.apiUpdateReview)
//     .delete(RestaurantsCtrl.apiDeleteReview)



export default router 