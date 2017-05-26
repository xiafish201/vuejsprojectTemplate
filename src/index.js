import Vue from 'vue';
import VueRouter from 'vue-router';
import routerMap from 'common/router/routerMap';
import cacheUtils from 'common/cacheUtils';
import openMethod from 'common/openMethod';
import consts from 'common/consts';
import api from 'api';
import vcontext from 'view/bizcomponent/App';
import 'src/customertheme/index.less';
import 'static/css/base.css';

Vue.use(VueRouter);

import iView from 'iview';
Vue.use(iView);

let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
});

function hasAuth(name, path) {
  let result = true;
  // 需求建立路由和权限点之间的映射关系，才能进行控制
  return result;
}
// 屏蔽登录验证
cacheUtils.cookie.set(consts.ACCESSTOKEN, '11111111');

// 登录验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((transition) => {
  if (transition.to.auth) {
    if (!cacheUtils.cookie.get(consts.ACCESSTOKEN)) {
      openMethod.openMode.method({
        url: api.ManagPath.login
      });
    } else {
      if (hasAuth(transition.to.name, transition.to.path)) {
        transition.next();
      } else {
        console.log('权限不够');
      }
    }
  } else {
    transition.next();
  }
});
//router.afterEach(transition => {
//	console.log('transition.to.path:' + transition.to.path);
//	if(transition.to.path == '/') {
//		router.vcontext.contTop = 80;
//	} else {
//		router.vcontext.contTop = 150;
//	}
//});
routerMap(router);

if (!cacheUtils.cookie.get(consts.ACCESSTOKEN)) {
  openMethod.openMode.method({
    url: api.ManagPath.login
  });
} else {
  router.start(vcontext, '#vcontext');
}
