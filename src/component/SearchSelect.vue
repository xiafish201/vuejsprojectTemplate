<template>
	<div class="component_searchselect_div myuid_{{myuid}}">
		<i-input style="width:300px;" :value.sync="searchKey" :placeholder="placeholder">
	        <!--<i-button slot="append" icon="ios-search" @click="search"></i-button>-->
	    </i-input>
	    <i-button type="primary" style="margin-left:10px;" @click="search">搜索</i-button>
	    <div v-if="showSearchPanel" @mouseleave="blur" class="goods_class_searchPanel">
			<ul v-if="searchList.length>0" class="jxdd_w100 goods_class_ul">
				<li v-for="item in searchList" @click="selectSearch(item)">{{item.label}}</li>
			</ul>
			<p v-else class="goods_class_p">
				{{emptyMsg}}
			</p>
	    </div>
	</div>
</template>

<script>
	export default {
		props: {
			searchList:{
				type:Array,
				default:[]
			},
			searchItem:{
				type:Object,
				default:{}
			},
			emptyMsg:{
				type:String,
				default:'无查询结果'
			},
			placeholder:{
				type:String,
				default:''
			}
		},
		data: function() {
			return {
				myuid:0,
				searchKey:'',
				showSearchPanel:false,
			}
		},
		methods: {
			blur(){
				this.showSearchPanel = false;
			},
			search() {
				var that = this;
				this.$parent.doSearchSelect(this.searchKey,function(){
					that.showSearchPanel = true;
				})
			},
			selectSearch(item){
				this.searchItem = item.value;
				this.showSearchPanel = false;
			}
		},
		watch: {
			searchItem:function(){
				this.searchKey = this.searchItem.parent_gc_name1+'>'
					+this.searchItem.parent_gc_name2+'>'+this.searchItem.gc_name;
			}
		}
	}
</script>

<style scoped>
	.component_searchselect_div{
		position: relative;
	}
	
	.goods_class_searchPanel{
		position: absolute;
		overflow: auto;
		top:35px;
		left: 0px;
		right:42px;
		/*width: 300px;*/
		background-color: #fff;
		z-index: 2;
	}
	
.goods_class_ul{
	border: solid 1px #ccc;
    max-height: 200px;
    overflow: auto;
}
.goods_class_p{
	border: solid 1px #ccc;
	text-align: center;
	font-size: 16px;
	padding:20px;
}
.goods_class_ul li{
	line-height: 24px;
    padding: 5px;
}
.goods_class_ul li.active{
	background-color: #999;
}
.goods_class_ul li:hover{
	background-color: #ccc;
	cursor: pointer;
}
</style>