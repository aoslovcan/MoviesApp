let express = require('express');
let request = require('request');
let bodyParser = require('body-parser');
let fs = require('fs');
let cors = require('cors');
const bearerToken = require('express-bearer-token');
let { json } = require('express');

//Server create
const server = express();
server.listen('3001', () => {
  console.log('Server started on port 3001');
})

//Include json 
server.use(bodyParser.json());
server.use(bearerToken({
  bodyKey: 'access_token',
  queryKey: 'access_token',
  headerKey: 'Bearer',
  reqKey: 'token',
  cookie: false, // by default is disabled
}))
server.use(bodyParser.urlencoded({ extended: false }));

// aprove connection to server
server.use(cors());

//get movies
server.get('/movies', (req, res) => {

  let token = 'Bearer ' + `${req.header('Authorization')}`;
  //console.log('Bearer ' + `${token}`);
  var options = {
    'method': 'GET',
    'url': 'https://zm-job-application.herokuapp.com/movies',
    'headers': {
      'Authorization': `${token}`
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.end(JSON.stringify(response.body));
  });
})

// Login
server.post('/auth/local', function (req, res) {
  data = req.body.data;
  let email = data.email;
  let pass = data.password;
  //console.log(data.JSON);
  let options = {
    'method': 'POST',
    'url': 'https://zm-job-application.herokuapp.com/auth/local',
    'headers': {
    },
    formData: {
      'identifier': `${email}`,
      'password': `${pass}`
    }
  };
  //console.log(options.formData)
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(JSON.stringify(response.body));
  });
});

//finde one
server.get('/movies/:id', (req, res) => {
  let token = 'Bearer ' + `${req.header('Authorization')}`;
  //console.log('Bearer ' + `${token}`);
  var options = {
    'method': 'GET',
    'url': 'https://zm-job-application.herokuapp.com/movies/' + req.params.id + '',
    'headers': {
      'Authorization': `${token}`
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.end(JSON.stringify(response.body));
  });
})

//update
server.put('/update', function (req, res) {
  data = req.body;
  let token = 'Bearer ' + `${data.token}`;
  //console.log(token)
  let movie = {
    title: data.title,
    year: data.year
  }
  //console.log(movie);
  var options = {
    'method': 'PUT',
    'url': 'https://zm-job-application.herokuapp.com/movies/' + data.id + '',
    'headers': {
      'Authorization': `${token}`
    },
    formData: {
      'data': `${JSON.stringify(movie)}`,
      'files.poster': {
        'value': fs.createReadStream('../src/assets/' + `${data.fileName.toString()}` + ''),
        'options': {
          'filename': `${data.fileName}`,
          'contentType': null
        }
      }
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(JSON.stringify(response.body));
  });
});

//Create movies
server.post('/create', function (req, res) {
  data = req.body.data;
  //console.log(data);
  let token = 'Bearer ' + `${data.token}`;
  let movie = {
    title: data.title,
    year: data.year
  }
  let options = {
    'method': 'POST',
    'url': 'https://zm-job-application.herokuapp.com/movies',
    'headers': {
      'Authorization': `${token}`
    },
    formData: {
      'data': `${JSON.stringify(movie)}`,
      'files.poster': {
        'value': fs.createReadStream('../src/assets/' + `${data.fileName.toString()}` + ''),
        'options': {
          'filename': `${data.fileName}`,
          'contentType': null
        }
      }
    }
  };
  //console.log(options.formData)
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(JSON.stringify(response.body));
  });
});


server.delete('/delete', function (req, res) {
  data = req.body;
  //console.log(data);
  let token = 'Bearer ' + `${data.token}`;
  let options = {
    'method': 'DELETE',
    'url': 'https://zm-job-application.herokuapp.com/movies/' + data.id + '',
    'headers': {
      'Authorization': `${token}`
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    //console.log(response.body);
  });

});

