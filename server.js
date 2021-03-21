const sequelize = require('./config/connection');
const consoleTable = require('console.table')


const cTable = require('console.table');
console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

const table = cTable.getTable([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

console.log(table);

