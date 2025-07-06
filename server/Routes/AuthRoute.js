const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { CreateTodo} = require("../Controllers/TodoController");
const router = require("express").Router();
const test = async (req, res, next) => {
    try {
    res.status(200).json({ message: "Test route is working" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
router.get('/',userVerification)
router.post("/signup", Signup);
router.post('/login', Login)
router.get("/test", userVerification, test);
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Strict", // or "Lax", depending on use case
    secure: process.env.NODE_ENV === "production", // set to true in prod
  });
  return res.status(200).json({ message: "Logout successful" , status: "success" , token: null });
});

module.exports = router;
