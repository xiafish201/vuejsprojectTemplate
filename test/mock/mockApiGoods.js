let path = require('path');
let fs = require('fs');

let mockbase = './test/mock/data/goods';
let data = null;
let resultData = null;
let n = 0;
let m = 0;
let item = null;
let callback = null;
let mockApi = function(res, pathname, paramObj, next, req) {
    switch (pathname) {
        //属性列表测试数据
        case '/product/v1/attr/list':
            var data = fs.readFileSync(path.join(mockbase, 'allAttributes.json'), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
        case '/product/v1/attrtype/list':
            var data = fs.readFileSync(path.join(mockbase, 'attributeTypeList.json'), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
            
    case '/goods/v10/type/info':
        data = JSON.parse(fs.readFileSync(path.join(mockbase, 'typeInfo.json'), 'utf-8'));
        resultData = data.result_data.attributes;
        console.log('title typeId:' + JSON.stringify(paramObj));
        m = ~~paramObj.type_id > 0 ? 25 : 0;
        n = 0;
        item = null;
        while (n < m) {
            item = {
                'attribute_id': n,
                'attribute_name': createNames(n % 10) + n,
                'attribute_value': createNames(n % 10) + n,
                'attribute_sort': 1,
                'displayed': 1,
                'required': 1,
                'as_spec': 1,
                'preposition': {
                    'setting': 0,
                    'conditions': [{
                        'attribute_id': n * 100,
                        'attribute_name': createNames(n % 10) + n * 100,
                        'displayed': 1,
                        'required': 1,
                        'assigned': 1,
                        'range': 0,
                        'relation': '==',
                        'value': createNames(n % 10) + n * 100
                    }]
                }
            };
            resultData.push(item);
            n++;
        }
        if (!m) {
            data.result_data = {};
        }
        callback = paramObj.callback;
//      res.setHeader('Content-Type', 'application/json');
//      if (callback) { // jsonp跨域
//          res.end(callback + '(' + JSON.stringify(data) + ')');
//      } else { // 正常访问
            res.end(JSON.stringify(data));
//      }
        return;
    case '/goods/v10/type/allAttributes':
        data = JSON.parse(fs.readFileSync(path.join(mockbase, 'allAttributes.json'), 'utf-8'));
        resultData = data.result_data.attribute_infoes;
        n = 0;
        item = null;
        while (n < 50) {
            item = {
                'attribute_id': n,
                'attribute_name': createNames(n % 10) + n
            };
            resultData.push(item);
            n++;
        }
        callback = paramObj.callback;
        res.setHeader('Content-Type', 'application/json');
        if (callback) { // jsonp跨域
            res.end(callback + '(' + JSON.stringify(data) + ')');
        } else { // 正常访问
            res.end(JSON.stringify(data));
        }
        return;
    default:
        ;
    }
    next();
};

const createNames = n => {
    let name = '';
    switch (n) {
    case 0:
        name = '包装';
        break;
    case 1:
        name = '产地';
        break;
    case 2:
        name = '大小';
        break;
    case 3:
        name = '产品标准代号';
        break;
    case 4:
        name = '发货地址';
        break;
    case 5:
        name = '图片';
        break;
    case 6:
        name = '计量单位';
        break;
    case 7:
        name = '颜色';
        break;
    case 8:
        name = '材质';
        break;
    default:
        name = 'lxmtest';
    }
    return name;
};

module.exports = mockApi;
