<!--
        	作者：xiafish201@gmail.com
        	时间：2017-03-10
        	描述：营销管理
        -->
<template lang="html">
	<!-- page-name根据页面自己定义-->
	<div class='page-name'>
		<!-- 面包屑 ，相应的style写在app2.vue里面了-->
		<div class="breadcrumb">
			<Breadcrumb separator=">">
				<Breadcrumb-item @click="goback">XX文章列表</Breadcrumb-item>
				<Breadcrumb-item>增加文章</Breadcrumb-item>
			</Breadcrumb>
		</div>
		<!-- 页面内容 -->
		<div class='page-content'>
			模板页面
		</div>
	</div>

</template>

<script>
	export default {
		data: function() {return {}},
		ready: function() {},
		methods: {
			goback: function() {
				this.$route.router.go('/goods/goodsList');
			}
		}
	}
</script>

<style lang="css">

</style>