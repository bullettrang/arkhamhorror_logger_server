const passport =require('passport');
module.exports=app=>{
    app.get('/',(req,res)=>{
        res.send({welcome:'ARKHAM LOGGER2'});
    })
    
    app.get('/auth/google',passport.authenticate('google',{
            scope:['profile','email']
        })
    );
    
    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req,res)=>{
            res.redirect('/');
        });
    app.get('/api/logout',(req,res)=>{
        req.logout();           //logout() provided by passport
        res.redirect('/');
    })

    app.get('/api/current_user',(req,res)=>{            //for testing
        res.send(req.user);
    })
}
