<template>
	<div class="page-content">
		<div class="cell">
			<h1>欢迎登入运营管理系统</h1>
			<img class="index-img" src="../../static/img/zhyimg/zhy-tooling.png">
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {};
		},
		components: {},
		methods: {},
		ready: function() {}
	};
</script>

<style lang="css" scoped>
	.page-content {
		width: 100%;
		height: 100%;
		background: #11b69d;
		text-align: center;
		display: table;
	}
	
	.page-content h1 {
		text-shadow: -12px 12px 0px rgba(96, 92, 92, 0.37);
		font-size: 98px;
		color: #ccc;
		font-weight: 400;
	}
	
	.page-content img {
		margin-top: 150px;
	}
	
	.page-content .cell {
		display: table-cell;
		vertical-align: middle;
	}
</style>