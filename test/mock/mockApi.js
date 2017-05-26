var path = require('path')
var fs = require('fs');

var mockbase = './test/mock/data';
var mock_buyer_supplier = './test/mock/data/buyersupplier';
var mock_goods = './test/mock/data/goods';
var mock_buyer_purchase = './test/mock/data/purchase';
var mockApi = function (res, pathname, paramObj, next, req) {
    switch (pathname) {
		/********************************************panjun start**********************************************/
		//  Access-Control-Allow-Origin:  Content-Type
		case '/account/admin/v10/login':
			var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'login/login.json'), 'utf-8'));
			//设置允许跨域
			res.setHeader('Access-Control-Allow-Origin','*');
            res.setHeader('Content-Type','application/json; charset=utf-8');
            //设置自定义的头部信息
            res.setHeader('aaaaaaaaaaaaaaaa','ffffffffffffffffff');
            res.setHeader('Access-Control-Expose-Headers','aaaaaaaaaaaaaaaa');
            res.end(JSON.stringify(data));
            return;
        /********************************************yangfeng start**********************************************/
        //短信登录
        case '/account/mobile/is_used': //查询手机号是否注册
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'phoneLogin/login_is_used.json'), 'utf-8'));
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(data));
            return;
        case '/account/mobile/sms_code/send': //发送手机验证码
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'phoneLogin/login_send_code.json'), 'utf-8'));
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(data));
            return;
        case '/account/mobile/sms_code/check': //验证码校验
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'phoneLogin/login_check_code.json'), 'utf-8'));
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(data));
            return;
        case '/account/login/login': //登陆
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'phoneLogin/login_user_info.json'), 'utf-8'));
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(data));
            return;

        //商品分类
        case '/common/category/g1/v10':
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'type/category_g1.json'), 'utf-8'));
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(data));
            return;
        case '/common/category/g23/v10':
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'type/category_g23.json'), 'utf-8'));
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(data));
            return;
        /******************************************** yangfeng end **********************************************/

        //查询订单列表
        case '/order/order_list':
            var data = fs.readFileSync(path.join(mockbase, 'buyerOrder/orderdata.json'), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;

        case '/account/account_name/set'://json
            console.log(paramObj);
            var data = fs.readFileSync(path.join(mockbase, 'register.json'), 'utf-8');
            console.log(data);
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
        case '/account/register/register'://json
            console.log(paramObj);
            var data = fs.readFileSync(path.join(mockbase, 'register1.json'), 'utf-8');
            console.log(data);
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;

        //登录测试
        case '/account/account_name/is_used':
            var data = fs.readFileSync(path.join(mockbase, 'login/logintest.json'), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
        case '/account/account_name/check':
            var data = fs.readFileSync(path.join(mockbase, 'login/logintest1.json'), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
        case '/account/login/login':
            var data = fs.readFileSync(path.join(mockbase, 'login/logintest2.json'), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;

        //买家版供应大厅，by zhongzhian
        case '/market/supplying/hall/v10': //json
            var start = '0';
            var count = 20;
//          console.log(paramObj);
            if (paramObj.row_start_number) {
                start = paramObj.row_start_number;
                count = paramObj.row_count;
            }
            var data = JSON.parse(fs.readFileSync(path.join(mock_buyer_supplier, 'listdata.json'), 'utf-8'));
            start = ~~(start);
            data.row_count = count;
//          if(start != 0){
//          	data.row_count = 10;
//          }
            if (start >= 60) {
                data.row_start_number = 60;
                data.items = [];
            } else {
                if (data.header.code === '200000') {
                    data.row_start_number = start;
                    for (var i = 0; i < data.row_count; i++) {
                        data.items[i]['goods_id'] = start + i;
                        data.items[i]['browse_count'] = start + i;
                        data.items[i]['goods_price'] = start + i;
                    }
                }
            }
            data.items.length = data.row_count;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return;

        //买家我的求购，by zhongzhian
        case '/market/purchasing/list/v10': //json
            var start = '0';
            var count = 20;
//          console.log(paramObj);
            if (paramObj.row_start_number) {
                start = paramObj.row_start_number;
                count = paramObj.row_count;
            }
            var data = JSON.parse(fs.readFileSync(path.join(mock_buyer_purchase, 'listdata.json'), 'utf-8'));
            start = ~~(start);
            data.row_count = count;
//          if(start != 0){
//          	data.row_count = 10;
//          }
            if (start >= 60) {
                data.row_start_number = 60;
                data.items = [];
            } else {
                if (data.header.code === '200000') {
                    data.row_start_number = start;
                    for (var i = 0; i < data.row_count; i++) {
                        data.items[i]['goods_id'] = start + i;
                        data.items[i]['browse_count'] = start + i;
                        data.items[i]['goods_price'] = start + i;
                    }
                }
            }
            data.items.length = data.row_count;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return;
            
    	case '/goods/details/v10': //查询手机号是否注册
            var data = JSON.parse(fs.readFileSync(path.join(mock_goods, 'details.json'), 'utf-8'));
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return;

        case '/api/test': //jsonp
            return;

        case '/api/test'://jsonp
            var data = fs.readFileSync(path.join(mockbase, 'test.json'), 'utf-8');
            res.setHeader('Content-type', 'application/javascript');
            res.end(paramObj.callback + '(' + data + ')');
            return;

        //by余鹏 测试数据
        case '/market/purchasing/hall/v10': //json
            var page = '1';
            if (paramObj.page) {
                page = paramObj.page;
            }
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, '/buyersupplier/listdata1.json'), 'utf-8'));
            page = ~~(page);
            if (data.code === '200') {
                data.detail.pageNumber = page;
                for (var i = 0; i < 10; i++) {
                    data.detail.list[i]['s_id'] = (page - 1) * 10 + i;
                    data.detail.list[i]['price'] = (page - 1) * 10 + i;
                }
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return;
        case '/common/category/g1/v10': //jsonp
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'typedata.json'), 'utf-8'));
            res.setHeader('Content-type', 'application/javascript');
            res.end(JSON.stringify(data));
            return;
        case '/market/purchasing/publish/v10': //jsonp
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'releasebuying.json'), 'utf-8'));
            res.setHeader('Content-type', 'application/javascript');
            res.end(JSON.stringify(data));
            return;
        case '/market/purchasing/item/details/v10': //jsonp
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'buyingInfo.json'), 'utf-8'));
            res.setHeader('Content-type', 'application/javascript');
            res.end(JSON.stringify(data));
            return;
        case '/market/purchasing/address/v10': //jsonp
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'shippingAddresses.json'), 'utf-8'));
            res.setHeader('Content-type', 'application/javascript');
            res.end(JSON.stringify(data));
            return;
        case '/market/purchasing/address/edit/v10': //jsonp
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'address_edit.json'), 'utf-8'));
            res.setHeader('Content-type', 'application/javascript');
            res.end(JSON.stringify(data));
            return;
        case '/market/purchasing/submitcontract/v10': //jsonp
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'submitcontract.json'), 'utf-8'));
            res.setHeader('Content-type', 'application/javascript');
            res.end(JSON.stringify(data));
            return;
        //by余鹏 测试数据 end

        default:
            ;
    }
    next();
};

module.exports = mockApi;
