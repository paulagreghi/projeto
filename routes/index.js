var express = require('express');
var router = express.Router();
const Professor = require('../model/professor');
const Orientacao = require('../model/orientacao');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res, next) {
  //res.render('login', {page:'Login', menuId:'login'});
  if (req.session && req.session.login) {
    res.render('index', {page:'Index',
    user: req.session.login
  });
  return ;
}
res.render('login', {page:'Login', menuId:'login'});
});

router.post('/login', function(req, res, next) {
  let login = req.body.login,
  password = req.body.password;
  if (login === 'anapaula' && password === 'anabanana') {
    req.session.login = 'ana';
    res.render('index', {
      title: 'Página Sherlock Holmes',
      page: 'Index',
      user: req.session.login
    });
    res.end();
    return ;
  } else {
    res.render('login', {page:'Login'});
    res.end();
  }
});

router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const professor = await Professor.findById(id);
  professor.status = !professor.status;
  await professor.save();
  res.redirect('/');
});


router.get('/index', function(req, res, next) {
  if (req.session && req.session.login) {
    res.render('index', {page:'Index',
    user: req.session.login
  });
  return ;
  }
  res.render('login', {page:'Login', menuId:'login'});
});

router.get('/professor', async function(req, res, next) {
  if (req.session && req.session.login) {
    res.render('professor', {
      page:'professor Us',
      professors: await Professor.find(),
      user: req.session.login,
    });
    return ;
  }
  res.render('login', {page:'Login', menuId:'login'});
});

router.post('/addprofessor', async (req, res, next) => {
  const prof = new Professor(req.body);
  await prof.save();
  res.redirect('/professor');
});

router.get('/test', async function (req, res, next) {
  // Professor.find({}, function(err, professors) {
  //   res.send(professors);
  // });
  res.send({ profs: await Professor.find(), test: 1});
})

router.get('/orientations', async function (req, res, next) {
  Orientacao.find({}, function(err, professors) {
    res.send(professors.professor);
  });
  // res.send({ orientations: await Orientacao.find(), test: 1});
})

router.get('/orientacao', async function(req, res, next) {
  if (req.session && req.session.login) {
    res.render('orientacao', {
      page:'orientacao',
      orientacao: await Orientacao.find(),
      professors: await Professor.find(),
      user: req.session.login
    });
    return ;
  }
  res.render('login', {page:'Login', menuId:'login'});
});

router.post('/addorientacao', async (req, res, next) => {
  const ori = new Orientacao(req.body);
  await ori.save();
  res.redirect('/orientacao');
});

router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
