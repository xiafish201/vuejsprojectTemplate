<!--
        	作者：xiafish201@gmail.com
        	时间：2017-03-10
        	描述：商品已审核
        -->
<template lang="html">
	<!-- page-name根据页面自己定义-->
	<div class='page-reviewed'>
		<!-- 面包屑 ，相应的style写在app2.vue里面了-->
		<Row style="height: auto;">
			<i-col span="12">
				<div class="breadcrumb">
					<Breadcrumb separator=">">
						<Breadcrumb-item @click="goback">商品管理</Breadcrumb-item>
						<Breadcrumb-item>已审核商品</Breadcrumb-item>
					</Breadcrumb>
				</div>
			</i-col>
			<i-col span="12">
				<div class="jxdd_top_cont">
					<!--<i-button type="primary" class="jxdd_top_button" html-type="submit">
						<Icon type="android-add"></Icon>批量导入商品
					</i-button>
					<i-button type="primary" class="jxdd_top_button">
						<Icon type="android-add"></Icon>创建商品
					</i-button>-->
				</div>
			</i-col>
		</Row>
		<!-- 页面内容 -->
		<div class='page-content'>
			<!-- 查询内容-->
			<div class="jxdd_mar cont_search">
				<ul class="cont_search_ul">
					<li>
						<span class="saerch_le">{{labels.goodType}}</span>
						<div class="saerch_ri">
							<cascader-iview :placeholder="'请选择分类'" :has-checkbox="true" :selected-class.sync="selectedClassId" :value.sync="searchData.classText"></cascader-iview>
						</div>
					</li>
					<li>
						<span class="saerch_le">
							<i-select :model.sync="searchData.timeType">
								<i-option v-for="item in timeType" :value="item.value">
									{{item.label}}
								</i-option>
							</i-select>
						</span>
						<div class="saerch_ri">

							<Date-picker :editable="false" placeholder="选择日期" :value.sync="searchData.createTime" format="yyyy-MM-dd hh:mm:ss" type="datetimerange" class="double-time">
							</Date-picker>
						</div>
					</li>
					<li>
						<span class="saerch_le">{{labels.goodStatus}}</span>
						<div class="saerch_ri brands">
							<i-select :model.sync="searchData.goodStatus">
								<i-option v-for="item in goodStatusList" :value="item.value">
									{{item.label}}
								</i-option>
							</i-select>
						</div>
					</li>
					<li>
						<span class="saerch_le">公司名称</span>
						<div class="saerch_ri brands">
							<!--<i-select :model.sync="searchData.companyType">
								<i-option v-for="item in companyType" :value="item.value">
									{{item.label}}
								</i-option>
							</i-select>-->
							<i-input placeholder="请输入..." :value.sync="searchData.company">
							</i-input>
						</div>
					</li>
					<li>
						<span class="saerch_le"></span>
						<div class="saerch_ri brands">
							<i-select :model.sync="searchData.brandType">
								<i-option v-for="item in brandType" :value="item.value">
									{{item.label}}
								</i-option>
							</i-select>
							<i-input placeholder="请输入..." :value.sync="searchData.brand">
							</i-input>
						</div>
					</li>
					<li>
						<span class="saerch_le"></span>
						<div class="saerch_ri brands">
							<i-select :model.sync="searchData.goodDataType">
								<i-option v-for="item in goodDataTypeList" :value="item.value">
									{{item.label}}
								</i-option>
							</i-select>
							<i-input placeholder="请输入..." :value.sync="searchData.goodData">
							</i-input>
						</div>
					</li>
					<li>
						<div class="saerch_ri">
							<i-button type="primary" @click="search" class="search_but">搜索</i-button>
							<a class="search_empty inlineBlock" @click="clearConditions">清空条件</a>
						</div>
					</li>
				</ul>
			</div>
			<!--表格工具栏 -->
			<div class="jxdd_tool_bar">
				<div class="jxdd_row">
					<div class="jxdd_col">
						<i-button type="primary" @click="delGoods">删除</i-button>
					</div>
					<!--<div class="jxdd_col">
						<i-button type="primary" @click="start(0)">停用</i-button>
					</div>-->
				</div>
			</div>
			<div class="jxdd_tab">
				<i-table :row-class-name="rowClassName" :content="self" :data="pageData.list" :columns="columns" border @on-select="selectRows" @on-select-all="selectRows"></i-table>
				<div class="tableFoot">
					<!-- 每页显示条数-->
					<Page :page-size.sync="pageData.row_count" :current.sync="pageData.currentPage" :total="pageData.total_row_number" :page-size-opts="pageSizeOpts" show-elevator show-sizer></Page>
					<p class="pageNum">共{{pageData.total_row_number}}条记录，当前页{{(pageData.currentPage-1)*pageData.row_count + 1}}-{{(pageData.currentPage)*pageData.row_count>pageData.total_row_number?pageData.total_row_number:(pageData.currentPage)*pageData.row_count}}条</p>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import api from 'api';
	import cascaderIview from 'view/bizcomponent/goods/cascaderIView';
	import axios from 'common/httpUtils';
	import consts from 'common/consts';
	import dateFormat from 'common/dateFormat';
	export default {
		data: function() {
			let nowTime = new Date().getTime();
			return {
				selectedClassId: {
					gc_ids: [], //三级分类
					gc_ids_1: [], //一级分类
					gc_ids_2: [] //二级分类
				},
				selectedGoods: [],
				searchData: {
					timeType: '0',
					company: '',
					goodType: null,
					brandType: '0',
					brand: '',
					goodStatus: '-1',
					goodDataType: '0',
					goodData: null,
					createTime: [],
					//					createTime: [dateFormat.dateFormat(nowTime, dateFormat.ISO8601_FORMAT), dateFormat.dateFormat(nowTime + 1000 * 60 * 60 * 24, dateFormat.ISO8601_FORMAT)],
					classText: ''
				},
				labels: {
					goodType: '商品分类',
					createTime: '创建时间',
					goodStatus: '状态'
				},
				timeType: [{
						label: '申请时间',
						value: '0'
					},
					{
						label: '审核时间',
						value: '1'
					}
				],
				brandType: [{
						label: '品牌ID',
						value: '0'
					},
					{
						label: '品牌名称',
						value: '1'
					}
				],
				goodStatusList: [{
						label: '全部',
						value: '-1'
					},
					{
						label: '已采纳',
						value: '1'
					},
					{
						label: '未采纳',
						value: '0'
					}
				],
				goodDataTypeList: [{
						label: '商品ID',
						value: '0'
					},
					{
						label: '商品名称',
						value: '1'
					}
				],
				pageData: {
					list: [],
					row_start_number: 0,
					row_count: 50,
					total_row_number: 0,
					currentPage: 1
				},
				pageSizeOpts: [50, 100, 200, 500],
				columns: [{
					type: 'selection',
					width: 60,
					align: 'center'
				}, {
					title: '商品ID',
					align: 'center',
					key: 'goods_commonid_name',
					sortable: true
				}, {
					title: '商品名称',
					align: 'center',
					key: 'goods_name'
				}, {
					title: '分类名称',
					key: 'gc_name',
					align: 'center',
					render(row, column, index) {
						let gc_id = '';
						if(!row.goods_common_info){
							return '';
						}
						if(row.goods_common_info.gc_id_1) {
							gc_id += row.goods_common_info.gc_id_1;
						}
						if(row.goods_common_info.gc_id_2) {
							gc_id += '>' + row.goods_common_info.gc_id_2;
						}
						if(row.goods_common_info.gc_id) {
							gc_id += '>' + row.goods_common_info.gc_id;
						}
						return `<i-button type="text" size="small" @click="showGcName('${gc_id}','${row.gc_name}')">${row.gc_name}</i-button>`;

					}
				}, {
					title: '品牌名称',
					key: 'brand_name',
					align: 'center',
					render(row, column, index) {
						if(!row.goods_common_info){
							return '';
						}
						return `<i-button type="text" size="small" @click="showBdName(${row.goods_common_info.brand_id},'${row.goods_common_info.brand_name}')">${row.goods_common_info.brand_name}</i-button>`;
					}
				}, {
					title: '申请时间',
					align: 'center',
					key: 'apply_time'
				}, {
					title: '审核时间',
					align: 'center',
					key: 'verify_time'
				}, {
					title: '公司名称',
					key: 'company_name',
					align: 'center',
					render(row, column, index) {
						if(row.company_name == '--') {
							return '--';
						}
						return `<i-button type="text" size="small" @click="showCpName('${row.company_name}','${row.sg_name}','${row.sc_name}','${row.store_state}','${row.platform_state}')">${row.company_name}</i-button>`;
					}
				}, {
					title: '申请类型',
					align: 'center',
					key: 'type_name'
				}, {
					title: '状态',
					align: 'center',
					key: 'goods_verify',
					render(row, column, index) {
						if(row.goods_verify == '未采纳') {
							return `<i-button type="text" size="small" @click="showMsg(${row.type}, '${row.goods_verifyremark}')">未采纳</i-button>`;
						} else {
							return '已采纳';
						}
						
					}
				}, {
					title: '操作',
					key: 'action',
					width: 250,
					align: 'center',
					render(row, column, index) {
						return `<i-button type="text" size="small" @click="goodsDetail(${row.type}, ${row.id})">详情</i-button>`;
					}
				}]
			}
		},
		ready: function() {
			console.log('this.selectedClassId:' + JSON.stringify(this.selectedClassId));
		},
		methods: {
			showCpName: function(name, sg_name, sc_name, store_state, platform_state) {
				this.$Modal.info({
					content: `<div style="text-align:center">
					        	<p>公司名称 &nbsp;&nbsp;&nbsp;${name}</p>
					        	<p>店铺等级 &nbsp;&nbsp;&nbsp;${sg_name}</p>
					        	<p>店铺类型 &nbsp;&nbsp;&nbsp;${sc_name}</p>
					        	<p>店铺状态 &nbsp;&nbsp;&nbsp;${store_state}</p>
					        	<p>平台设定 &nbsp;&nbsp;&nbsp;${platform_state}</p>
						     </div>`,
					okText: '关闭',
					title: '公司详情'
				});
			},
			showGcName: function(id, name) {
				this.$Modal.info({
					content: `<div style="text-align:center">
					        	<p>分类ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${id}</p>
					        	<p>分类名称 &nbsp;&nbsp;&nbsp;${name}</p>
						     </div>`,
					okText: '关闭',
					title: '分类详情'
				});
			},
			showBdName: function(id, name) {
				this.$Modal.info({
					content: `<div style="text-align:center">
					        	<p>品牌ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${id}</p>
					        	<p>品牌名称 &nbsp;&nbsp;&nbsp;${name}</p>
						     </div>`,
					okText: '关闭',
					title: '品牌详情'
				});
			},
			showMsg: function(id, msg) {
				this.$Modal.info({
					content: `<div style="text-align:center">
					        	<p>未采纳原因: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${msg}</p>
						     </div>`,
					okText: '关闭',
					title: '提示'
				});
			},
			delGoods: function() {
				if(this.selectedGoods.length <= 0) {
					this.$Modal.error({
						title: '提示',
						content: '请先选择数据！'
					});
					return;
				}
				let goods_ids = [];

				this.selectedGoods.map(item => {
					goods_ids.push({
						id: item.id,
						type: item.type
					});
				});
				let msg = '您确定删除选中的商品吗？';

				this.$Modal.confirm({
					title: '提示',
					content: msg,
					onOk: () => {
						this.del(goods_ids);
					},
					onCancel: () => {}
				});
			},
			del: function(ids) {
				axios({
					method: 'POST',
					url: api.Api.goodsDeleteReview,
					data: {
						apply_goods_ids: ids
					}
				}).then(response => {
					if(response.error_code == consts.ERROR_CODE.SUCCESS) {
						this.$Modal.info({
							title: "提示",
							content: '商品状态修改成功!'
						});
						this.getGoodsList();
					} else {
						this.$Modal.error({
							title: "错误提示",
							content: response.error_code + ': ' + response.error_message
						});
					}
				}).catch(error => {
					console.log(error);
				});
			},
			editGoods: function(goods_commonid) {
				this.$route.router.go('/goods/editGoods/' + goods_commonid);
			},
			goodsDetail: function(type, id) {
				if(type == 1) {
					this.$route.router.go('/goods/goodsDetail/reviewed/' + id);
				} else if(type == 2) {
					this.$route.router.go('/goods/oneGoodsSpecDetail/' + id);
				}
			},
			goback: function() {
				this.$route.router.go('/goods/goodsCatalogue');
			},
			search: function() {
				if(this.pageData.currentPage == 1) {
					this.getGoodsList();
				} else {
					this.pageData.currentPage = 1;
				}
			},
			getGoodsList: function() {
				var data = {
					row_start_number: this.pageData.row_start_number,
					row_count: this.pageData.row_count,
					goods_verify: 2
					//					create_start_time: dateFormat.dateFormat(this.searchData.createTime[0], dateFormat.ISO8601_FORMAT),
					//					create_end_time: dateFormat.dateFormat(this.searchData.createTime[1], dateFormat.ISO8601_FORMAT)
				};
				if(this.selectedClassId.gc_ids_1 && this.selectedClassId.gc_ids_1.length > 0) {
					data.gc_ids_1 = this.selectedClassId.gc_ids_1;
				}
				if(this.selectedClassId.gc_ids_2 && this.selectedClassId.gc_ids_2.length > 0) {
					data.gc_ids_2 = this.selectedClassId.gc_ids_2;
				}
				if(this.selectedClassId.gc_ids && this.selectedClassId.gc_ids.length > 0) {
					data.gc_ids = this.selectedClassId.gc_ids;
				}
				if(this.searchData.goodStatus != -1) {
					data.goods_verify = this.searchData.goodStatus;
				}
				if(this.searchData.createTime[0]) {
					let ltime = new Date(this.searchData.createTime[0]).getTime()/1000;
					if(this.searchData.timeType == '0') {
						data.apply_start_time = ltime;
					} else {
						data.verify_start_time = ltime;
					}
				}
				if(this.searchData.createTime[1]) {
					let ltime = new Date(this.searchData.createTime[1]).getTime()/1000;
					if(this.searchData.timeType == '0') {
						data.apply_end_time = ltime;
					} else {
						data.verify_end_time = ltime;
					}
				}
				if(this.searchData.company) {
					data.company_name = this.searchData.company;
				}
				if(this.searchData.brand) {
					this.searchData.brand = this.searchData.brand.replace(/^\s*|\s*$/g, '');
					if(this.searchData.brandType == '0') {
						if(!/^\d{1,10}$/.test(this.searchData.brand)) {
							this.$Modal.error({
								title: "错误提示",
								content: 'id只能是数字且十个字以内'
							});
							return;
						}
						data.brand_id = this.searchData.brand;
					} else {
						if(!/^[\s\S]{0,20}$/.test(this.searchData.brand)) {
							this.$Modal.error({
								title: "错误提示",
								content: '关键字不能超过20个'
							});
							return;
						}
						data.brand_name = this.searchData.brand;
					}
				}
				if(this.searchData.goodData) {
					this.searchData.goodData = this.searchData.goodData.replace(/^\s*|\s*$/g, '');
					if(this.searchData.goodDataType == '0') {
						if(!/^\d{1,10}$/.test(this.searchData.goodData)) {
							this.$Modal.error({
								title: "错误提示",
								content: 'id只能是数字且十个字以内'
							});
							return;
						}
						data.goods_commonid = this.searchData.goodData;
					} else {
						if(!/^[\s\S]{0,20}$/.test(this.searchData.goodData)) {
							this.$Modal.error({
								title: "错误提示",
								content: '关键字不能超过20个'
							});
							return;
						}
						data.goods_name = this.searchData.goodData;
					}
				}
				axios({
					method: 'POST',
					url: api.Api.reviewedGoodsList,
					data: data

				}).then(response => {
					if(response.error_code == consts.ERROR_CODE.SUCCESS) {
						response.result_data.map(item => {
							if(item.type == 1) {
								item.type_name = '申请商品';
							} else {
								item.type_name = '申请规格';
							}
							if(item.platform_state == '0') {
								item.platform_state = '关闭';
							} else if(item.platform_state == '1') {
								item.platform_state = '正常';
							} else {
								item.platform_state = '停止销售';
							}
							item.store_state = item.store_state == '0' ? '暂停销售' : '恢复销售';
							item.company_name = item.company_name ? item.company_name : '--';
							item.goods_verify = item.goods_verify ? '已采纳' : '未采纳';
							item.verify_time = item.verify_time ? dateFormat.dateFormat(item.verify_time * 1000, dateFormat.ISO8601_FORMAT) : '';
							item.apply_time = dateFormat.dateFormat(item.apply_time * 1000, dateFormat.ISO8601_FORMAT);
							item.gc_name = item.goods_common_info?item.goods_common_info.gc_name:'';
							item.goods_commonid_name = item.type === 1 ? item.goods_commonid : '--';
						});
						this.pageData.list = response.result_data;
						this.pageData.row_start_number = response.row_start_number;
						this.pageData.row_count = response.row_count;
						this.pageData.total_row_number = response.total_row_number;
					} else {
						this.$Modal.error({
							title: "错误提示",
							content: response.error_code + ': ' + response.error_message
						});
					}
				}).catch(error => {
					this.$Message.error(error);
				});
			},
			rowClassName: function(row, index) {
				if(index % 2 == 0) {
					return 'demo-table-even-row';
				} else {
					return 'demo-table-odd-row';
				}
			},
			clearConditions() {
				this.searchData = {
					timeType: '0',
					company: '',
					goodType: null,
					brandType: '0',
					brand: '',
					goodStatus: '-1',
					goodDataType: '0',
					goodData: null,
					createTime: [],
					classText: ''
				};
				this.selectedClassId = {
					gc_ids: [], //三级分类
					gc_ids_1: [], //一级分类
					gc_ids_2: [] //二级分类
				};
				this.pageData.row_start_number = 0;
				this.pageData.row_count = 50;
				this.pageData.currentPage = 1;
				this.getGoodsList();
			},
			selectRows(selection, row) {
				this.selectedGoods = selection;
			}
		},
		components: {
			cascaderIview
		},
		route: {
			data(transition) {
				this.searchData = {
					timeType: '0',
					company: '',
					goodType: null,
					brandType: '0',
					brand: '',
					goodStatus: '-1',
					goodDataType: '0',
					goodData: null,
					createTime: [],
					classText: ''
				};
				this.selectedClassId = {
					gc_ids: [], //三级分类
					gc_ids_1: [], //一级分类
					gc_ids_2: [] //二级分类
				};
				this.pageData.row_start_number = 0;
				this.pageData.row_count = 50;
				this.pageData.currentPage = 1;
				this.getGoodsList();
			}
		},
		watch: {
			'pageData.row_count': function() {
				this.pageData.row_start_number = 0;
				this.getGoodsList();
			},
			'pageData.currentPage': function() {
				this.pageData.row_start_number = (this.pageData.currentPage - 1) * this.pageData.row_count;
				this.getGoodsList();
			}
		}
	}
</script>

<style lang="css">
	/*日期组件样式start*/
	
	.page-reviewed .double-time {
		width: 300px;
		margin-top: 3px;
	}
	
	.page-reviewed .double-time .ivu-input-wrapper {
		width: 100%;
	}
	
	.page-reviewed .brands .ivu-select {
		width: 82px;
	}
	/*日期组件样式end*/
	
	.page-reviewed .jxdd_tab .ivu-table th {
		background: #e9e9e9;
	}
	
	.page-reviewed .jxdd_tab .ivu-table-border td,
	.page-reviewed .jxdd_tab .ivu-table-border th {
		border-right: 1px solid #fff;
	}
	
	.page-reviewed .jxdd_tab .ivu-table {
		color: #333;
	}
	
	.page-reviewed .jxdd_tab .tableFoot {
		position: relative;
		background-color: #e9e9e9;
		border: 1px solid #e3e8ee;
		border-top: none;
		padding: 5px;
	}
	
	.page-reviewed .jxdd_tab p.pageNum {
		font-size: 14px;
		line-height: 30px;
		position: absolute;
		right: 20px;
		top: 9px;
	}
	
	.page-reviewed .jxdd_tab .ivu-table-row-highlight td,
	.page-reviewed .jxdd_tab .ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td,
	.page-reviewed .jxdd_tab .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td,
	.page-reviewed .jxdd_tab tr.ivu-table-row-highlight.ivu-table-row-hover td,
	.page-reviewed .jxdd_tab tr.ivu-table-row-hover td {
		background-color: #c8e9e4;
	}
	
	.page-reviewed .jxdd_tab .ivu-page-next:hover,
	.page-reviewed .jxdd_tab .ivu-page-prev:hover {
		border-color: #11B69D;
	}
	
	.page-reviewed .jxdd_tab .ivu-page-item:hover {
		border: 1px solid #11B69D;
	}
	
	.page-reviewed .jxdd_tab .ivu-page-item-active {
		background-color: #11B69D;
		border-color: #11B69D;
	}
	
	.page-reviewed .jxdd_tab .ivu-page-item:hover a {
		color: #11B69D;
	}
	
	.page-reviewed .jxdd_tab .ivu-page-item-active:hover a {
		color: #fff;
	}
	
	.page-reviewed .jxdd_tab .ivu-table-cell {
		line-height: 30px;
	}
	
	.page-reviewed .jxdd_tab .ivu-btn-text {
		color: #11B69D;
	}
	
	.page-reviewed .cont_search_ul>li {
		margin-left: 5px;
	}
</style>

<style lang="css" scoped>
	.ivu-modal-wrap {
		background-color: rgba(216, 216, 216, 0.5);
	}
	
	.page-reviewed {
		font-size: 14px;
	}
	
	.page-reviewed .jxdd_mar {
		margin: 0;
	}
	
	.page-reviewed .cascaderIview {
		margin-top: -4px;
	}
	/* 表格样式start*/
	
	.ivu-table th {
		background-color: #e9e9e9;
		border-right: 1px solid #fff;
	}
	
	.ivu-table .ivu-table-body .demo-table-odd-row:nth-child(2n) td {
		background-color: #fff;
		color: #333333;
	}
	
	.ivu-table .demo-table-even-row td {
		background-color: #fafafa;
		color: #333333;
	}
	/* 表格样式end*/
	/*面包屑导航栏与按钮布局start*/
	
	.jxdd_top_cont {
		padding-left: 10px;
		margin: 25px 0;
		text-align: right;
	}
	/*面包屑导航栏与按钮布局end*/
	/*上部红色按钮样式start*/
	
	.jxdd_top_button,
	.jxdd_top_button:active {
		height: 40px;
		font-size: 16px;
		background: #f85a68;
		border-color: #f85a68;
	}
	
	.jxdd_top_button:hover {
		background: #dd4450;
		border-color: #dd4450;
	}
	
	.jxdd_top_button .ivu-icon {
		font-size: 19px;
		margin-right: 10px;
	}
	/*上部红色按钮样式end*/
	/*搜索按钮样式start*/
	/*.search_but{
	background: greenyellow;
}*/
	/*搜索按钮样式end*/
	/*工具栏样式start*/
	
	.jxdd_row {
		width: 100%;
		display: inline-block;
		height: auto;
		text-align: justify;
	}
	
	.jxdd_col {
		zoom: 1;
		width: auto;
		height: auto;
		margin: 0 0 17px 30px;
		float: left;
	}
	
	.jxdd_tool_bar {
		width: 100%;
		margin: 17px 0 0;
	}
	/*工具栏样式end*/
	/*分页样式start*/
	
	.jxdd_page_number {
		margin: 0 13px 0 7px;
	}
	
	.jxdd_page {
		margin-right: 10%;
	}
	/*分页样式end*/
</style>