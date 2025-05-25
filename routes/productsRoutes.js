import express from "express";
const routes = express.Router();

routes.get("/", (req, res) => {
    res.send("Products");
});

routes.get("/:id", (req, res) => {
    res.send("Product");
});
routes.get("/recent", (req, res) => {
    res.send("Product");
});
routes.post("/", (req, res) => {
    res.send("Product");
});

routes.patch("/:id", (req, res) => {
    res.send("Product");
});

routes.delete("/:id", (req, res) => {
    res.send("Product");
});


export default routes;