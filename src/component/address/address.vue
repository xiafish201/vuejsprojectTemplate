<template>
    <Row type="flex" justify="start" :gutter="12" :style="{width: width+'px'}">
        <i-col span="5" v-if="type>=0" v-show="!isHiddenCountry">
            <i-select :model.sync="value.country" placeholder="请选择" :label-in-value="true"
                      @on-change="countryChange">
                <i-option :value="-1">请选择</i-option>
                <i-option v-for="item in countryList" :value="item.value">{{ item.label }}</i-option>
            </i-select>
        </i-col>
        <i-col span="5" v-if="type>=1">
            <i-select :model.sync="value.province" placeholder="请选择"
                      :label-in-value="true" @on-change="provinceChange">
                <i-option :value="-1">请选择</i-option>
                <i-option v-for="item in provinceList" :value="item.value">{{ item.label }}</i-option>
            </i-select>
        </i-col>
        <i-col span="7" v-if="type>=2">
            <i-select :model.sync="value.city" placeholder="请选择" :label-in-value="true"
                      @on-change="cityChange">
                <i-option :value="-1">请选择</i-option>
                <i-option v-for="item in cityList" :value="item.value">{{ item.label }}</i-option>
            </i-select>
        </i-col>
        <i-col span="7" v-if="type>=3">
            <i-select :model.sync="value.region" placeholder="请选择" :label-in-value="true"
                      @on-change="regionChange">
                <i-option :value="-1">请选择</i-option>
                <i-option v-for="item in regionList" :value="item.value">{{ item.label }}</i-option>
            </i-select>
        </i-col>
    </Row>
    <Row type="flex" v-if="type==4" justify="start" :gutter="12" :style="{width: width+'px'}">
        <i-col span="24">
            <i-input :value.sync="detail" type="textarea" style="margin-top:10px;" placeholder="请输入详细地址"></i-input>
        </i-col>
    </Row>
</template>
<script>
    import axios from 'common/httpUtils';
    import api from 'api';
    import consts from 'common/consts';

    const checkAreaId = (id) => {
        return typeof(id) === 'number' && id >= 0
    };

    export default {
        props: {
            value: {
                type: Object,
                default() {
                    return {
                        country: -1,
                        province: -1,
                        city: -1,
                        region: -1
                    }
                }
            },
            detail: {
                type: String,
                default: ''
            },
            selectLable: {
                type: Object,
                twoWay: true,
                default() {
                    return {
                        country: '',
                        province: '',
                        city: '',
                        region: ''
                    }
                }
            },
            label: {
                type: String,
                twoWay: true,
                default: ''
            },
            selection: {
                type: Array,
                twoWay: true,
                default: Array
            },
            renderFormat: Function,
            width: {
                type: Number,
                default: 460
            },
            type: {
                type: Number,
                default: 3 // 精确位置到：0 国，1 省，2 地级市，3 县级市
            },
            separator: {
            	type: String,
            	default: '-'//默认分隔符
            },
            isHiddenCountry: {//默认不隐藏国家字段
            	type: Boolean,
            	default: false
            }
        },
        data() {
            return {
                countryList: [],
                provinceList: [],
                cityList: [],
                regionList: []
            }
        },
        methods: {
            countryChange(selection) {
                this.provinceList = [];
                this.cityList = [];
                this.regionList = [];
                if (checkAreaId(selection.value)) {
                    this.getAreaByParent(selection.value).then(res => {
                        if (res.error_code == consts.ERROR_CODE.SUCCESS) {
                            this.provinceList = res.result_data.map(item => ({
                                value: item.area_id,
                                label: item.area_name
                            }));
                            //回显省start
                            this.processSelectLable('province',this.provinceList);
                            //回显省end
                        } else {
                            this.$Message.error('获取省份列表失败');
                        }
                    }).catch(err => {
                        this.$Message.error('获取省份列表失败，请稍后重试');
                    });
                    this.selection[0] = selection;
                } else {
                    this.value.province = -1;
                    this.value.city = -1;
                    this.value.region = -1;
                    this.selection[0] = {value: -1, label: ''};
                }
                this.label = this.renderFormat ? this.renderFormat(this.selection) : this.format();
            },
            provinceChange(selection) {
                this.cityList = [];
                this.regionList = [];
                if (checkAreaId(selection.value)) {
                    this.getAreaByParent(selection.value).then(res => {
                        if (res.error_code == consts.ERROR_CODE.SUCCESS) {
                            this.cityList = res.result_data.map(item => ({value: item.area_id, label: item.area_name}));
                            //回显市start
                            this.processSelectLable('city',this.cityList);
                            //回显市end
                        } else {
                            this.$Message.error('获取城市列表失败');
                        }
                    }).catch(err => {
                        this.$Message.error('获取城市列表失败，请稍后重试');
                    });
                    this.selection[1] = selection;
                } else {
                    this.selection[1] = {value: -1, label: ''};
                    this.value.city = -1;
                    this.value.region = -1;
                }
                this.label = this.renderFormat ? this.renderFormat(this.selection) : this.format();
            },
            cityChange(selection) {
                this.regionList = [];
                if (checkAreaId(selection.value)) {
                    this.getAreaByParent(selection.value).then(res => {
                        if (res.error_code == consts.ERROR_CODE.SUCCESS) {
                            this.regionList = res.result_data.map(item => ({
                                value: item.area_id,
                                label: item.area_name
                            }));
                            //回显区start
                            this.processSelectLable('region',this.regionList);
                            //回显区end
                        } else {
                            this.$Message.error('获取区域列表失败');
                        }
                    }).catch(err => {
                        this.$Message.error('获取区域列表失败，请稍后重试');
                    });
                    this.selection[2] = selection;
                } else {
                    this.selection[2] = {value: -1, label: ''};
                    this.value.region = -1;
                }
                this.label = this.renderFormat ? this.renderFormat(this.selection) : this.format();
            },
            regionChange(selection) {
                if (checkAreaId(selection.value)) {
                    this.selection[3] = selection;
                } else {
                    this.selection[3] = {value: -1, label: ''};
                }
                this.label = this.renderFormat ? this.renderFormat(this.selection) : this.format();
            },
            format(separator = '-') {
                let labels = this.selection.filter(item => item.label).map(item => item.label);
                return labels.join(separator);
            },
            getAreaByDeep(area_deep = 0) {
                return axios({
                    url: api.Api.getAreaByDeep,
                    method: 'post',
                    hasGlobalSpin: false,
                    data: {
                        area_deep: area_deep
                    }
                })
            },
            getAreaByParent(area_parent_id) {
                return axios({
                    url: api.Api.getAreaByParent,
                    method: 'post',
                    hasGlobalSpin: false,
                    data: {
                        area_parent_id: area_parent_id
                    }
                });
            },
            //根据中文回显处理
            processSelectLable(propty,list){
            	if(this.selectLable[propty]){
                	for(let i=0;i<list.length;i++){
                		let item= list[i];
                		if(this.selectLable[propty].indexOf(item.label)!=-1||item.label.indexOf(this.selectLable[propty])!=-1){
                    		this.$nextTick(()=>(this.value[propty]=item.value));//自动选中,去查询下级
                    		break;
                    	}
                	}
            		this.selectLable[propty]='';
            	}
            },
            //查询国家回调函数
            getCountry(){
            	this.getAreaByDeep().then(res => {
	                if (res.error_code == consts.ERROR_CODE.SUCCESS) {
	                    this.countryList = res.result_data.map(item => {
	                        return {value: item.area_id, label: item.area_name};
	                    });
	                    //回显国start
	                    this.processSelectLable('country',this.countryList);
	                    //回显国end
	                } else {
	                    this.$Message.error('获取国家列表失败');
	                }
	            }).catch(err => {
	                this.$Message.error('获取国家列表失败，请稍后重试');
	            });
            }
        },
        watch: {
            value() {
                this.$nextTick(() => {
                    this.label = this.renderFormat ? this.renderFormat(this.selection) : this.format();
                })
            }
        },
        created() {
        	this.getCountry();
        },
        events:{
        	selectLable(selectLable,separator){
        		if(selectLable){
        			separator = separator ? separator : this.separator;
        			let arr = selectLable.split(separator);
					this.selectLable.country= arr[0] ? arr[0] : '';
					this.selectLable.province=arr[1] ? arr[1] : '';
					this.selectLable.city=arr[2] ? arr[2] : '';
					this.selectLable.region=arr[3] ? arr[3] : '';
        		}
        		this.value.country=-1;
        		this.getCountry();
        	}
        }
    }
</script>
