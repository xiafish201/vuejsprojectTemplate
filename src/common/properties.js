'use strict';
/*!
 * propperties.js v1.0.0
 * 动态配置项
 *
 * Author: liaoxm
 * Date: 2016-06-16
 *
 */
import imgPath from 'api/imgPath';

exports.jxddprops = {
	'site.static.url': 'http://static.jxdd.com/suppliers',
	'test': 'hello xdd',
	'site.image.url': 'http://192.168.2.61:8888/zqb/api/facade/test_upload/upload_image'
};

/**
 * 日志相关配置
 */
exports.logprops = {
	// 日志开关，0是开启日志，1是关闭日志输出
	'logonoff': 0,
	// 日志级别，0:'log',1:'debug',2:'info',3:'error',4:'warn'
	'loglevel': 2
};

/**
 * url相关配置
 */
exports.urlprops = {
	// 缓存位置时的黑名单
	'webview.id.blacklist': [
		'account_login_password',
		'account_login_msg',
		'account_register',
		'account_set_login',
		'account_forgot_password',
		'account_reset_password',
		'buyer_mine_usersetting_edituserdata_modifypassword',
		'buyer_mine_usersetting_edituserdata_modifybindingphone'
	],
	// 预加载页面id,这些页面需要处理showevent事件
	'webview.preload.whiltlist': [
		'buyer_commonpage_buyinghall_index.html',
		'seller_commonpage_buyinghall_index.html',
		'main',
		'seller_index',
		'buyer_supplier_index.html',
		'seller_imchat'
	]
};

/**
 * UI相关的配置参数
 * @type {Object}
 */
exports.UIprops = {
	// 新开的页面数据最大值
	open_page_num: 10
};

/**
 * 资质属性类型说明
 * @type {Object}
 */
exports.QAprops = {
	'0': '字符无限制，长度在30位以内',
	'1': '字符无限制，长度在256位以内',
	'2': 'YYYY-MM-DD HH:mm:ss格式',
	'3': '2M以内的jpg/jpeg/png/pdf格式，尺寸不限'
};

/**
 * 菜单数据
 * @type {Object}
 */
exports.menuDatas = {
	operation_menus: {
		routerName: null, // 运营管理 一级级菜单
		name: '运营管理',
		code: 0,
		icon: {
			default: imgPath.imagePath.operation_manage_default,
			hover: imgPath.imagePath.operation_manage_hover,
			active: imgPath.imagePath.operation_manage_active
		},
		subMenus: [{
			routerName: '/operation', // 运营 二级菜单
			name: '运营',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '', // 运营 三级级菜单
				name: '展位管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				},
				subMenus: [{
					routerName: '/indexPPTManage', // 运营 四级级菜单
					name: '首页幻灯设置',
					code: 0
				}, {
					routerName: '/brandPPTManage', // 运营 四级级菜单
					name: '推荐品牌设置',
					code: 0
				}, {
					routerName: '/goodsPPTManage', // 运营 四级级菜单
					name: '推荐商品设置',
					code: 0
				}, {
					routerName: '/hotSearchManage', // 运营 四级级菜单
					name: '热搜词设置',
					code: 0
				}, {
					routerName: '/loginPicManage', // 运营 四级级菜单
					name: '登录推广图设置',
					code: 0
				}]
			}, {
				routerName: '/marketingManage', // 运营 三级级菜单
				name: '营销管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/informationManage', // 运营 三级级菜单
				name: '资讯管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/opinionManage', // 运营 三级级菜单
				name: '意见管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			},{
				routerName: '/articleManage', // 运营 三级级菜单
				name: '公告管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			},  {
				routerName: '/serviceClassList', // 运营 三级级菜单
				name: '服务指南列表',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			},  {
				routerName: '/logisticsManage', // 运营 三级级菜单
				name: '物流管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}]
		}, {
			routerName: '/operation', // 账号 二级菜单
			name: '账号',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '/accountManage', // 账号 三级级菜单
				name: '账号管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}]
		}, {
			routerName: '/operation', // 订单 二级菜单
			name: '订单',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '/orderManage', // 订单 三级级菜单
				name: '订单管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '', // 订单 三级级菜单
				name: '结算管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				},
				subMenus: [{
					routerName: '/dailyGatheringManage', // 运营 四级级菜单
					name: '每日收款',
					code: 0
				}, {
					routerName: '/dailySettlementManage', // 运营 四级级菜单
					name: '每日结算',
					code: 0
				}]
			}]
		}, {
			routerName: '/operation', // 设置 二级菜单
			name: '设置',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '/permissionSet', // 设置 三级级菜单
				name: '权限设置',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/operationLog', // 运营 三级级菜单
				name: '操作日志',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}]
		}, {
			routerName: '/operation', // 店铺 二级菜单
			name: '店铺',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '/auditShop', // 店铺 三级级菜单
				name: '审核开店',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/auditQualification', // 店铺 三级级菜单
				name: '资质申请',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/businessLicenseManage', // 店铺 三级级菜单
				name: '营业执照更换',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/storeManage', // 店铺 三级级菜单
				name: '店铺管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}]
		}, {
			routerName: '/operation', // 商品 二级菜单
			name: '商品',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '/attributeManage', // 商品 三级级菜单
				name: '销售属性管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/classManage', // 商品 三级级菜单
				name: '分类属性设定',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '', // 商品 三级级菜单
				name: '货源商品管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				},
				subMenus: [{
					routerName: '/checkGoodsManage', // 商品 四级级菜单
					name: '商品审核',
					code: 0
				}, {
					routerName: '/reviewSupplyGoodsManage', // 商品 四级级菜单
					name: '待审核商品',
					code: 0
				}, {
					routerName: '/noReviewSupplyGoodsManage', // 商品 四级级菜单
					name: '审核不通过商品',
					code: 0
				}]
			}, {
				routerName: '/channelGoodsManage', // 商品 三级级菜单
				name: '终端商品审核',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/qualifyManage', // 商品 三级级菜单
				name: '资质绑定',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}]
		}, {
			routerName: '/operation', // 统计 二级菜单
			name: '统计',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '/supplyMarketMtatistics', // 统计 三级级菜单
				name: '货源市场统计',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/supplyGoodsDemand', // 统计 三级级菜单
				name: '货源商品需求',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/shipperSupplyCapacity', // 统计 三级级菜单
				name: '货主供应能力',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
//			}, {
//				routerName: '/distributionProcurementCapabilities', // 统计 三级级菜单
//				name: '经销采购能力',
//				code: 0,
//				icon: {
//					default: null,
//					hover: null,
//					active: null
//				}
			}]
		}]
	},
	goods_menus: {
		routerName: null, // 商品管理 一级级菜单
		name: '商品管理',
		code: 0,
		icon: {
			default: imgPath.imagePath.goods_manage_default,
			hover: imgPath.imagePath.goods_manage_hover,
			active: imgPath.imagePath.goods_manage_active
		},
		subMenus: [{
			routerName: '/goods', // 商品 二级菜单
			name: '商品',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '/goodsCatalogue', // 商品 三级级菜单
				name: '商品目录',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/reviewGoods', // 商品 三级级菜单
				name: '待审核商品',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/reviewedGoods', // 商品 三级级菜单
				name: '已审核商品',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}]
		}, {
			routerName: '/goods', // 分类 二级菜单
			name: '分类',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '/classManage', // 分类 三级级菜单
				name: '分类管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}, {
				routerName: '/classSort', // 分类 三级级菜单
				name: '分类排序',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}]
		}, {
			routerName: '/goods', // 品牌 二级菜单
			name: '品牌',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '/brandManage', // 品牌 三级级菜单
				name: '品牌管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}]
		}, {
			routerName: '/goods', // 类型 二级菜单
			name: '类型',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '/typeManage', // 类型 三级级菜单
				name: '类型管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}]
		}, {
			routerName: '/goods', // 属性 二级菜单
			name: '属性',
			code: 0,
			icon: {
				default: null,
				hover: null,
				active: null
			},
			subMenus: [{
				routerName: '/attributeManage', // 属性 三级级菜单
				name: '属性管理',
				code: 0,
				icon: {
					default: null,
					hover: null,
					active: null
				}
			}]
		}]
	}
};
