import { Viaje } from "../models/Viajes.js";
import { Testimonial } from "../models/Testimonial.js";

const paginaInicio = async (req, res) => {

  // Consulta simultanea
  const promisesDB = [];

  promisesDB.push(Viaje.findAll({limit: 3}));
  promisesDB.push(Testimonial.findAll({limit: 3}));

  try {
    // Consultar a la db 3 viajes
    const resultado = await Promise.all(promisesDB);
    
    // req - lo que enviamos || res - lo que express nos responde
  res.render("inicio", {
    pagina: "Inicio",
    clase: "home",
    viajes: resultado[0],
    readTestimoniales: resultado[1]
  });
  } catch (error) {
    console.log(error);
  }
};

const paginaNosotros = (req, res) => {
  // req - lo que enviamos || res - lo que express nos responde
  res.render("nosotros", {
    pagina: "Nosotros",
  });
};

const paginaTestimoniales = async (req, res) => {
  // req - lo que enviamos || res - lo que express nos responde
  try {
    const readTestimoniales = await Testimonial.findAll();
    res.render("testimoniales", {
      pagina: "Testimoniales",
      readTestimoniales
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaViajes = async (req, res) => {
  // req - lo que enviamos || res - lo que express nos responde
  const viajes = await Viaje.findAll();
  console.log(viajes);
  res.render("viajes", {
    pagina: "Próximos Viajes",
    viajes,
  });
};

const paginaViajeDetalle = async (req, res) => {
  const { slug } = req.params;
  try {
    const viaje = await Viaje.findOne({ where: { slug } });
    res.render("viaje", {
      pagina: "Información del Viaje",
      viaje,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  paginaInicio,
  paginaNosotros,
  paginaTestimoniales,
  paginaViajes,
  paginaViajeDetalle,
};
