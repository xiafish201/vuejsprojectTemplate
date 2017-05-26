<template>

	<!--style="{{width ? 'width:'+(width+10)+'px' : ''}}"-->
	<div class="select logSelect normalselect_{{myuid}}" :style="{width: width ? (width+18) + 'px' : '168px'}">
		<span class="logStores defaultColor {{disabled ? 'comSelect-disabled disableColor' : ''}}" @click="showOption" :style="{width : width ? (width)+'px' : '150px'}">{{selectoption ? selectoption.text: ''}}</span>
		<i class="seIClass {{disabled ? 'comSelect-disabled' : ''}}" @click="showOption"></i>
		<div class="selectList logSelectList" v-show="isShow" :style="{'overflow-y': 'auto', 'max-height': '246px', 'display': 'none','width': width ? (width+18)+'px' : '168px'}">
			<!-- 账户名称下拉框 -->
			<div class="logSelects">
				<ul class="overflowHH">
					<li v-for="option in options" v-show="option.display !== false" @click="selectOption(option, $index)" name="logStores">{{option ? option.text:''}}</li>
				</ul>
			</div>
			<!-- 账户名称下拉框 -->
		</div>
	</div>

</template>

<script>
	export default {
		props: {
			isclass: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			width: {
				type: Number,
				default: 0
			},
			options: {
				type: Array,
				default: () => {
					return [{
						value: '1',
						text: 'option1'
					}, {
						value: '2',
						text: 'option2'
					}, {
						value: '3',
						text: 'option3'
					}];
				}
			},
			//			selectoption: Object
			selectoption: {
				type: Object,
				default: () => {
					return {
						value: '',
						text: ''
					}
				}
			},
			selectcallback: {
				type: Function,
				default() {
					return function() {};
				}
			}
		},
		data: function() {
			return {
				isShow: false,
				myuid: 0
			}
		},
		methods: {
			showOption: function() {
				if(this.disabled) return false;
				var that = this;
				this.isShow = !this.isShow;
			},
			selectOption: function(option, index) {
				this.selectoption = option;
				this.selectoption.index = index;
				this.isShow = false;
				this.selectcallback();
			}
		},
		ready: function() {
			var that = this;
			//      if(this.selectoption){
			//      	if(!this.selectoption.text){
			//          	this.selectoption = this.options[0];
			//      	}
			//      }else{
			//          this.selectoption = this.options[0];
			//      }
			if(!this.selectoption || !this.selectoption.text) {
				this.selectoption = this.options[0];
			}
			that.myuid = that._uid;
			document.addEventListener("click", function(event) {
				if(!event.target.parentNode) return;
				if(event.target.parentNode.className != 'select logSelect normalselect_' + that._uid) {
					that.isShow = false;
				}
			});
		}
	}
</script>

<style scoped>
	.rInforNPosit.moreSelect .select>span {
		white-space: nowrap;
		overflow: hidden;
	}
	
	.comSelect-disabled {
		cursor: default !important;
	}
	
	.logStores {
		overflow: hidden;
	}
	
	.select {
		font-size: 14px;
		border: 1px solid #999999;
		width: 49px;
		height: 20px;
		margin-left: 6px;
		margin-right: 4px;
		appearance: none;
		background: url('../static/img/selectCounts.png');
		padding-left: 5px;
	}
	
	.selectList,
	.select>span,
	.select>i,
	.select>i,
	.selectList {
		position: absolute;
	}
	
	.select,
	.select>span,
	.selectList {
		background: #ffffff;
	}
	
	.select {
		position: relative;
		margin: 0 auto;
		border: 1px solid #cccccc;
		height: 28px;
		width: 120px;
		/*-webkit-transition: all 0.3s ease 0s;-o-transition: all 0.3s ease 0s;transition: all 0.3s ease 0s;*/
	}
	
	.select>span {
		display: inline-block;
		color: #333333;
		height: 100%;
		line-height: 26px;
		text-align: left;
		width: 100px;
		left: 0;
		text-indent: 15px;
		font-size: 14px;
	}
	
	.select>i {
		height: 24px;
		right: 1px !important;
		top: 1px;
		width: 16px;
		z-index: 2;
	}
	
	.select>span,
	.select>i {
		cursor: pointer;
	}
	
	.selectList {
		z-index: 100;
		left: -1px;
		border: 1px solid #cccccc;
		width: 120px;
		top: 100%;
	}
	
	.select>i {
		right: 0;
	}
	
	.select>i {
		background: url(../static/img/rzicon.png) no-repeat 3px 9px #e6e6e6;
	}
	
	.select>i.active {
		background-position: -884px 15px;
	}
	
	.select li {
		cursor: pointer;
		float: left;
		margin: 0 !important;
		padding: 0 15px;
		height: 30px;
		line-height: 30px;
		text-align: left;
		width: 100%;
		text-align: left !important;
		color: #666666;
		font-size: 14px;
		overflow: hidden;
	}
	
	.select li:hover {
		background: #94a4d0;
		color: #ffffff;
	}
	
	.selectBcolor {
		border: 1px solid #00a0e9;
	}
	
	.select .defaultColor {
		color: #999999;
	}
	
	.select .disableColor {
		background: #f3f5f7;
	}
</style>