<template>
	<div class="modalImg">
		<!--<img v-if="active == 'hover'" :src="picUrl" @mouseenter.stop="showPic" @mouseleave.stop="hidePic" />-->
		<img v-if="active == 'click'" :src="picUrl" @click.stop="showPic"/>
	</div>
	<Modal title="查看图片" :visible.sync="isShowPic" >
        <img :src="picUrl" style="width: 100%">
    	<div slot="footer">
        </div>
    </Modal>
</template>
<script>
	
/**
 * @file 页面底部悬浮按钮栏组件
 * @Author zhongzhian
 * 例子说明：参考店铺详情底部的按钮栏
 * 组件使用：
 *  引入：import modalImg from 'component/ModalImg';
 *  标签示例：<modal-img :pic-url=""></modal-img>
 *  参数：
 *  @param {Array} picUrl 图片url，
 * @public
 */

    export default {
        props: {
			picUrl:{
				type:String,
				default:''
			},
			active: {
				type: String,
				default:'click'
			}
        },
        data: function(){
        	return {
        		isShowPic: false
        	}
        },
		methods: {
			showPic: function (url){
				if(!this.isShowPic){
					this.isShowPic = true;
				}
			},
			hidePic: function (){
//				this.isShowPic = false;
			}
		}
    };
</script>
<style scoped>
.modalImg{
	display: inline-block;
	width: 200px;
	height: 150px;
}
.modalImg img{
	width:100%;
	height:100%;
}
</style>
