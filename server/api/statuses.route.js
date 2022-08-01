import express from "express"
import StatusesCtrl from "./statuses.controller.js"


const router = express.Router()

router.route("/").get(StatusesCtrl.apiGetStatuses)
// router
//     .route("/review")
//     .post(RestaurantsCtrl.apiPostReview)
//     .put(RestaurantsCtrl.apiUpdateReview)
//     .delete(RestaurantsCtrl.apiDeleteReview)



export default router 