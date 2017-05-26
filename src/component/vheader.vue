<template>
	<div class="jxdd_header h_color">
		<div class="floatL h_logo relative">
			<Icon class="floatL menu-btn" @click="leMenuSAH(1)" type="android-menu"></Icon>
			<img @click="goIndex" class="floatL percentRadius50 c-point" src="../static/img/header/ddlogo.jpg" alt="" />
			<h1 class="floatL c-point" @click="goIndex">锦绣大地运营管理系统</h1>
			<i-col span="8" class="h_le_menu" v-el:h-menu>
				<div class="return" v-el:return>
					<a href="javascript:void(0);" @click="leMenuSAH(2)">
						<Icon type="ios-arrow-left"></Icon>
						返回
					</a>
					<span></span>
					<!-- 斜角图标 -->
				</div>
				<Menu :theme="theme2" :width="width2" accordion v-el:menu-height>
					<Submenu key="1" class="first_menu">
						<template slot="title">
							<img class="svg" :src="operationMenus.icon.default" height="24" />{{operationMenus.name}}
						</template>
						<Menu :width="width3" accordion>
							<template v-for="(i, twoMenus) in operationMenus.subMenus">
								<Submenu :key="'1-'+i" class="second_menu">
									<template slot="title">
										<Icon type="ios-arrow-right"></Icon>
										<Icon type="ios-arrow-down"></Icon>
										{{twoMenus.name}}
									</template>
									<template v-for="(j, threeMenus) in twoMenus.subMenus">
										<template v-if="threeMenus.routerName==''">
											<Menu :width="width3" accordion>
												<Submenu :key="'99-'+i+'-'+j" class="three_menu">
													<template slot="title">
														<Icon type="ios-arrow-right"></Icon>
														<Icon type="ios-arrow-down"></Icon>
														{{threeMenus.name}}
													</template>
													<template v-for="(k, fourMenus) in threeMenus.subMenus">
														<Menu-item :key="'99-'+i+'-'+j+'-'+k" @click="openPage(0, twoMenus, fourMenus)">{{fourMenus.name}}</Menu-item>
													</template>
												</Submenu>
											</Menu>
										</template>
										<Menu-item v-else :key="'1-'+i+'-'+j" @click="openPage(0, twoMenus, threeMenus)">{{threeMenus.name}}</Menu-item>
									</template>
								</Submenu>
							</template>
						</Menu>
					</Submenu>
					<Submenu key="2" class="first_menu">
						<template slot="title">
							<img class="svg" :src="goodsMenus.icon.default" height="24" />{{goodsMenus.name}}
						</template>
						<Menu :width="width3" accordion>
							<template v-for="(m, twoMenus) in goodsMenus.subMenus">
								<Submenu :key="'2-'+m" class="second_menu">
									<template slot="title">
										<Icon type="ios-arrow-right"></Icon>
										<Icon type="ios-arrow-down"></Icon>
										{{twoMenus.name}}
									</template>
									<template v-for="(n, threeMenus) in twoMenus.subMenus">
										<Menu-item :key="'2-'+m+'-'+n" @click="openPage(1, twoMenus, threeMenus)">{{threeMenus.name}}</Menu-item>
									</template>
								</Submenu>
							</template>
						</Menu>
					</Submenu>
				</Menu>
			</i-col>
		</div>
		<div class="floatR fr">
			<div class="floatL h_ri h_ri_b">
				<a href="javascript:void(0)" @click="showMessages">
					<em></em>
					<img class="svg" src="../static/img/header/message.svg" height="24" /> 消息
				</a>
			</div>
			<Dropdown @on-click="changePassword" class="floatL h_ri h_ri_b change-password">
				<a href="javascript:void(0)">
					<em></em>
					<img class="svg" src="../static/img/header/user.svg" height="24" /> 用户
					<Icon type="arrow-down-b"></Icon>
				</a>
				<Dropdown-menu slot="list">
					<Dropdown-item>修改密码</Dropdown-item>
					<!--<Dropdown-item>修改手机号</Dropdown-item>
					<Dropdown-item>退出登陆</Dropdown-item>-->
				</Dropdown-menu>
			</Dropdown>
			<div class="floatL h_ri h_ri_b">
				<a href="javascript:void(0)" @click="logout">
					<em></em>
					<img class="svg" src="../static/img/header/exit.svg" height="24" /> 登出
				</a>
			</div>
		</div>
	</div>
	<div class="nav-tab" v-if="$route.name != '/index'">
		<Icon v-show="arrowLeft" class="arrow arrow-left" @click="arrow('left')" type="arrow-left-b"></Icon>
		<div class="nav" :style="{left:srollLeft*200+'px'}">
			<template v-for="menu in menus">
				<a @click="switchTab(menu)" class="{{menu.selected?'selected':''}}">{{menu.name}}
					<Icon class="tab-close" @click.stop="closeTab(menu)" type="android-close"></Icon>
				</a>
			</template>
		</div>
		<Icon v-show="arrowRight" class="arrow arrow-right" @click="arrow('right')" type="arrow-right-b"></Icon>
	</div>
	<Modal v-if="accountModal" :visible.sync="accountModal" title="修改密码" :mask-closable="false">
		<div>
			<i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
				<Form-item label="原始密码" prop="oldPasswd">
					<i-input type="password" :value.sync="formValidate.oldPasswd" placeholder="请输入原始密码" :maxlength="30" :disabled="state"></i-input>
				</Form-item>
				<Form-item label="新密码" prop="passwd">
					<i-input type="password" :value.sync="formValidate.passwd" placeholder="请输入新密码"></i-input>
				</Form-item>
				<Form-item label="确认密码" prop="passwdCheck">
					<i-input type="password" :value.sync="formValidate.passwdCheck" placeholder="请再次输入新密码"></i-input>
				</Form-item>
			</i-form>
			<i-form :label-width="labelWidth">
				<Form-item>
					<i-button type="primary" @click="handleSubmit('formValidate')">确定</i-button>
					<i-button type="ghost" @click="handleCancle('formValidate')">取消</i-button>
				</Form-item>
			</i-form>
		</div>
		<div slot="footer"></div>
	</Modal>
</template>

<script>
	import propUtils from 'common/propUtils';
	import openMethod from 'common/openMethod';
	import cacheUtils from 'common/cacheUtils';
	import api from 'api';
	import consts from 'common/consts';
	import utils from 'common/utils';
	import axios from 'common/httpUtils';
	export default {
		data: function() {
			//两次输入的密码相同
			const validatePassCheck = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入新密码'));
				} else if(value !== this.formValidate.passwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				srollLeft: 0,
				arrowLeft: false,
				arrowRight: false,
				theme2: 'dark',
				width2: '260px',
				width3: '262px',
				hMenu0: 0,
				hMenu0270: '-270px',
				menus: [],
				operationMenus: '',
				goodsMenus: '',
				accountModal: false,
				loginOldPasswd: '', //登录的原始密码			
				userInfo: '', //登录的用户信息
				labelWidth: 100,
				formValidate: {
					oldPasswd: '',
					passwd: '',
					passwdCheck: ''
				},
				ruleValidate: {
					oldPasswd: [{
						required: true,
						message: '请输入原始密码',
						trigger: 'blur'
					}, {
						pattern: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,20}$/i,
						message: '请输入8～20位至少包含数字、字母、常用标点符号任意2种组合',
						trigger: 'blur'
					}],
					passwd: [{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					}, {
						pattern: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,20}$/i,
						message: '请输入8～20位至少包含数字、字母、常用标点符号任意2种组合',
						trigger: 'blur'
					}],
					passwdCheck: [{
						required: true,
						validator: validatePassCheck,
						trigger: 'blur'
					}]
				},

			}
		},
		created: function() {
			// 读取权限数据
			// 菜单数据
			this.operationMenus = propUtils.getMenusProp('operation_menus');
			this.goodsMenus = propUtils.getMenusProp('goods_menus');
			//console.log(JSON.stringify(this.operationMenus));

			// 根据权限数据渲染菜单
		},
		methods: {
			clear: function() {
				this.formValidate.oldPasswd = '';
				this.formValidate.passwd = '';
				this.formValidate.passwdCheck = '';
			},
			/**
			 * 菜单显示
			 * @param {Object} index
			 */
			leMenuSAH: function(index) {
				this.$els.hMenu.style.left = index == 1 ? this.hMenu0 : this.hMenu0270;
			},
			/**
			 * 左侧菜单高度100%
			 */
			menuadaptive: function() {
				let menuH = this.$els.menuHeight;
				let hMenus = this.$els.hMenu;
				const backH = -this.$els.return.offsetHeight;

				window.addEventListener('resize', () => {
					menuH.style.height = document.body.clientHeight + backH + 'px';
					hMenus.style.transition = "left 0"
				});
				menuH.style.height = document.body.clientHeight + backH + 'px';
			},
			/**
			 * 左右滑动箭头
			 * @param {Object} arrow left、right
			 */
			arrow: function(arrow) {
				if(arrow === 'left') {
					this.srollLeft++;
				} else {
					this.srollLeft--;
				}
			},
			/**
			 * 打开页面
			 * @param {Object} op 0：运营部分，1：商品部分
			 * @param {Object} twoMenus
			 * @param {Object} threeMenus
			 */
			openPage: function(op, twoMenus, threeMenus) {
				this.$route.router.go(twoMenus.routerName + threeMenus.routerName);
				this.leMenuSAH(2);
			},
			/**
			 * 关闭tab
			 * @param {Object} menu
			 */
			closeTab: function(menu) {
				let _index = 0;
				let routePath = '';
				this.menus.map((item, index) => {
					if(item.routePathMark === menu.routePathMark) {
						_index = index;
						//						this.menus.$remove(menu);
					}
				});
				this.menus.splice(_index, 1);
				if(this.menus.length === 0) {
					this.goIndex();
					return;
				}
				if(menu.selected) {
					if(_index === this.menus.length) {
						routePath = this.menus[_index - 1].routePath;
					} else {
						routePath = this.menus[_index].routePath;
					}
					this.$route.router.go(routePath);
				}
			},
			/**
			 * 切换tab
			 * @param {Object} menu
			 */
			switchTab: function(menu) {
				if(menu.selected) { // 调整位置
					this.setTabSeleced(menu.routePath);
				}
				this.$route.router.go(menu.routePath);
			},
			/**
			 * 去主页
			 */
			goIndex: function() {
				this.$route.router.go('/');
			},
			/**
			 * 根据二三级菜单获取tab名称
			 * @param {Object} p2 二级菜单
			 * @param {Object} p3 三级菜单
			 */
			getTabName: function(p2, p3) {
				let menusData = this.operationMenus.subMenus.concat(this.goodsMenus.subMenus);
				let menuName = '';
				menusData.map(item => {
					if(item.routerName == p2) {
						item.subMenus.map(jtem => {
							if(jtem.routerName == p3) {
								menuName = jtem.name;
							}
						});
					}
				});
				return menuName;
			},
			/**
			 * 设置当前tab选中状态
			 * @param {Object} routePathMark
			 */
			setTabSeleced: function(routePathMark) {
				let _index = 0;
				this.menus.map((item, index) => {
					item.selected = false;
					if(item.routePathMark === routePathMark) {
						_index = index;
						item.selected = true;
					}
				});
				let showNum = Math.floor(document.body.clientWidth / 200);
				if(_index <= 0 - this.srollLeft) {
					this.srollLeft = 0 - _index;
				} else if(_index >= showNum - this.srollLeft) {
					this.srollLeft = 0 - (_index - showNum + 1);
				}
			},
			logout: function() {
				cacheUtils.cookie.clear();
				cacheUtils.localStorage().clear();
				openMethod.openMode.method({
					'url': api.ManagPath.login
				})
			},
			showMessages: function() {

			},
			changePassword: function() {
				this.clear();
				this.accountModal = true
				this.userInfo = cacheUtils.cookie.getObject(consts.USERINFO);
				//console.log('用户信息:'+JSON.stringify(this.userInfo))
			},
			toUpdate: function() {
				var old_user_key = (utils.md5(this.userInfo.admin_name.toLowerCase() + utils.md5(this.formValidate.oldPasswd))).toLowerCase();
				var new_user_key = (utils.md5(this.userInfo.admin_name.toLowerCase() + utils.md5(this.formValidate.passwdCheck))).toLowerCase();
				axios({
					method: 'post',
					url: api.Api.editAdminPassword,
					data: {
						'old_user_key': old_user_key,
						'new_user_key': new_user_key
					}
				}).then(response => {
					if(response.error_code == consts.ERROR_CODE.SUCCESS) {
						this.$Message.success('修改密码成功');
						this.accountModal = false;
					}
				}).catch(error => {
					console.log(error)
					this.$Message.error('修改密码失败')
				})
			},
			//确定
			handleSubmit: function(name) {
				var that = this
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.toUpdate();
					} else {
						this.$Message.error('表单验证失败!');
					}
				})
			},
			//取消
			handleCancle: function() {
				this.accountModal = false;
			},
		},
		ready: function() {
			this.menuadaptive();
			this.arrowRight = this.menus.length > Math.floor(document.body.clientWidth / 200);
			let self = this;
			window.addEventListener('resize', function(e) {
				self.arrowRight = self.srollLeft + self.menus.length > Math.floor(document.body.clientWidth / 200);
			});
			this.$route.router.afterEach(transition => {
				if(transition.to.path === '/') {
					return;
				}
				let menu2 = transition.to.path.split('/')[1];
				let menu3 = transition.to.path.split('/')[2];
				let tabName = transition.to.titleName;
				let menu = {
					name: tabName,
					selected: true,
					routePath: transition.to.path,
					routePathMark: '/' + menu2 + '/' + menu3
				}
				if(!this.menus.some(item => item.routePathMark === menu.routePathMark)) {
					this.menus.push(menu);
				}
				this.setTabSeleced(menu.routePathMark);
			});
		},
		watch: {
			srollLeft: function() {
				this.arrowLeft = this.srollLeft < 0;
				this.arrowRight = this.srollLeft + this.menus.length > Math.floor(document.body.clientWidth / 200);
			}
		},
		events: {
			'close-tab': function(path) {
				console.log('close tab:' + path);
				let menu = {
					routePathMark: path
				}
				this.closeTab(menu);
			}
		},
	}
</script>
<style scoped>
	/*header nav*/
	
	.h_color,
	.h_ri a,
	.return>a {
		color: #FFFFFF;
	}
	
	.c-point {
		cursor: pointer;
	}
	
	.ivu-icon-android-menu,
	.h_logo>h1,
	.h_logo>img {
		line-height: 80px;
	}
	
	.ivu-icon-android-menu {
		margin: auto 30px auto 50px;
		font-size: 30px;
		cursor: pointer;
	}
	
	.h_logo>img {
		margin: 24px 10px 24px 0;
		margin-top: 24px;
		width: 32px;
		height: 32px;
	}
	
	.h_logo>h1 {
		font-size: 24px;
		font-weight: normal;
	}
	
	.ivu-menu-dark {
		position: absolute;
		left: 0;
		top: 74px;
		background: #24282b;
	}
	
	.return {
		height: 74px;
		line-height: 74px;
		width: 270px;
		position: absolute;
		top: 0;
		left: 0;
		font-size: 20px;
		color: #FFFFFF;
	}
	
	.return>a {
		width: 100%;
		height: 100%;
		background: #11b69d;
		display: inline-block;
		position: absolute;
		left: 0;
		letter-spacing: 46px;
		text-indent: 22px;
		text-align: left;
		z-index: 5;
	}
	
	.return>span {
		position: absolute;
		width: 15px;
		height: 9px;
		background: #04584b;
		right: 1px;
		top: 69px;
		transform: rotate(146deg);
		-moz-transform: rotate(146deg);
		/* Firefox 4 */
		-webkit-transform: rotate(146deg);
		/* Safari 和 Chrome */
		-o-transform: rotate(146deg);
		/* Opera */
		z-index: -1;
	}
	
	.ivu-icon-ios-arrow-left {
		position: relative;
		z-index: 6;
		width: 15px;
	}
	
	.ivu-icon-ios-arrow-left:before {
		font-size: 36px;
		position: absolute;
		top: -25px;
		left: 0;
	}
	
	.fr {
		margin: 28px 0 28px 0;
	}
	
	.h_ri {
		width: 180px;
	}
	
	.h_ri_b em,
	.h_ri_b img {
		float: left;
	}
	
	.h_ri_b em {
		display: inline-block;
		height: 20px;
		background: #FFFFFF;
		width: 2px;
		margin: 2px 40px 2px 0;
	}
	
	.h_ri_b a {
		font-size: 20px;
		font-weight: normal;
		line-height: 24px;
	}
	
	.svg {
		margin-right: 20px;
	}
	
	.ivu-icon-arrow-down-b:before {
		position: relative;
		top: -3px;
		left: 17px;
		font-size: 14px;
	}
	
	.h_le_menu {
		transition: left 1.0s;
		-moz-transition: left 1.0s;
		/* Firefox 4 */
		-webkit-transition: left 1.0s;
		/* Safari 和 Chrome */
		-o-transition: left 1.0s;
		/* Opera */
		position: absolute;
		top: 0;
		left: -270px;
		z-index: 5;
		bottom: 0;
		right: 0;
	}
	/*header nav*/
	/*tab标签*/
	
	.nav-tab {
		position: relative;
		background: #999;
		/*width:100vw;*/
		white-space: nowrap;
		overflow: hidden;
	}
	
	.nav-tab .arrow {
		height: 50px;
		width: 20px;
		font-size: 35px;
		padding: 10px 5px;
		position: absolute;
		top: 0;
		z-index: 2;
		cursor: pointer;
		background: #999;
	}
	
	.nav-tab .arrow.arrow-left {
		left: -5px;
	}
	
	.nav-tab .arrow.arrow-right {
		right: 0;
	}
	
	.nav {
		position: relative;
		z-index: 1;
		margin: 0 20px;
		width: 1000vw;
	}
	
	.nav a {
		position: relative;
		display: inline-block;
		padding: 5px 0;
		color: #000;
		margin: 0 -7px;
		width: 214px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		padding-right: 30px;
		bottom: -1px;
		/*border: solid 1px red;*/
	}
	
	.nav a::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 1px;
		left: 0;
		z-index: -1;
		border-bottom: none;
		border-radius: 10px 10px 0 0;
		background: #ddd;
		/*box-shadow: 0 2px hsla(0, 0%, 100%, .5) inset;*/
		transform: perspective(10px) rotateX(2deg);
		transform-origin: bottom;
	}
	
	.nav .tab-close {
		padding: 0 10px;
		position: absolute;
		right: 30px;
		top: 22px;
	}
	
	.nav a.selected {
		z-index: 2;
	}
	
	.nav a.selected::before {
		margin-bottom: -1px;
	}
	
	.nav a.selected::before {
		background: #fff;
	}
	/*tab标签*/
</style>
<style>
	/*header nav*/
	
	.ivu-menu-vertical .first_menu.ivu-menu-submenu .ivu-menu-item {
		padding: 0;
	}
	
	.ivu-menu-dark.ivu-menu-vertical .first_menu.ivu-menu-opened .ivu-menu-submenu-title,
	.ivu-menu-dark.ivu-menu-vertical .first_menu>.ivu-menu-submenu-title,
	.ivu-menu-dark.ivu-menu-vertical .first_menu>.ivu-menu-submenu-title:hover {
		background: #24282b;
	}
	
	.ivu-menu-dark.ivu-menu-vertical .first_menu>.ivu-menu-submenu-title,
	.ivu-menu-dark.ivu-menu-vertical .first_menu>.ivu-menu-submenu-title:hover {
		border-bottom: 1px solid #87898a;
		color: #FFFFFF;
		padding: 26.74px 0;
		font-size: 20px;
		text-align: left;
		text-indent: 88px;
	}
	
	.first_menu .ivu-menu-submenu-title-icon {
		transition: 0s;
	}
	
	.ivu-menu-vertical .first_menu>div>.ivu-menu-submenu-title-icon {
		float: none;
		position: absolute;
		top: 29px;
		right: 10px;
		content: '';
		width: 0;
		height: 0;
		border-bottom: 5px solid #FFFFFF;
		border-left: 5px solid #FFFFFF;
		border-top: 5px solid transparent;
		border-right: 5px solid transparent;
		-webkit-transform: rotate(-45deg);
		-moz-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		-o-transform: rotate(-45deg);
		transform: rotate(-45deg);
		-webkit-transform-origin: center center;
		-moz-transform-origin: center center;
		-ms-transform-origin: center center;
		-o-transform-origin: center center;
		transform-origin: center center;
	}
	
	.ivu-menu-vertical .first_menu.ivu-menu-opened>div>.ivu-menu-submenu-title-icon {
		top: 38px;
		-webkit-transform: rotate(136deg);
		-moz-transform: rotate(136deg);
		-ms-transform: rotate(136deg);
		-o-transform: rotate(136deg);
		transform: rotate(136deg);
	}
	
	.first_menu .ivu-icon-ios-arrow-down:before {
		font-size: 0;
	}
	
	.second_menu .ivu-icon-ios-arrow-down:before {
		font-size: 20px;
	}
	
	.first_menu .svg {
		position: absolute;
		left: 41px;
		top: 24px;
		margin: 0;
	}
	
	.ivu-menu-dark.ivu-menu-vertical .first_menu .second_menu.ivu-menu-opened .ivu-menu-submenu-title,
	.ivu-menu-dark.ivu-menu-vertical .first_menu .second_menu>.ivu-menu-submenu-title,
	.ivu-menu-dark.ivu-menu-vertical .first_menu .second_menu>.ivu-menu-submenu-title:hover {
		background: #2e3235;
		border-bottom: 1px solid #25282a;
		font-size: 16px;
		color: #FFFFFF;
		padding: 0;
		text-align: left;
		height: 56px;
		line-height: 56px;
		text-indent: 88px;
	}
	
	.second_menu .ivu-menu-item,
	.second_menu .ivu-menu-item:hover {
		background: #393d40;
		height: 56px;
		line-height: 56px;
		font-size: 16px;
		color: #FFFFFF;
		text-align: left;
		text-indent: 88px;
		border-bottom: 1px solid #25282a;
	}
	
	.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
	.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
		background: #11b69d !important;
	}
	
	.ivu-menu-dark.ivu-menu-vertical .second_menu.ivu-menu-submenu .ivu-menu-item-active,
	.ivu-menu-dark.ivu-menu-vertical .second_menu.ivu-menu-submenu .ivu-menu-item-active:hover {
		background: #11b69d !important;
		color: #FFFFFF;
	}
	
	.second_menu .ivu-menu-submenu-title span>i,
	.second_menu .ivu-menu-submenu-title>i {
		position: absolute;
		top: 19px;
		left: -38px;
		margin: 0;
	}
	
	.ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
		border-right: 0 !important;
	}
	
	.h_le_menu .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
	.h_le_menu .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover,
	.h_le_menu .ivu-menu-light {
		background: #11b69d !important;
	}
	
	.h_le_menu .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover {
		background: #11b69d !important;
	}
	
	.ivu-menu-dark.ivu-menu-vertical .first_menu .second_menu.ivu-menu-opened>.ivu-menu-submenu-title,
	.ivu-menu-dark.ivu-menu-vertical .first_menu .second_menu.ivu-menu-opened>.ivu-menu-submenu-title:hover {
		background: #2e3235;
		color: #11b69d;
	}
	
	.ivu-menu-dark.ivu-menu-vertical .first_menu .second_menu .three_menu.ivu-menu-opened .ivu-menu-submenu-title,
	.ivu-menu-dark.ivu-menu-vertical .first_menu .second_menu .three_menu.ivu-menu-opened>.ivu-menu-submenu-title:hover {
		background: #545454!important;
		color: #f7f7f7!important;
	}
	
	.second_menu.ivu-menu-submenu .ivu-icon-ios-arrow-down,
	.second_menu.ivu-menu-submenu.ivu-menu-opened .ivu-icon-ios-arrow-right {
		display: none;
	}
	
	.second_menu.ivu-menu-submenu .ivu-icon-ios-arrow-right,
	.second_menu.ivu-menu-submenu.ivu-menu-opened .ivu-icon-ios-arrow-down {
		display: block;
	}
	
	.three_menu.ivu-menu-submenu .ivu-icon-ios-arrow-down,
	.three_menu.ivu-menu-submenu.ivu-menu-opened .ivu-icon-ios-arrow-right {
		display: none!important;
	}
	
	.three_menu.ivu-menu-submenu .ivu-icon-ios-arrow-right,
	.three_menu.ivu-menu-submenu.ivu-menu-opened .ivu-icon-ios-arrow-down {
		display: block !important;
	}
	
	.change-password .ivu-dropdown-menu {
		min-width: 100%;
	}
	
	.ivu-menu-vertical .first_menu.ivu-menu-submenu .three_menu .ivu-menu-item {
		padding-left: 30px!important;
	}
	
	.verify-erro-tips {
		text-align: right;
		color: #f30;
		font-family: "微软雅黑";
	}
	/*header nav*/
</style>