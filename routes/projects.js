var express = require('express');
var router = express.Router();
const Project = require('../models/project');
const User = require('../models/user');

/**************************/
/* Get All Projects Route */
/**************************/
router.get('/', function(req, res, next) {
    const allUsers = [];
    User.find({})
    .exec(function(err, users) {
        if(err) {
            console.log('Error retrieving users');
        } else {
            this.allUsers = users;
        }
        console.log(users);
    });
    Project.find({})
    .exec(function(err, projects) {
        if(err) {
        console.log('Error retrieving projects');
        } else {
            const projects2d = [];
            const projects3d = [];
            projects.forEach(element => {
                if (element.projectType == "2Dproject") {
                    projects2d.push(element);
                } else {
                    projects3d.push(element);
                }
            });
            res.render('management/index', { title: 'Project Management', users: this.allUsers, projects2d: projects2d, projects3d: projects3d });
        }
        console.log(projects);
    });

});

/**************************/
/* Get My Projects Route */
/**************************/
router.get('/myProjects/:name', function(req, res, next) {
  console.log('Get request for all of the projects where designer: ', req.params.name);

  const allUsers = [];
  User.find({})
  .exec(function(err, users) {
      if(err) {
          console.log('Error retrieving users');
      } else {
          this.allUsers = users;
      }
      console.log(users);
  });

  Project.find({ designer: req.params.name })
  .exec(function(err, projects) {
      if(err) {
      console.log('Error retrieving projects');
      } else {
        res.render('management/myProjectPage', { title: 'Project Management', users: this.allUsers, empName: req.params.name, projects: projects });
      }
      console.log(projects);
  });

});

/*********************/
/* GET Create Route. */
/*********************/
router.get('/create', function(req, res, next) {
    const allUsers = [];
    User.find({})
    .exec(function(err, users) {
        if(err) {
            console.log('Error retrieving users');
        } else {
            this.allUsers = users;
        }
        console.log(users);
    });
    Project.find(function(err, docs) {
        res.render('management/create', { title: 'Project Management', users: this.allUsers });
    });
});

/*******************/
/* GET Edit Route. */
/*******************/
router.get('/edit/:id', function(req, res, next) {
  var projectId = req.params.id;
  const allUsers = [];
  User.find({})
  .exec(function(err, users) {
      if(err) {
          console.log('Error retrieving users');
      } else {
          this.allUsers = users;
      }
      console.log(users);
  });
  console.log('The projects id is: ', projectId);
  Project.findById(projectId)
  .exec(function(err, project) {
      if(err) {
      console.log('Error retrieving the project');
      } else {
        res.render('management/edit', { title: 'Project Management', users: this.allUsers, project: project });
      }
      console.log(project);
  });
});

/*******************/
/* GET Read Route. */
/*******************/
router.get('/read/:id', function(req, res, next) {
  var projectId = req.params.id;
  const allUsers = [];
  User.find({})
  .exec(function(err, users) {
      if(err) {
          console.log('Error retrieving users');
      } else {
          this.allUsers = users;
      }
      console.log(users);
  });
  console.log('The projects id is: ', projectId);
  Project.findById(projectId)
  .exec(function(err, project) {
      if(err) {
      console.log('Error retrieving the project');
      } else {
        res.render('management/read', { title: 'Project Management', users: this.allUsers, project: project });
      }
      console.log(project);
  });
});

/********************/
/* GET Alert Route. */
/********************/
router.get('/alert/:id', function(req, res, next) {
  var projectId = req.params.id;
  const allUsers = [];
  User.find({})
  .exec(function(err, users) {
      if(err) {
          console.log('Error retrieving users');
      } else {
          this.allUsers = users;
      }
      console.log(users);
  });
  console.log('The projects id is: ', projectId);
  Project.findById(projectId)
  .exec(function(err, project) {
      if(err) {
      console.log('Error retrieving the project');
      } else {
        res.render('management/alert', { title: 'Project Management', users: this.allUsers, project: project });
      }
      console.log(project);
  });
});

/*********************/
/* GET Delete Route. */
/*********************/
router.get('/delete/:id', function(req, res, next) {
  var projectId = req.params.id;
  console.log('The project to be removed is: ', projectId);
  Project.findByIdAndRemove(projectId)
  .exec(function(err, project) {
      if(err) {
      console.log('Error removing the project');
      } else {
        res.redirect(req.baseUrl + '/');
      }
      console.log(project);
  });
});

/****************************/
/* POST Save Project Route. */
/****************************/
router.post('/project-save', function(req, res) {
  console.log('Post a project: ', req.body);

  const newProject = new Project();
  newProject.name = req.body.name,
  newProject.projectType = req.body.projectSelect,
  newProject.status = req.body.status,
  newProject.dueDate = req.body.dueDate,
  newProject.contractor = req.body.contractor,
  newProject.designer = req.body.designer,
  newProject.notes = req.body.notes,
  newProject.save(function(err, insertednewProject) {
      if(err) {
        console.log('Error saving project');
      } else {
        res.redirect(req.baseUrl + '/');
      }
  });
});

/******************************/
/* POST Update Project Route. */
/******************************/
router.post('/update-project/:id', function(req, res, next) {
  var projectId = req.params.id;
  console.log('Form data: ', req.body);
  console.log('The project to be removed is: ', projectId);
  Project.findById(projectId)
  .exec(function(err, project) {
      if(err) {
        console.log('Error removing the project');
      } else {
        project.name = req.body.name;
        project.name = req.body.name;
        project.status = req.body.status;
        project.dueDate = req.body.dueDate;
        project.contractor = req.body.contractor;
        project.designer = req.body.designer;
        project.notes = req.body.notes;

        project.save(function(err, updatedProject) {
          if(err) {
            console.log('Error updating project');
          } else {
            res.redirect(req.baseUrl + '/');
          }
        });
        console.log(req.body.name);
      }
      console.log(project);
  });
});

module.exports = router;
