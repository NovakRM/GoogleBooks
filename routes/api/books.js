const router = require("express").Router();
const bookSearchController = require("../../controllers/bookSearchControls");

// Matches with "/api/books"
router.route("/")
  .get(bookSearchController.findAll)
  .post(bookSearchController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(bookSearchController.findById)
  .put(bookSearchController.update)
  .delete(bookSearchController.remove);

module.exports = router;