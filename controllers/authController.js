const requestify = require("requestify")

const checkUser = (req, res, next) => {
    console.log("entered auth middleware");
    console.log("token: ", req.params.id);
    requestify.post("https://vg-db-users.herokuapp.com/auth/getTokenData", {token:req.params.id})
    .then((response) => {
        console.log("response: ", response);
        let body = response.getBody();
        req.body.id = body.data.id
        next();
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    });
}
module.exports = {checkUser};