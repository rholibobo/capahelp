const { router } = require('../../utils/packages');
const UserModel = require('../../models/userModel');
const { loginController } = require('../controllers');
const { forwardAuthenticated } = require('../../middleware/auth');
const passport = require('passport');
const initializePassport = require('../../auth/passportConfig');

// console.log(loginController);
initializePassport(
  passport,
  (email) => UserModel.findOne({ email: email }),
  (id) => UserModel.findOne({ _id: id })
);

router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login.ejs');
});
router.post(
  '/login',
  forwardAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

module.exports = router;
