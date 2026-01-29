import router from "./review.routes.js";
import { getStates } from "../controllers/states.controller.js";

router.get('/states', getStates);

export default router;