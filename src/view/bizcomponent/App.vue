<template>
	<div>
		<div class="jxdd_sticky clearfix">
			<div class="sticky_main">
				<vheader v-ref:vheader></vheader>
				<div class="jxdd_cont" :style="{top:contTop+'px'}">
					<router-view keep-alive></router-view>
				</div>
			</div>
		</div>
		<vfooter></vfooter>
		<div class="fade-transition ivu-modal-mask loading" id="global-spin">
			<Spin class="div_window" fix>
				<Icon type="load-c" size=38 class="demo-spin-icon-load"></Icon>
				<div>Loading</div>
			</Spin>
		</div>
	</div>
</template>
<script>
	import vheader from 'component/vheader';
	import vfooter from 'component/vfooter';
	export default {
		data: function() {
			return {
				router: this.$route.router,
				contTop: 80
			};
		},
		components: {
			vheader,
			vfooter
		},
		methods: {
			showMenu: function() {
				this.$refs.vheader.leMenuSAH(2);
			}
		},
		events: {
			'close-tab': function(path) {
				console.log('app recive event close tab:' + path);
				this.$broadcast('close-tab', path);
			}
		},
		ready: function() {
			let self = this;
			this.$Message.config({
				top: 350,
				duration: 3
			});
			window.addEventListener('click', function(event) {
				let target = event.target.parentNode || {};
				let className = target.className || '';
				let menuBtn = (event.target || {}).className || '';
				if(menuBtn.indexOf('menu-btn') != -1) {
					return;
				}
				let menuDoc = document.querySelector('.h_le_menu');
				if(menuDoc.contains(event.target)) {
					return;
				}
				if(className.indexOf('h_le_menu') != -1) {
					return;
				}
				self.showMenu();
			});
			this.$route.router.afterEach(transition => {
				console.log('transition.to.path:' + transition.to.path);
				if(transition.to.path == '/') {
					this.contTop = 80;
				} else {
					this.contTop = 130;
				}
			});
		}
	};
</script>

<style lang="css">
	.div_window {
		width: 400px !important;
		height: 300px !important;
		position: fixed !important;
		left: 50% !important;
		top: 50% !important;
		margin-top: -150px;
		margin-left: -250px;
		background-color: rgba(220, 220, 220, 0) !important;
	}
	
	.demo-spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;
	}
	
	@keyframes ani-demo-spin {
		from {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	.ivu-modal-mask.loading {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(55, 55, 55, 0.6);
		height: 100%;
		z-index: 1000;
		display: none;
	}
</style>