import express from "express";
import passport from "passport";

const router = express.Router();
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {failureRedirect:"/login"}),
    (req, res) => {
        res.redirect("http://localhost:3000/dashboard/scouts");
    }
)
router.get('/getUser', (req, res) => {
    res.send(req.user);
})
router.post('/logout', (req, res, next) => {
   req.logout((err) => {if(err)next(err)})
})

export default router;