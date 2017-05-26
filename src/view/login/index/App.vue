<template lang="html">
	<div class="jxdd_header jxdd_header_fixed">
		<div class="logo-icon-con">
			<img src="../../../static/img/zhyimg/zhy-logo.png" />
			<img style="margin-left: 30px;" src="../../../static/img/zhyimg/title.png" />
		</div>
	</div>
	<div class="jxdd_sticky clearfix">
		<!-- content start-->
		<div class="sticky_main">
			<div class="jxdd_cont">
				<!-- header start -->
				<!-- header end-->
				<!-- 100% type start -->
				<div class="jxdd_w100">
					<!-- cont start -->
					<div class="jxdd_w100">
						<div class="green-con relative">
							<img class="bgimg absolute" src="../../../static/img/zhyimg/zhy-tooling.png">
							<div class="login-con absolute">
								<p class="user-login-title">用户登录</p>
								<i-form v-ref:form-inline :model="formInline" :rules="ruleInline" inline id="sub-con">
									<p class="user-til">&nbsp;&nbsp;用户名</p>
									<Form-item prop="user">
										<div class="user-con relative">
											<i-input class="people" :value.sync="username" @on-focus="upfocus" @keyup="keyup" @on-enter="enterKey"></i-input>
											<Icon type="ios-person-outline" slot="prepend" class="person"></Icon>
											<Icon type="close" slot="pend" class="clears" @click="clearName" v-show="content!=''">{{content}}</Icon>
											<p class="verify-erro-tips" v-show="promptName!=null">{{promptName}}</p>
										</div>
									</Form-item>
									<p class="user-til">&nbsp;&nbsp;密码</p>
									<Form-item prop="password">
										<div class="user-con relative">
											<i-input class="clock" type="password" :value.sync="userpsw" @on-enter="enterKey" @on-focus="upfocus" @keyup="keyPaswContent"></i-input>
											<Icon type="ios-locked-outline" slot="prepend" class="locked"></Icon>
											<Icon type="close" slot="pend" class="clears" @click="clearPasw" v-show="paswContent!=''">{{paswContent}}</Icon>
											<p class="verify-erro-tips" v-show="promptPasw!=null">{{promptPasw}}</p>
										</div>
									</Form-item>
									<p class="user-til">&nbsp;&nbsp;验证码</p>
									<Form-item prop="verify">
										<div class="user-con relative">
											<input type="text" class="verifys radius4" v-model="vccode" @focus="upfocus" @keydown="enterKey"/>
											<img :src="login_vc_code" class="verify-img" / @click="ReAcquisition">
											<p class="verify-erro-tips">{{remind}}</p>
										</div>

									</Form-item>
									<span class="verify-erro-tips" v-show="promptCode!=null">{{promptCode}}</span>
									<Form-item>
										<i-button class="sub-btns radius6" type="primary"  @click="confirmLogin">登录</i-button>
									</Form-item>
								</i-form>
							</div>
							<div class="triangles absolute"></div>
						</div>

					</div>
					<!-- cont end -->
				</div>
				<!-- 100% type end -->
			</div>
		</div>
		<!-- content end-->
		<div class="fade-transition ivu-modal-mask" id="global-spin">
			<Spin class="div_window" fix>
				<Icon type="load-c" size=38 class="demo-spin-icon-load"></Icon>
				<div>Loading</div>
			</Spin>
		</div>
	</div>
</template>

<script>
import imgPath from 'api/imgPath';
import http from 'common/httpUtils';
import keyCode from 'common/keyCode';
import api from 'api';
import dataTime from 'common/dataTime';
import consts from 'common/consts';
import utils from 'common/utils';
import openMethod from 'common/openMethod';
import cacheUtils from 'common/cacheUtils';
export default {
    data() {
        return {
            login_vc_code: '',
            username: '',
            userpsw: '',
            vccode: '',
            securityId: '',
            remind: '',
            noName: '请输入用户名',
            nameError: '用户名错误',
            noPass: '请输入密码',
            errNamePsw: '请输入正确的用户名或密码！',
            noVerification: '请输入验证码',
            verificationError: '验证码错误！',
            content: '',
            promptName: '',
            promptPasw: '',
            promptCode: '',
            paswContent: '',
            userInfo: ''
        }
    },
    methods: {
        enterKey: function(event) {
            if (keyCode.code.reskey(event) === 13) {
                this.confirmLogin();
            }
        },
        clearName: function() {
            this.username = null;
        },
        clearPasw: function() {
            this.userpsw = null;
        },
        keyup: function() {
            if (this.username == '') {
                this.content = '';
            } else {
                this.content = "X";
            }
        },
        keyPaswContent: function() {
            if (this.userpsw == '') {
                this.paswContent = '';
            } else {
                this.paswContent = "X";
            }
        },
        upfocus: function() {
            this.remind = '';
            this.promptName = '';
            this.promptPasw = '';
            this.promptCode = '';
        },
        validate: function() {
            if (this.username.length == 0) {
                this.promptName = this.noName;
                return;
            } else if (this.username.length > 15) {
                this.promptName = "用户名的长度不能超过15个字符"
                return;
            }
            if (this.userpsw.length == 0) {
                this.promptPasw = this.noPass
                return;
            } else if (this.userpsw.length > 20) {
                this.promptPasw = '密码不能超过20个字符'
                return;
            }
            if (this.vccode.length == 0) {
                this.promptCode = this.noVerification
                return;
            }
        },
        confirmLogin: function() {
            this.validate();
            //清除cookie缓存
            cacheUtils.cookie.clear();
            cacheUtils.localStorage(consts.PERMISSION_LIST).del(consts.PERMISSION_LIST);
            cacheUtils.localStorage(consts.PERMISSION).del(consts.PERMISSION);
            var that = this
            var instanceId = cacheUtils.localStorage(consts.INSTANCE_ID).get(consts.INSTANCE_ID);
            var userTicket = utils.md5((utils.md5((this.username).toLowerCase() + utils.md5(this.userpsw))).toLowerCase() + dataTime.getTimestamp().toLowerCase() + instanceId.toLowerCase());
            var data = {
                'account_name': that.username,
                'timestamp': dataTime.getTimestamp(),
                'user_ticket': userTicket,
                'auth_code': that.vccode,
                'security_id': that.securityId
            };
            console.log(that.vccode)
            var urlPath = api.Api.login;
            http({
                url: urlPath,
                method: 'post',
                data: data
            }).then(function(res) {
                if (res.error_code == consts.ERROR_CODE.SUCCESS) {
                    // 将填写的用户对象存储
                    let userInfo = JSON.parse(res.result_data.user_info);
                    let permission_list = userInfo.permission_list || [];
                    let permissions = userInfo.permissions || [];
                    userInfo.permission_list = [];
                    that.userInfo = userInfo;
                    console.log("获取用户信息：" + JSON.stringify(that.userInfo));
                    cacheUtils.cookie.setObject(consts.USERINFO, that.userInfo);
                    cacheUtils.localStorage(consts.PERMISSION_LIST).setObject(consts.PERMISSION_LIST, permission_list);
                    cacheUtils.localStorage(consts.PERMISSION).setObject(consts.PERMISSION, permissions);
                    // openMethod.openMode.method({
                    //     url: api.ManagPath.home_index
                    // });
                    window.open(api.ManagPath.home_index, '_self');
                } else if (res && (res.error_code === 61016)) {
                    that.remind = that.verificationError;
                    that.RequestVerification();
                } else if (res && (res.error_code === 61010)) {
                    console.log('时间偏差过大');
                } else if (res && (res.error_code === 61002)) {
                    console.log('参数缺失');
                } else if (res && (res.error_code === 61001)) {
                    console.log('参数错误');
                } else if (res && (res.error_code === 61020)) {
                    that.userpsw = '';
                    that.vccode = '';
                    that.remind ='请输入正确的用户名或密码！';
                    that.RequestVerification();
                }

            }).catch(err => {
				 this.$Message.error('登录失败！');	
            });
        },
        ReAcquisition: function() {
            this.RequestVerification();
        },
        RequestVerification: function() {
            var that = this;
            http({
                method: 'post',
                url: api.Api.verification,
                data: {
                    "operation_type": 'login'
                }
            }).then(function(res) {
                if (res.error_code == consts.ERROR_CODE.SUCCESS) {
                    that.securityId = res.result_data.security_id;
                    that.login_vc_code = 'data:image/png;base64,' + res.result_data.image_data;
                }
            }).catch(err => {
                this.$Message.error('获取验证码失败！');
                
            });
        }
    },
    ready: function() {
        this.RequestVerification();
    }
}
</script>
<style>
.ivu-input {
    width: 286px !important;
    height: 42px !important;
    border: 3px solid #ccc !important;
    padding-left: 35px !important;
    padding-right: 42px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    float: left;
}

.ivu-icon-ios-person-outline:before,
.ivu-icon-ios-locked-outline:before {
    font-size: 23px;
}

.ivu-form-inline .ivu-form-item {
    width: 371px;
    margin-right: 0 !important;
}

.ivu-form-item-content {
    line-height: 15px !important;
    font-size: 16px !important;
}

#sub-con .ivu-form-item-error .ivu-input:focus {
    border-color: #11B69D !important;
    box-shadow: rgba(17, 182, 157, .9) !important;
}

#sub-con .ivu-form-item-error-tip {
    position: absolute !important;
    top: 100% !important;
    text-align: right;
    right: 0 !important;
}

input[type="text"]:focus,
input[type="password"]:focus {
    border: 3px solid #11B69D !important;
}

.ivu-btn-primary:hover {
    background-color: #11B69D !important;
    border-color: #e5e5e5 !important;
}
</style>
<style lang="css" scoped>
	.jxdd_header {
		height: 225px;
		background: #fff;
	}

	.logo-icon-con {
		float: left;
		margin-left: 78px;
		margin-top: 89px;
	}

	.green-con {
		width: 100%;
		height: 682px;
		background: #11b69d;
		margin-top: 13px;
	}

	.bgimg {
		top: 179px;
		left: 265px;
	}

	.login-con {
		width: 452px;
		height: 600px;
		padding-left: 40px;
		padding-right: 40px;
		background: #fff;
		top: -13px;
		right: 253px;
		box-shadow: -12px 12px 3px #0d9c94;
		z-index: 10;
		border-top: 1px solid #11b69d;
		border-right: 1px solid #11b69d;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	.jxdd_cont {
		top: 225px;
	}

	.triangles {
		width: 0;
		height: 0;
		border-bottom: 13px solid #0d9c94;
		border-left: 12px solid transparent;
		top: -13px;
		right: 705px;
	}

	.user-login-title {
		font-family: "微软雅黑";
		font-size: 26px;
		font-weight: bold;
		color: #11B69D;
		margin-top: 35px;
		text-align: center;
	}

	.clears {
		position: absolute;
		top: 16px;
		right: 118px;
		color: #ccc;
	}

	.user-til {
		font-family: "微软雅黑";
		font-size: 18px;
		color: #666;
		margin-top: 42px;
		margin-bottom: 10px;
	}

	.locked,
	.person {
		position: absolute;
		top: 11px;
		left: 12px;
	}

	.verifys {
		width: 153px !important;
		border: 3px solid #ccc;
		height: 42px;
		padding: 0 42px 0 35px;
		background: url(../../../static/img/zhyimg/verify.svg) no-repeat;
		background-size: 23px;
		background-position: 5px center;
	}

	.verify-img {
		width: 143px;
		height: 42px;
		display: inline-block;
		float: right;
	}

	.verify-erro-tips {
		text-align: left;
		color: #f30;
		font-family: "微软雅黑";
	}

	.sub-btns {
		width: 100%;
		height: 63px;
		box-sizing: border-box;
		border: 1px solid #e5e5e5;
		font-size: 20px;
		color: #fff;
		background: #11B69D;
	}
</style>
