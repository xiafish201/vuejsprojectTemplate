<template>
	<div class="page-placehold"></div>
    <div class="bottomOper">
		<i-button v-for="btn in buttons" :type="btn.class"  @click="clickAction(btn)">{{btn.label}}</i-button>
	</div>
</template>
<script>
	
/**
 * @file 页面底部悬浮按钮栏组件
 * @Author zhongzhian
 * 例子说明：参考店铺详情底部的按钮栏
 * 组件使用：
 *  引入：import bottomOper from 'component/BottomOper';
 *  标签示例：<bottom-oper :buttons="buttons"></bottom-oper>
 *  参数：
 *  @param {Array} buttons 按钮数组，
 * 		label：按钮文字
 * 		class：按钮样式，使用iview中的i-button的type，如primary，ghost
 * 		disabled：按钮禁用,目前暂时样式不处理
 * 		func：按钮事件，参数为本组件的this
 * 
 *      不传默认会有返回按钮，调用父组件的goback方法!!!!!
 * 
 * @public
 */

    export default {
        props: {
            buttons: {
                type: Array,
                default: [
                	{
                		label: '返回',
                		class: 'ghost',
                		disabled: false,
                		func: function(_self){
                			if(_self.$parent && _self.$parent.goback){
                				_self.$parent.goback();
                			}
                		}
                	}
                ]
            }
        },
		methods: {
			clickAction:function(btn){
				if(!btn.disabled){
					btn.func(this);
				}
			}
		}
    };
</script>
<style scoped>
    .bottomOper {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 80px;
		background-color: #ffffff;
		border-top: solid 1px #f6f6f6;
		z-index: 100;
	}
	
	.bottomOper .ivu-btn {
	    float: right;
		margin: 25px 50px 0px 0px;
	}
	
	.bottomOper .ivu-btn-ghost {
		color: #11b69d;
		border-color: #11b69d;
	}
	
	.page-placehold{
		height:100px;
	}
</style>
