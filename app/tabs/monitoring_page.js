/* THIS FILE DEFINES THE ROUTES ACCESSIBLE FROM THE MONITORING PAGE - ONLY TWO ARE SET CURRENTLY */

// Call of a function that use the "passport" module to verify that the user is successfully logged in
module.exports = function(router, passport){
    
    // If the user is authenticated, he can access the monitoring page, otherwise he is redirected to the home page.
    router.get('/monitoring', (req, res) => {
        if(req.isAuthenticated()) {
            res.render('monitoring_page.html');
        } else {
            req.isUnauthenticated();
            res.redirect('/');
        }
    });

    // If the user is authenticated, he can access to a sub-menu of the monitoring page, otherwise he is redirected to the home page.
    router.get('/avroy', (req,res) => {
        if(req.isAuthenticated()) {
            res.render('avroy.html');
        } else {
            req.isUnauthenticated();
            res.redirect('/');
        }
    });
};