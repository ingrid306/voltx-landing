import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getCart, replaceCart, removeCartItem, clearCart } from "../controllers/cartController.js";

const router = Router();

router.use(requireAuth);

router.get("/", getCart);
router.put("/", replaceCart);
router.delete("/", clearCart);
router.delete("/:productId", removeCartItem);

export default router;
