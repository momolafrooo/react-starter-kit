export var BASE_URL;
let ENV = 'dev';
switch (ENV) {
  case 'dev':
    BASE_URL = 'http://localhost:8000';
    break;
  case 'prod':
    BASE_URL = 'http://localhost:8888';
    break;
}
