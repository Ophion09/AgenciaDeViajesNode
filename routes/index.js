import express from "express";
import {
  paginaInicio,
  paginaNosotros,
  paginaTestimoniales,
  paginaViajes,
  paginaViajeDetalle,
} from "../controllers/paginasController.js";
import {
    guardarTestimonial
} from "../controllers/testimonialController.js"

const router = express.Router();

router.get("/", paginaInicio);

router.get("/nosotros", paginaNosotros);

router.get("/testimoniales", paginaTestimoniales);

router.post("/testimoniales", guardarTestimonial);


router.get("/viajes", paginaViajes);

router.get("/viajes/:slug", paginaViajeDetalle);

export default router;
