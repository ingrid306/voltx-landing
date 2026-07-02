import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createOrder, listOrders } from "../controllers/orderController.js";

const router = Router();

router.use(requireAuth);

router.post("/", createOrder);
router.get("/", listOrders);

export default router;
