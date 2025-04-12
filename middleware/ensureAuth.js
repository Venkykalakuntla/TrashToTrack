 function ensureAuth(req, res, next) {
    if (req.session.user)
    {
      req.user=req.session.user;
       return next();
    }
    res.redirect('/auth/login');
  }
  
  function ensureAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') return next();
    res.redirect('/auth/login');
  }
  
  function ensureCompany(req, res, next) {
    if (req.session.user && req.session.user.role === 'company')
      {
        // console.log(req.session.user);
        req.user=req.session.user;
        // console.log(req.user);
        return next();
      }
    res.redirect('/auth/login');
  }
  
  module.exports = { ensureAuth, ensureAdmin, ensureCompany };
  