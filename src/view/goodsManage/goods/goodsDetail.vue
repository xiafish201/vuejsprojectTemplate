<template>
	<div class="goodsDetail">
		<div class="breadcrumb">
			<Breadcrumb separator=">">
				<Breadcrumb-item @click="goback">{{goodsType === 'catalogue' ? '商品目录' : (goodsType === 'reviewed' ? '已审核商品' : '待审核商品')}}</Breadcrumb-item>
				<Breadcrumb-item>{{goodsType === 'catalogue' ? '商品详情' : (goodsType === 'reviewed' ? '审核商品：新品-已采纳' : '审核商品：新品')}}</Breadcrumb-item>
			</Breadcrumb>
		</div>
		<div class="content">
			<div class="title">
				<h4>基础信息</h4>
				<hr/>
			</div>
			<div class="oneRow">
				<label>商品ID：</label>
				<p class="valuedis">{{goodsInfo.goods_commonid}}</p>
			</div>
			<div class="oneRow">
				<label>商品分类：</label>
				<p class="valuedis">{{goodsInfo.gc_name}}</p>
			</div>
			<div class="oneRow">
				<label>商品名称：</label>
				<p class="valuedis">{{goodsInfo.goods_name}}</p>
			</div>
			<div class="oneRow">
				<label>商品品牌：</label>
				<p class="valuedis">{{goodsInfo.brand_name}}</p>
			</div>
			<div class="oneRow">
				<label>最小包装单位：</label>
				<p class="valuedis">{{goodsInfo.minimum_packing_unit}}</p>
			</div>
			<div class="oneRow">
				<label>商品条形码：</label>
				<p class="valuedis">{{goodsInfo.goods_barcode}}</p>
			</div>
			<div class="goodsFactory" v-for="gf in goodsInfo.goods_factory">
				<div class="oneRow">
					<label>厂商编号：</label>
					<p class="valuedis">{{$index | indexformat}}</p>
				</div>
				<div class="oneRow">
					<label>许可证编号：</label>
					<p class="valuedis">{{gf.licence_no}}</p>
				</div>
				<div class="oneRow">
					<label>生产商：</label>
					<p class="valuedis">{{gf.producer_name}}</p>
				</div>
				<div class="oneRow">
					<label>地址/产地：</label>
					<p class="valuedis">{{gf.producer_address}}</p>
				</div>
				<div class="oneRow">
					<label>缩写代码：</label>
					<p class="valuedis">{{gf.abbreviation_code}}</p>
				</div>
			</div>
			<div class="oneRow" v-for="tav in goodsInfo.type_attr_value">
				<label>{{tav.attr_name}}：</label>
				<p class="valuedis">
					<template v-if="tav.attr_type_id == 0 || tav.attr_type_id == 3">
						{{tav.attr_value || '--'}}
					</template>
					<template v-if="tav.attr_type_id == 6">
						{{tav | dateformat}}
					</template>
					<template v-if="tav.attr_type_id == 5">
						<!--<template v-for="(index,item) in tav.attr_value">
							{{index == 0 ? item.label : (' ' + item.label)}}
						</template>-->
						{{tav.attr_value | addressformat}}
					</template>
					<template v-if="tav.attr_type_id == 1">
						<!--{{tav.attr_value.label || '--'}}-->
						{{tav.attr_value | selectformat}}
					</template>
					<template v-if="tav.attr_type_id == 2">
						<div v-if="tav.attr_value_obj.length>0" class="imgs">
							<div class="oneImg" v-for="gi in tav.attr_value_obj">
								<img :src="gi.attribute_value | imgformat" />
							</div>
						</div>
						<div v-if="tav.attr_value_obj.length==0">
							--
						</div>
					</template>
					<template v-if="tav.attr_type_id == 4">
						<!--<template v-for="(index,item) in tav.attr_value">
							{{index == 0 ? item.label : ('、' + item.label)}}
						</template>-->
						{{tav.attr_value | checkformat}}
					</template>
				</p>
			</div>
			<div v-if="goodsType === 'catalogue'">
				<div class="title">
					<h4>规格信息</h4>
					<hr/>
				</div>
				<template v-for="spec in goodsInfo.common_spec_values">
					<div class="oneRow" v-if="spec.spec_id != -1">
						<label>{{$key}}：</label>
						<p class="valuedis">
							<template v-if="spec.spec_type_id == 2">
								<div class="imgs">
									<div class="oneImg" v-for="gi in spec.values">
										<img :src="gi.spec_value | imgformat" />
									</div>
								</div>
							</template>
							<template v-else>
								<template v-for="specValue in spec.values">
									{{$index !== 0 ? ('，' + specValue.spec_value) : specValue.spec_value}}
								</template>
							</template>
						</p>
					</div>
				</template>
				<div class="oneRow spec">
					<label>包装规格：</label>
					<template v-for="spec in goodsInfo.common_spec_values">
						<template v-if="$key === '包装规格' && spec.spec_id === -1">
							<p v-for="sv in spec.values" class="valuedis">{{'1' + sv.spec_value + '=' + sv.spec_mininum + '*' + goodsInfo.minimum_packing_unit}}</p>
						</template>
					</template>

				</div>
				<div v-if="goodsInfo.goods_list.length>0" class="oneRow spec">
					<label>匹配规格：</label>
					<p class="valuedis" style="position: relative;">
						<table class="specView_table" cellpadding="0" cellspacing="0">
							<thead>
								<th v-for="td in specList">{{td.attribute_info.attribute_name}}</th>
								<!--<th v-for="td in goodsInfo.goods_list[0].goods_spec">{{td.spec_name}}</th>-->
								<th>
									商品条形码
								</th>
								<th>
									规格编号
								</th>
							</thead>
							<tbody>
								<tr v-for="tr in goodSpecList">
									<td v-for="td in specList">
									<!--<td v-for="td in tr.goods_spec">-->
										<template v-if="td.attribute_info.attribute_id == -1">
											<template v-if="tr[td.attribute_info.attribute_id].spec_mininum === 0">
												1{{tr[td.attribute_info.attribute_id].spec_value}}
											</template>
											<template v-else>
												1{{tr[td.attribute_info.attribute_id].spec_value}}={{tr[td.attribute_info.attribute_id].spec_mininum}}*{{goodsInfo.minimum_packing_unit}}
											</template>
										</template>
										<template v-if="tr[td.attribute_info.attribute_id].spec_id != -1">
											<template v-if="tr[td.attribute_info.attribute_id].attr_type_id == '2'">
												<img style="width:150px;height:150px;margin:10px;" :src="tr[td.attribute_info.attribute_id].spec_value | imgformat" />
												<div style="text-align: center;">
													{{tr[td.attribute_info.attribute_id].attribute_value_describe}}
												</div>
											</template>
											<template v-else>
												{{tr[td.attribute_info.attribute_id].spec_value}}
											</template>
										</template>
										<template v-if="!tr[td.attribute_info.attribute_id]">
											--
										</template>
									</td>
									<td>
										{{tr.spec_barcode || '--'}}
									</td>
									<td>
										{{tr.goods_sku | skuformat}}
									</td>
								</tr>
							</tbody>
						</table>
					</p>
				</div>
			</div>
			<div class="oneRow">
				<label>商品图片：</label>
				<div class="imgs">
					<div class="oneImg" v-for="gi in goodsInfo.goods_images">
						<modalimg v-if="gi.goods_image" :pic-url="gi.goods_image | imgformat" :active="click"></modalimg>
						<img v-if="!gi.goods_image" :src="gi.goods_image | imgformat"></img>
					</div>
				</div>
			</div>
			<div class="oneRow">
				<label>详情说明：</label>
				<div class="goodsBody">
					{{{goodsInfo.goods_body}}}
				</div>
			</div>
			<div class="title">
				<h4>附加属性</h4>
				<hr/>
			</div>
			<div class="oneRow" v-for="eav in goodsInfo.extend_attr_value">
				<label>{{eav.attr_name}}：</label>
				<p class="valuedis">{{eav.attr_value || '--'}}</p>
			</div>
		</div>
		<div class="bottomOper" v-if="goodsType === 'review'">
			<i-button type="primary" @click="yes">采纳</i-button>
			<i-button type="ghost" @click="modal = true">不采纳</i-button>
		</div>
		<div class="bottomOper" v-else>
			<i-button type="ghost" @click="goback">返回</i-button>
		</div>
		<Modal :visible.sync="modal" width="400">
			<p>确定不通过商品审核？</p>
			<textarea v-model="reason"></textarea>
			<p v-show="!reason && submited" class="errorTip">请填写审核不通过的原因</p>
			<div slot="footer">
				<i-button type="primary" @click="no">确定不通过</i-button>
				<i-button type="ghost" @click="modal = false">取消</i-button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import axios from 'common/httpUtils';
	import api from 'api';
	import consts from 'common/consts';
	import dateFormat from 'common/dateFormat';
	import modalimg from 'component/ModalImg';

	export default {
		components:{
			modalimg
		},
		data: function() {
			return {
				goodsType: '',
				goodsId: 0,
				goodsInfo: {},
				modal: false,
				reason: '',
				submited: false,
				attrList:[],
				specList:[],
				goodSpecList:[],
				nameSpecList:[]
			};
		},
		filters: {
			skuformat: function(value) {
				let rdate = '';
				if(value) {
					value = value + '';
					rdate = value.substring(value.length - 4, value.length);
					//					rdate = value;
				}
				return rdate;
			},
			dateformat: function(attr) {
				let rdate = '--';
				let attrvalue = attr.attr_value;
				if(!attrvalue) return rdate;
				
				let type_attr_id = attr.type_attr_id;
				let dates = attrvalue.split(' - ');
				let datearr = [];
				let formater = dateFormat.ISO8601_FORMAT;
				let attrobj = this.attrList.find(item => item.attribute_info.type_attr_id == type_attr_id);
				if(attrobj){
					switch(attrobj.attribute_info.value_style.pinpoint){
						case '0':
							formater = 'yyyy';
							break;
						case '1':
							formater = 'yyyy-MM';
							break;
						case '2':
							formater = 'yyyy-MM-dd';
							break;
						case '3':
							formater = 'yyyy-MM-dd HH';
							break;
						case '4':
							formater = 'yyyy-MM-dd HH:mm';
							break;
						case '5':
							formater = 'yyyy-MM-dd HH:mm:ss';
							break;
					}
				}
				
				for(var i = 0; i < dates.length; i++) {
					datearr.push(dateFormat.dateFormat(new Date(dates[i]), formater));
				}
				rdate = datearr.join(' - ');
				
				return rdate;
			},
			addressformat: function(value) {
				let rdate = '--';
				if(value) {
					let addressObj = JSON.parse(value);
					rdate = addressObj.map(item => item.label).join('-');
				}
				return rdate || '--';
			},
			checkformat: function(value) {
				let rdate = '';
				if(value) {
					let addressObj = JSON.parse(value);
					rdate = addressObj.map(item => item.label).join('、');
				}
				return rdate || '--';
			},
			selectformat: function(value) {
				let rdate = '--';
				if(value) {
					let Obj = JSON.parse(value);
					rdate = Obj.label;
				}
				return rdate;
			},
			imgformat(value){
				if(value){
					return api.ImagePre.imgDomain + value;
				}else{
					return '';
				}
			},
			indexformat(value){
				let _index = value +1;
				if(_index<10){
					return '0'+_index;
				}else{
					return _index;
				}
			}
		},
		methods: {
			goback() {
				this.$route.router.go(this.goodsType === 'catalogue' ? '/goods/goodsCatalogue' : (this.goodsType === 'reviewed' ? '/goods/reviewedGoods' : '/goods/reviewGoods'));
			},
			getAttrs() {
				console.log(api.Api.getAttrDefined);
				let _data = {
					attribute_type_id: this.goodsInfo.type_id,
//					attribute_type_id: 29,
					goods_commonid: this.goodsId
				}
				axios({
					method: 'POST',
					url: api.Api.getAttrDefined,
					data: _data
				}).then(response => {
					if(response.error_code == consts.ERROR_CODE.SUCCESS) {
//						response = JSON.parse("{\"error_code\":10000,\"error_message\":\"服务调用成功\",\"result_data\":{\"attr_list\":[{\"attribute_info\":{\"type_attr_id\":2794,\"type_id\":20926,\"attribute_id\":7227,\"attribute_name\":\"T-保质期\",\"is_display\":\"1\",\"is_required\":\"1\",\"attribute_sort\":1,\"is_spec\":\"0\",\"numlimit\":0,\"sp_precondition\":{\"conditions\":[],\"setting\":0},\"attribute_type_id\":\"0\",\"origin_value_list\":[{\"attribute_value_id\":911,\"attribute_id\":7227,\"attribute_value\":\"\"}],\"value_style\":{\"content_length\":50}}},{\"attribute_info\":{\"type_attr_id\":2795,\"type_id\":20926,\"attribute_id\":7226,\"attribute_name\":\"T-原料与配料\",\"is_display\":\"1\",\"is_required\":\"1\",\"attribute_sort\":2,\"is_spec\":\"0\",\"numlimit\":0,\"sp_precondition\":{\"conditions\":[],\"setting\":0},\"attribute_type_id\":\"3\",\"origin_value_list\":[{\"attribute_value_id\":912,\"attribute_id\":7226,\"attribute_value\":\"\"}],\"value_style\":{\"content_length\":500}}},{\"attribute_info\":{\"type_attr_id\":2796,\"type_id\":20926,\"attribute_id\":7229,\"attribute_name\":\"T-商品样式\",\"is_display\":\"1\",\"is_required\":\"1\",\"attribute_sort\":3,\"is_spec\":\"0\",\"numlimit\":2,\"sp_precondition\":{\"conditions\":[],\"setting\":0},\"attribute_type_id\":\"2\",\"origin_value_list\":[{\"attribute_value_id\":913,\"attribute_id\":7229,\"attribute_value_name\":\"/group1/M00/00/B1/wKgFnFkVTqCAdiWDAAA_4BJzgpg443.jpg\",\"attribute_value_describe\":\"正面\",\"attribute_value\":\"/group1/M00/00/B1/wKgFnFkVTqCAdiWDAAA_4BJzgpg443.jpg\"},{\"attribute_value_id\":914,\"attribute_id\":7229,\"attribute_value_name\":\"/group1/M00/00/B8/wKgFnVkVTqOAEqsUAAA_4BJzgpg446.jpg\",\"attribute_value_describe\":\"背面\",\"attribute_value\":\"/group1/M00/00/B8/wKgFnVkVTqOAEqsUAAA_4BJzgpg446.jpg\"}],\"value_style\":{\"display_type\":1,\"number_limit\":2,\"type\":\"jpeg/jpg,png,gif,bmp,svg\",\"width_advice\":750,\"height_advice\":750,\"size_limit\":2}}},{\"attribute_info\":{\"type_attr_id\":2797,\"type_id\":20926,\"attribute_id\":7228,\"attribute_name\":\"T-有无原产证\",\"is_display\":\"1\",\"is_required\":\"1\",\"attribute_sort\":4,\"is_spec\":\"0\",\"numlimit\":0,\"sp_precondition\":{\"conditions\":[],\"setting\":0},\"attribute_type_id\":\"1\",\"origin_value_list\":[{\"attribute_value_id\":892,\"attribute_id\":7228,\"attribute_value\":\"有\"},{\"attribute_value_id\":893,\"attribute_id\":7228,\"attribute_value\":\"无\"}],\"value_style\":{}}},{\"attribute_info\":{\"type_attr_id\":2798,\"type_id\":20926,\"attribute_id\":7232,\"attribute_name\":\"T-生产商\",\"is_display\":\"1\",\"is_required\":\"1\",\"attribute_sort\":5,\"is_spec\":\"0\",\"numlimit\":0,\"sp_precondition\":{\"conditions\":[],\"setting\":0},\"attribute_type_id\":\"5\",\"origin_value_list\":[{\"attribute_value_id\":900,\"attribute_id\":7232,\"attribute_value\":\"国-省/直辖市/自治区-地级市/自治州-县级市/县/区/自治县（自治旗）\"}],\"value_style\":{\"pinpoint\":3}}},{\"attribute_info\":{\"type_attr_id\":2799,\"type_id\":20926,\"attribute_id\":7231,\"attribute_name\":\"T-制造原理\",\"is_display\":\"1\",\"is_required\":\"1\",\"attribute_sort\":6,\"is_spec\":\"0\",\"numlimit\":0,\"sp_precondition\":{\"conditions\":[],\"setting\":0},\"attribute_type_id\":\"4\",\"origin_value_list\":[{\"attribute_value_id\":907,\"attribute_id\":7231,\"attribute_value\":\"手工\"},{\"attribute_value_id\":908,\"attribute_id\":7231,\"attribute_value\":\"机械\"}],\"value_style\":{}}},{\"attribute_info\":{\"type_attr_id\":2800,\"type_id\":20926,\"attribute_id\":7233,\"attribute_name\":\"T-生产日期\",\"is_display\":\"1\",\"is_required\":\"1\",\"attribute_sort\":7,\"is_spec\":\"0\",\"numlimit\":0,\"sp_precondition\":{\"conditions\":[],\"setting\":0},\"attribute_type_id\":\"6\",\"origin_value_list\":[{\"attribute_value_id\":915,\"attribute_id\":7233,\"attribute_value\":\"任意时间\"}],\"value_style\":{\"pinpoint_type\":0,\"format\":1,\"pinpoint\":2}}}],\"spec_list\":[{\"attribute_info\":{\"type_attr_id\":2792,\"type_id\":20926,\"attribute_id\":7234,\"attribute_name\":\"T-规格复选\",\"is_display\":\"1\",\"is_required\":\"1\",\"attribute_sort\":1,\"is_spec\":\"1\",\"numlimit\":0,\"sp_precondition\":{\"conditions\":[],\"setting\":0},\"attribute_type_id\":\"4\",\"origin_value_list\":[{\"attribute_value_id\":50,\"attribute_id\":7234,\"attribute_value\":\"第一\"},{\"attribute_value_id\":51,\"attribute_id\":7234,\"attribute_value\":\"第二\"},{\"attribute_value_id\":52,\"attribute_id\":7234,\"attribute_value\":\"第三\"}],\"value_style\":{}}},{\"attribute_info\":{\"type_attr_id\":2793,\"type_id\":20926,\"attribute_id\":7235,\"attribute_name\":\"T-规格图片\",\"is_display\":\"1\",\"is_required\":\"1\",\"attribute_sort\":2,\"is_spec\":\"1\",\"numlimit\":2,\"sp_precondition\":{\"conditions\":[],\"setting\":0},\"attribute_type_id\":\"2\",\"origin_value_list\":[{\"attribute_value_id\":909,\"attribute_id\":7235,\"attribute_value_name\":\"/group2/M00/EF/17/wKgFn1kVUFiAC_CXAAA_4BJzgpg567.jpg\",\"attribute_value_describe\":\"默认\",\"attribute_value\":\"/group2/M00/EF/17/wKgFn1kVUFiAC_CXAAA_4BJzgpg567.jpg\"},{\"attribute_value_id\":910,\"attribute_id\":7235,\"attribute_value_name\":\"/group1/M00/00/B1/wKgFnFkVUFqANjJCAAA_4BJzgpg318.jpg\",\"attribute_value_describe\":\"默认\",\"attribute_value\":\"/group1/M00/00/B1/wKgFnFkVUFqANjJCAAA_4BJzgpg318.jpg\"}],\"value_style\":{\"display_type\":1,\"number_limit\":2,\"type\":\"jpeg/jpg,png,gif,bmp,svg\",\"width_advice\":750,\"height_advice\":750,\"size_limit\":2}}},{\"attribute_info\":{\"type_attr_id\":4,\"type_id\":20926,\"attribute_id\":-1,\"attribute_name\":\"包装规格\",\"is_display\":\"1\",\"is_required\":\"1\",\"attribute_sort\":1,\"is_spec\":\"1\",\"numlimit\":0,\"attribute_type_id\":\"4\",\"origin_value_list\":[{\"attribute_value_id\":7392,\"attribute_id\":-1,\"store_id\":0,\"type_id\":20926,\"add_time\":1495417979,\"update_time\":1495417979,\"type_attr_id\":0,\"attribute_value_name\":\"\",\"attribute_value_describe\":\"\",\"attribute_mininum\":1,\"goods_commonid\":15,\"attribute_value\":\"箱\"}],\"value_style\":{}}}]}}");
						console.log(response);
						let attrList = response.result_data.attr_list.sort((a, b) => a.attribute_info.attribute_sort - b.attribute_info.attribute_sort);
						let specList = response.result_data.spec_list.sort((a, b) => a.attribute_info.attribute_sort- b.attribute_info.attribute_sort);
						
						this.attrList = attrList;
						this.specList = specList;
					}
				})
			},
			getGoodsInfo() {
				axios({
					method: 'get',
					url: (this.goodsType === 'catalogue' ? api.Api.goodsDetail : api.Api.reviewGoods) + '/' + this.goodsId
				}).then(response => {
					if(response.error_code == consts.ERROR_CODE.SUCCESS) {
//						response = JSON.parse("{\"error_code\":10000,\"error_message\":\"服务调用成功\",\"result_data\":{\"goods_commonid\":15,\"goods_name\":\"电脑22\",\"goods_jingle\":\"\",\"gc_id\":90241,\"gc_id_1\":90239,\"gc_id_2\":90240,\"gc_name\":\"one>two>three\",\"brand_id\":1041,\"brand_name\":\"京华天盛\",\"type_id\":20926,\"goods_image\":\"/group1/M00/00/B3/wKgFnFkiRI-Aapc-AAAbXIvzIgs056.jpg\",\"goods_state\":\"1\",\"goods_verify\":\"10\",\"goods_serial\":\"\",\"goods_barcode\":\"2017052212345\",\"add_time\":1495417979,\"update_time\":1495417979,\"minimum_packing_unit\":\"台\",\"goods_body\":\"<p>电脑啊</p>\",\"goods_images\":[{\"goods_image\":\"/group1/M00/00/B3/wKgFnFkiRI-Aapc-AAAbXIvzIgs056.jpg\",\"goods_image_sort\":1,\"is_default\":1},{\"goods_image\":\"\",\"goods_image_sort\":1,\"is_default\":1},{\"goods_image\":\"\",\"goods_image_sort\":1,\"is_default\":1},{\"goods_image\":\"\",\"goods_image_sort\":1,\"is_default\":1},{\"goods_image\":\"\",\"goods_image_sort\":1,\"is_default\":1}],\"type_attr_value\":[{\"attr_type_id\":0,\"attr_name\":\"T-保质期\",\"type_attr_id\":2794,\"attr_value\":\"3年\",\"attr_sort\":1},{\"attr_type_id\":3,\"attr_name\":\"T-原料与配料\",\"type_attr_id\":2795,\"attr_value\":\"CPU，主板\",\"attr_sort\":2},{\"attr_type_id\":2,\"attr_name\":\"T-商品样式\",\"type_attr_id\":2796,\"attr_value\":\"[{\\\"attribute_value_id\\\":913,\\\"attribute_value\\\":\\\"/group1/M00/00/BA/wKgFnVkiRHGAVoPqAACY1fRvrR8188.jpg\\\",\\\"attribute_value_name\\\":\\\"/group1/M00/00/BA/wKgFnVkiRHGAVoPqAACY1fRvrR8188.jpg\\\",\\\"attribute_value_describe\\\":\\\"正面\\\"},{\\\"attribute_value_id\\\":914,\\\"attribute_value\\\":\\\"/group2/M00/55/B8/wKgFn1kiRHKAP0v_AAA--GM8TaI633.jpg\\\",\\\"attribute_value_name\\\":\\\"/group2/M00/55/B8/wKgFn1kiRHKAP0v_AAA--GM8TaI633.jpg\\\",\\\"attribute_value_describe\\\":\\\"背面\\\"}]\",\"attr_sort\":3},{\"attr_type_id\":1,\"attr_name\":\"T-有无原产证\",\"type_attr_id\":2797,\"attr_value\":\"{\\\"value\\\":892,\\\"label\\\":\\\"有\\\"}\",\"attr_sort\":4},{\"attr_type_id\":5,\"attr_name\":\"T-生产商\",\"type_attr_id\":2798,\"attr_value\":\"[{\\\"value\\\":0,\\\"label\\\":\\\"中国\\\"},{\\\"value\\\":1,\\\"label\\\":\\\"北京\\\"},{\\\"value\\\":36,\\\"label\\\":\\\"北京市\\\"},{\\\"value\\\":37,\\\"label\\\":\\\"东城区\\\"}]\",\"attr_sort\":5},{\"attr_type_id\":4,\"attr_name\":\"T-制造原理\",\"type_attr_id\":2799,\"attr_value\":\"[{\\\"value\\\":908,\\\"label\\\":\\\"机械\\\"}]\",\"attr_sort\":6},{\"attr_type_id\":6,\"attr_name\":\"T-生产日期\",\"type_attr_id\":2800,\"attr_value\":\"2017-05-01 00:00:00 - 2017-05-31 00:00:00\",\"attr_sort\":7}],\"extend_attr_value\":[{\"attr_name\":\"制造商\",\"valueErrorType\":\"0\",\"nameErrorType\":\"0\",\"attr_value\":\"田峰\"}],\"goods_factory\":[{\"licence_no\":\"1\",\"abbreviation_code\":\"4654654\",\"producer_name\":\"撒的方式\",\"producer_address\":\"水电费\"}],\"update_state_type\":0,\"goods_list\":[{\"goods_sku\":110000000150001,\"goods_name\":\"电脑22 箱 1台 默认 第一 1台\",\"goods_spec_key\":\"739290950\",\"spec_barcode\":\"2017052212345\",\"goods_spec\":[{\"spec_value_id\":\"7392\",\"spec_mininum\":\"1\",\"attr_type_id\":\"4\",\"spec_sort\":1,\"spec_id\":\"-1\",\"attribute_value_describe\":\"\",\"spec_name\":\"包装规格\",\"spec_value\":\"箱\",\"attribute_value_name\":\"\",\"spec_type_id\":20926},{\"spec_value_id\":\"909\",\"attribute_value_style\":\"{\\\"display_type\\\":1,\\\"number_limit\\\":2,\\\"type\\\":\\\"jpeg/jpg,png,gif,bmp,svg\\\",\\\"width_advice\\\":750,\\\"height_advice\\\":750,\\\"size_limit\\\":2}\",\"spec_mininum\":0,\"attr_type_id\":\"2\",\"spec_sort\":2,\"spec_id\":7235,\"attribute_value_describe\":\"默认\",\"spec_name\":\"T-规格图片\",\"spec_value\":\"/group2/M00/C2/AD/wKgFnlkiRIOAQdoYAACY1fRvrR8916.jpg\",\"attribute_value_name\":\"/group2/M00/EF/17/wKgFn1kVUFiAC_CXAAA_4BJzgpg567.jpg\",\"spec_type_id\":\"2\"},{\"spec_value_id\":\"50\",\"attribute_value_style\":\"{}\",\"spec_mininum\":1,\"attr_type_id\":\"4\",\"spec_sort\":1,\"spec_id\":7234,\"attribute_value_describe\":\"\",\"spec_name\":\"T-规格复选\",\"spec_value\":\"第一\",\"attribute_value_name\":\"\",\"spec_type_id\":20926}]},{\"goods_sku\":110000000150002,\"goods_name\":\"电脑22 null 默认 第一 1台\",\"goods_spec_key\":\"090950\",\"spec_barcode\":null,\"goods_spec\":[{\"spec_value_id\":0,\"spec_mininum\":0,\"attr_type_id\":\"4\",\"spec_sort\":1,\"spec_id\":\"-1\",\"attribute_value_describe\":\"\",\"spec_name\":\"包装规格\",\"attribute_value_name\":\"\",\"spec_type_id\":20926},{\"spec_value_id\":\"909\",\"attribute_value_style\":\"{\\\"display_type\\\":1,\\\"number_limit\\\":2,\\\"type\\\":\\\"jpeg/jpg,png,gif,bmp,svg\\\",\\\"width_advice\\\":750,\\\"height_advice\\\":750,\\\"size_limit\\\":2}\",\"spec_mininum\":0,\"attr_type_id\":\"2\",\"spec_sort\":2,\"spec_id\":7235,\"attribute_value_describe\":\"默认\",\"spec_name\":\"T-规格图片\",\"spec_value\":\"/group2/M00/C2/AD/wKgFnlkiRIOAQdoYAACY1fRvrR8916.jpg\",\"attribute_value_name\":\"/group2/M00/EF/17/wKgFn1kVUFiAC_CXAAA_4BJzgpg567.jpg\",\"spec_type_id\":\"2\"},{\"spec_value_id\":\"50\",\"attribute_value_style\":\"{}\",\"spec_mininum\":1,\"attr_type_id\":\"4\",\"spec_sort\":1,\"spec_id\":7234,\"attribute_value_describe\":\"\",\"spec_name\":\"T-规格复选\",\"spec_value\":\"第一\",\"attribute_value_name\":\"\",\"spec_type_id\":20926}]}],\"store_id\":0,\"common_spec_values\":{\"包装规格\":{\"spec_id\":-1,\"values\":{\"7392\":{\"spec_mininum\":1,\"spec_id\":-1,\"spec_value\":\"箱\"}},\"spec_type_type_id\":20926,\"spec_type_id\":4},\"T-规格图片\":{\"attribute_value_style\":\"{\\\"display_type\\\":1,\\\"number_limit\\\":2,\\\"type\\\":\\\"jpeg/jpg,png,gif,bmp,svg\\\",\\\"width_advice\\\":750,\\\"height_advice\\\":750,\\\"size_limit\\\":2}\",\"spec_id\":7235,\"values\":{\"909\":{\"spec_mininum\":0,\"spec_id\":7235,\"attribute_value_describe\":\"默认\",\"spec_value\":\"/group2/M00/C2/AD/wKgFnlkiRIOAQdoYAACY1fRvrR8916.jpg\",\"attribute_value_name\":\"/group2/M00/EF/17/wKgFn1kVUFiAC_CXAAA_4BJzgpg567.jpg\"}},\"spec_type_type_id\":2,\"spec_type_id\":2},\"T-规格复选\":{\"attribute_value_style\":\"{}\",\"spec_id\":7234,\"values\":{\"50\":{\"spec_mininum\":1,\"spec_id\":7234,\"spec_value\":\"第一\"}},\"spec_type_type_id\":20926,\"spec_type_id\":4}}}}");
						console.log(JSON.stringify(response.result_data));
//						let nameSpecList = [];
						let goodSpecList = response.result_data.goods_list.map(item=>{
							let _specObj = {
								'spec_barcode':item.spec_barcode,
								'goods_sku':item.goods_sku
							};
//							nameSpecList.push(item.)
							for(var i =0;i<item.goods_spec.length;i++){
								let _spec = item.goods_spec[i];
								_specObj[_spec.spec_id] = _spec;
							}
							return _specObj;
						});
//						this.nameSpecList = nameSpecList;
						this.goodSpecList = goodSpecList;
						//处理图片类型的属性
						response.result_data.type_attr_value = response.result_data.type_attr_value.map(item=>{
							if(item.attr_type_id == 2){
								if(item.attr_value){
									item.attr_value_obj = JSON.parse(item.attr_value);
								}else{
									item.attr_value_obj = [];
								}
							}
							return item;
						})
						this.goodsInfo = response.result_data;
						this.getAttrs();
						
					} else {
						this.$Message.error(response.error_code + ': ' + response.error_message);
					}
				}).catch(error => {
					this.$Message.error(error);
				});
			},
			yes() {
				this.$Modal.confirm({
					title: '提示信息',
					content: '确定通过商品审核？',
					okText: '通过并创建/修改商品',
					onOk: () => {
//						this.updateGoodsStatus(1);
						this.$dispatch('close-tab', '/goods/reviewGoodsDetail');
						this.$route.router.go('/goods/auditGoods/' + this.goodsInfo.goods_commonid + '/1');
					},
					onCancel: () => {

					}
				});
			},
			updateGoodsStatus(flag) {
				let data = {
					goods_commonids: [this.goodsInfo.goods_commonid],
					update_state_type: 2,
					goods_verify_type: 1,
					goods_verify: flag
				}
				axios({
					method: 'POST',
					url: api.Api.goodsStateUpdate,
					data: data

				}).then(response => {
					if(response.error_code == consts.ERROR_CODE.SUCCESS) {
						this.$Modal.info({
							title: "提示",
							content: '商品状态修改成功!'
						});
						this.$dispatch('close-tab', '/goods/reviewGoodsDetail');
						this.$route.router.go('/goods/editGoods/' + this.goodsInfo.goods_commonid);
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
			no() {
				var that = this;
				this.submited = true;
				if(this.reason) {
					axios({
						method: 'post',
						url: api.Api.goodsStateUpdate,
						data: {
							goods_commonids: [this.goodsInfo.goods_commonid],
							update_state_type: 2,
							goods_verify_type: 1,
							goods_verify: 0,
							goods_verifyremark: this.reason
						}
					}).then(response => {
						if(response.error_code == consts.ERROR_CODE.SUCCESS) {
							this.$Message.success('已拒绝通过商品审核！');
							setTimeout(function() {
								that.$dispatch('close-tab', '/goods/reviewGoodsDetail');
								that.goback();
							}, 1500);
						} else {
							this.$Message.error(response.error_code + ': ' + response.error_message);
						}
					}).catch(error => {
						this.$Message.error(error);
					});
					this.modal = false;
				}
			}
		},
		ready: function() {},
		route: {
			data(transition) {
				this.goodsInfo = {};
				this.modal = false;
				this.reason = '';
				this.submited = false;
				this.goodsType = transition.to.params.goodsType;
				this.goodsId = ~~transition.to.params.goodsId;
				this.getGoodsInfo();
			}
		}
	}
</script>

<style>
	.goodsDetail {
		font-size: 14px;
		line-height: 30px;
	}
	
	.goodsDetail .content {
		padding: 15px 110px;
		color: #000;
		margin-bottom: 100px;
	}
	
	.goodsDetail .title {
		overflow: hidden;
		clear: both;
	}
	
	.goodsDetail h4 {
		float: left;
		margin-right: 8px;
	}
	
	.goodsDetail hr {
		margin-top: 15px;
		border: solid 1px #ccc;
		transform: scaleY(0.4);
	}
	
	.goodsDetail .oneRow {
		line-height: 40px;
		clear: both;
	}
	
	.goodsDetail hr+.oneRow {
		margin-top: 30px;
	}
	
	.goodsDetail .oneRow label {
		width: 180px;
		text-align: right;
		float: left;
	}
	
	.goodsDetail .oneRow p.valuedis {
		text-align: left;
		padding-left: 190px;
	}
	
	.goodsDetail .oneRow p.valuedis span {
		width: 150px;
		margin-right: 50px;
		text-align: left;
	}
	
	.goodsDetail .oneRow .imgs {
		padding-left: 10px;
		overflow: hidden;
		padding-top: 15px;
	}
	
	.goodsDetail .oneRow .imgs .oneImg {
		display: inline-block;
		float: left;
		margin-right: 15px;
		margin-bottom: 15px;
		width: 150px;
		height: 150px;
		border:1px solid #ccc;
	}
	
	.goodsDetail .oneRow .imgs .oneImg img {
		max-height: 150px;
		max-width: 150px;
	}
	
	.goodsDetail .oneRow.spec p {
		line-height: 30px;
	}
	
	.goodsDetail .oneRow.spec p:first-of-type {
		padding-top: 6px;
	}
	
	.goodsDetail .oneRow.spec p:last-of-type {
		padding-bottom: 6px;
	}
	
	.goodsDetail .goodsFactory {
		background-color: #fff;
		margin-bottom: 10px;
		clear: both;
	}
	
	.goodsDetail .goodsBody {
		padding-left: 190px;
	}
	
	.goodsDetail .bottomOper {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 80px;
		background-color: #ffffff;
		border-top: solid 1px #f6f6f6;
	}
	
	.goodsDetail .bottomOper .ivu-btn-primary {
		position: absolute;
		right: 320px;
		top: 25px;
	}
	
	.goodsDetail .bottomOper .ivu-btn-ghost {
		color: #11b69d;
		border-color: #11b69d;
		position: absolute;
		right: 205px;
		top: 25px;
	}
	
	.goodsDetail .ivu-btn-primary,
	.goodsDetail .ivu-btn-ghost {
		padding: 5px 25px;
	}
	
	.goodsDetail .ivu-modal-wrap p {
		line-height: 30px;
		padding: 0 20px;
	}
	
	.goodsDetail .ivu-modal-wrap textarea {
		margin-left: 20px;
		margin-top: 5px;
		width: 300px;
		height: 150px;
	}
	
	.goodsDetail .ivu-modal-wrap p.errorTip {
		color: red;
		line-height: 20px;
	}
	
	.goodsDetail .specView_table {
		/*width:100%;
		font-size:12px;
		line-height: 24px;*/
		border: solid 2px;
		width: inherit;
		height: 100%;
		max-width: 100%;
		overflow: hidden;
		color: #657180;
		font-size: 12px;
		background-color: #fff;
		box-sizing: border-box;
		float: left;
	}
	
	.goodsDetail .specView_table td,
	.specView_table th {
		padding: 0px 18px;
		min-width: 0;
		height: 48px;
		box-sizing: border-box;
		text-align: left;
		text-overflow: ellipsis;
		vertical-align: middle;
		border-bottom: 1px solid #e3e8ee;
		text-align: center;
	}
	
	.goodsDetail .specView_table th {
		/*width:100%;*/
		color: #657180;
		height: 40px;
		white-space: nowrap;
		overflow: hidden;
		background-color: #f5f7f9;
	}
</style>