const express = require("express");
const app = express();

app.use(express.json());

const librosRoutes = require("./routes/libros");
app.use("/api/libros", librosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
