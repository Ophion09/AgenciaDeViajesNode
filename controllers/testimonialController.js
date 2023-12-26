import { Testimonial } from "../models/Testimonial.js";

export const guardarTestimonial = async (req, res) => {
  try {
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    // Validar si algun campo esta vacio
    if (nombre.trim() === "") {
      errores.push({ mensaje: "El Nombre No puede estar vacio" });
    }
    if (correo.trim() === "") {
      errores.push({ mensaje: "El Correo No puede estar vacio" });
    }
    if (mensaje.trim() === "") {
      errores.push({ mensaje: "El Mensaje No puede estar vacio" });
    }

    if (errores.length > 0) {
      // Consultar a los testimoniales existentes en la db
      const readTestimoniales = await Testimonial.findAll();
      res.render("testimoniales", {
        pagina: "Testimoniales",
        errores,
        nombre,
        correo,
        mensaje,
        readTestimoniales
      });
    } else {
      // Almacenar en la db

      try {
        await Testimonial.create({
          nombre,
          correo,
          mensaje,
        });

        res.redirect("/testimoniales");
      } catch (error) {
        console.log(error);
      }
    }

    console.log(errores);
    return;
  } catch (error) {
    console.log(error);
  }
};
