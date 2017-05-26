var path = require('path');
var fs = require('fs');
var mock_seller = './test/mock/data/seller';

var data = null;
var mockApi = function (res, pathname, paramObj, next, req) {
    switch (pathname) {
        case '/market/supplying/list/v10':
            var data = fs.readFileSync(path.join(mock_seller, 'my_supplying.json'), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
        case '/market/supplying/delete/list/v10':
            var data = fs.readFileSync(path.join(mock_seller, 'delete_supplying.json'), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
        default:
            ;
    }
    next();
};

module.exports = mockApi;
