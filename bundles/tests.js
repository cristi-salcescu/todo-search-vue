(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TodoStore;
function TodoStore(dataService, userStore) {
  "use strict";

  var todos = [];
  var eventEmitter = $.Callbacks();

  function setLocalTodos(newTodos) {
    todos = newTodos;
    eventEmitter.fire();
  }

  function fetch() {
    return dataService.get().then(setLocalTodos);
  }

  function toViewModel(todo) {
    return Object.freeze({
      id: todo.id,
      title: todo.title,
      userName: userStore.getById(todo.userId).name
    });
  }

  function descById(todo1, todo2) {
    return parseInt(todo2.id) - parseInt(todo1.id);
  }

  function getBy(query) {
    var top = 25;

    function byQuery(todo) {
      if (query && query.text) {
        return todo.title.includes(query.text);
      }
      return true;
    }

    return todos.filter(byQuery).map(toViewModel).sort(descById).slice(0, top);
  }

  return Object.freeze({
    fetch: fetch,
    getBy: getBy,
    onChange: eventEmitter.add
  });
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserStore;
function UserStore(dataService) {
  "use strict";

  var users = [];

  var eventEmitter = $.Callbacks();

  function setLocalUsers(newUsers) {
    users = newUsers;
    eventEmitter.fire();
  }

  function fetch() {
    return dataService.get().then(setLocalUsers);
  }

  function getById(id) {
    function byId(user) {
      return parseInt(user.id) === parseInt(id);
    }

    return users.find(byId);
  }

  return Object.freeze({
    fetch: fetch,
    getById: getById,
    onChange: eventEmitter.add
  });
}

},{}],3:[function(require,module,exports){
"use strict";

var _TodoStore = require("../stores/TodoStore");

var _TodoStore2 = _interopRequireDefault(_TodoStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

QUnit.test("TodoStore can filter by title text", function (assert) {
    //arrage
    var allTodos = [{ id: 1, title: "title 1" }, { id: 2, title: "title 2" }, { id: 3, title: "title 3" }];
    var todoDataService = {
        get: function get() {
            return $.Deferred().resolve(allTodos).promise();
        }
    };
    var userStore = {
        getById: function getById() {
            return {
                name: "Test"
            };
        }
    };
    var todoStore = (0, _TodoStore2.default)(todoDataService, userStore);
    var query = { text: "title 1" };
    var expectedOutputTodos = [{ id: 1, title: "title 1", userName: "Test" }];

    //act
    var done = assert.async();
    todoStore.fetch().then(function makeAssertions() {
        //assert
        assert.deepEqual(expectedOutputTodos, todoStore.getBy(query), "Can filter by text");
        done();
    });
});

},{"../stores/TodoStore":1}]},{},[1,2,3]);
