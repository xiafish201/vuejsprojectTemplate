<template>
	<div class="jxdd_w100 jxdd_marLR30">
		<div class="jxdd_w100">
			<router-view keep-alive></router-view>
		</div>
	</div>
</template>

<script>
</script>

<style>
    /*面包屑*/
	.breadcrumb {
		border-left: 5px solid;
		padding-left: 10px;
		margin: 30px 0;
		height:30px;
	}
	.breadcrumb .ivu-breadcrumb-item-link {
		cursor: pointer;
		font-size: 16px;
		line-height: 30px;
	}
	.breadcrumb .ivu-breadcrumb-item-separator {
		font-size: 20px;
		margin:0;
	}
    /*tab跳转按钮*/
    .jxdd_cont .ivu-table-body table .ivu-btn-text{
        color: #11B69D;
    }
    .jxdd_cont .ivu-table-body .ivu-table-row-hover td{
        background: #c8e9e4;
    }
    .jxdd_cont .page-content .jxdd_tab .tableFoot{
        padding: 6px 0 5px 20px;
    }
    /*时间input*/
    .jxdd_cont .cont_search .ivu-date-picker,.jxdd_cont .cont_search .ivu-date-picker-editor{
        width: 290px;
    }
    .jxdd_cont .cont_search .ivu-date-picker .ivu-select-dropdown{
        top: 58px !important;
    }
    /*input*select*/
    .jxdd_cont .cont_search .ivu-input-wrapper,.jxdd_cont .cont_search .ivu-input,
    .jxdd_cont .cont_search .ivu-select{
        float: left;
    }
    .saerch_ri .ivu-select{
        margin-right: 1px;
    }
    .jxdd_cont .cont_search .cont_search_ul .ivu-select,.jxdd_cont .cont_search .cont_search_ul .ivu-input,
    .jxdd_cont .cont_search .ivu-date-picker,.jxdd_cont .cont_search .ivu-date-picker-editor{
        margin-top: 0;
    }
    /*select长度公用样式 --- select*(*表示字的个数) ---*/
    .jxdd_cont .select14{
        width: 202px;
    }
    .jxdd_cont .select12{
        width: 178px;
    }
    .jxdd_cont .select10{
        width: 156px;
    }
    .jxdd_cont .select8{
        width: 130px;
    }
    .jxdd_cont .select6{
         width: 106px;
     }
    .jxdd_cont .select4{
        width: 84px;
    }
    .jxdd_cont .select2{
        width: 70px;
    }
    .jxdd_cont .ivu-select-dropdown-list{
        width: 100%;
    }
</style>