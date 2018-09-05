'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getPaths = getPaths;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getPaths(routes) {
    var paths = [];
    var recursive = function recursive(obj) {
        var tempArr = Object.values(obj);
        for (var _iterator = tempArr, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var item = _ref;

            if (typeof item === 'string') {
                item = item.replace('/pages', 'pages');
                paths.push(item);
            }
            if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
                recursive(item);
            }
        }
    };
    recursive(routes);
    return paths;
}

var _class = function () {
    function _class() {
        var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, _class);

        var def = {
            filter: new RegExp('app\.json$'),
            routes: {}
        };

        this.setting = Object.assign({}, def, c);
    }

    _class.prototype.apply = function apply(op) {
        if (op.type === 'config' && this.setting.filter.test(op.file)) {
            var parse = JSON.parse(op.code);
            var paths = getPaths(this.setting.routes);
            var launchPage = '';
            paths = Array.from(new Set([].concat(paths, parse.pages)));
            paths = paths.filter(function (item) {
                if (item.startsWith('^')) {
                    launchPage = item.replace('^', '');
                    return false;
                }
                return true;
            });
            parse.pages = paths;
            if (launchPage) {
                parse.pages.unshift(launchPage);
            }
            op.code = JSON.stringify(parse);
        }
        op.next();
    };

    return _class;
}();

exports.default = _class;