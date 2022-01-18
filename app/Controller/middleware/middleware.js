let middleware = {
    auth:function(req,res,next) {
        var token = req.headers.x_auth_token;
        try {
            let verify=jwt.verify(token,process.env.PRIVATE_KEY);
            // res.send({verify});
            req._user=verify;
            next();
        } catch (error) {
            res.status(403).send({
                status:false,error
            });
            return false;
        }
    },
    // adminAuthz:function(){

    // },
    // adminAuthz:function(){

    // }

}

module.exports=middleware;