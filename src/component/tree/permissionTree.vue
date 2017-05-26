<template lang="html">
    <div :class="classes">
        <div :class="[itemClasses, {'ivu-collapse-item-active': activeKey.includes(i1)}]" v-for="(i1, p1) of postData">
            <div :class="headerClasses" @click="toggle(i1)">
                <Icon type="arrow-right-b"></Icon>&nbsp;&nbsp;
                <Checkbox class="header" :checked.sync="p1.checked" :indeterminate="p1.indeterminate"
                @click.stop.prevent="handleCheckP1(i1)">{{p1.name}}</Checkbox>
            </div>
            <div :class="concentClasses" v-show="activeKey.includes(i1)">
                <div :class="boxClasses">
                    <Row type="flex" justify="start" v-for="(i2,p2) of p1.children">
                        <i-col span="2">
                            <Checkbox :checked.sync="p2.checked" :indeterminate="p2.indeterminate"
                            @click.stop.prevent="handleCheckP2(i1,i2,i3)">{{p2.name}}</Checkbox>
                            <Icon type="chevron-right"></Icon>
                        </i-col>
                        <i-col v-for="(i3,p3) of p2.children">
                            <Checkbox :checked.sync="p3.checked"
                            @click.stop.prevent="handleCheckP3(i1,i2,i3)">{{p3.name}}</Checkbox>
                        </i-col>
                    </Row>
                </div>
            </div>
        </div>
    </div>
</template>

<!--suppress JSUnusedGlobalSymbols, ES6ModulesDependencies, JSUnresolvedFunction -->
<script>
    import api from 'api';
    import consts from 'common/consts';
    const prefixCls = 'ivu-collapse';
	export default {
	    name: 'permission-tree',
	    props: {
	        data: {
	            type: Array,
                default: Array
            },
            value: {
                type: Array,
                default: Array
            },
            checked: {
                type: Boolean,
                twoWay: true,
                default: false
            },
            indeterminate: {
	            type: Boolean,
                twoWay: true,
                default: false
            },
            disabled: {
	            type: Boolean,
                default: false
            },
            activeKey: {
	            type: Array,
                default: Array
            }
        },
	    computed: {
            classes () {
                return `${prefixCls}`;
            },
            itemClasses () {
                return `${prefixCls}-item`;
            },
            headerClasses () {
                return `${prefixCls}-header`;
            },
            concentClasses () {
                return `${prefixCls}-content`;
            },
            boxClasses () {
                return `${prefixCls}-content-box`;
            }
        },
	    data() {
	        return {
                postData: [],
                checkedIds: []
            }
        },
        methods: {
            toggle(i1) {
                let index = this.activeKey.indexOf(i1);
                if (index !== -1) {
                    this.activeKey.splice(index, 1);
                } else {
                    this.activeKey.push(i1);
                }
            },
            estimateAllChecked() {
                this.checked = this.postData.every(item => item.checked);
                this.indeterminate = !this.checked && this.postData.some(item => (item.indeterminate || item.checked));
            },
            checkAll(checked) {
                let data = [];
                this.checkedIds = [];
                // downward level1,level2,level3
                this.postData.forEach(p1 => {
                    let newP1 = {
                        id: p1.id,
                        name: p1.name,
                        checked: checked,
                        indeterminate: false
                    };

                    if (p1.children) {
                        newP1.children = [];
                        p1.children.forEach(p2 => {
                            let newP2 = {
                                id: p2.id,
                                name: p2.name,
                                checked: checked,
                                indeterminate: false
                            };

                            if (p2.children) {
                                newP2.children = [];
                                p2.children.forEach(p3 => {
                                    let newP3 = {
                                        id: p3.id,
                                        name: p3.name,
                                        checked: checked
                                    };
                                    newP2.children.push(newP3);

                                    // gather checked permission id of level3
                                    if (checked) {
                                        this.checkedIds.push(p3.id);
                                    }
                                });
                            }
                            newP1.children.push(newP2);
                        });
                    }
                    data.push(newP1);
                });
                this.postData = data;

                // gather checked
                this.$emit('on-change', this.checkedIds);
            },
            handleCheckP1(i1) {
                if (this.disabled) {
                    return false;
                }

                let p1 = this.postData[i1];
                let index = this.checkedIds.indexOf(p1.id);
                let checked = !p1.checked;
                let p1Children = [];

                // downward level2, level3
                for (let p2 of p1.children) {
                    let newP2 = {
                        id: p2.id,
                        name: p2.name,
                        checked: checked,
                        indeterminate: false,
                        children: []
                    }

                    for (let p3 of p2.children) {
                        let newP3 = {
                            id: p3.id,
                            name: p3.name,
                            checked: checked
                        }

                        // gather checked permission id of level3
                        this._getCheckIds(checked, p3.id);

                        newP2.children.push(newP3);
                    }
                    p1Children.push(newP2);
                }

                // set level3
                if (p1.indeterminate) {
                    this.postData.$set(i1, {...p1, ...{checked: false, indeterminate: false, children: p1Children}});
                } else {
                    this.postData.$set(i1, {...p1, ...{checked: !p1.checked, children: p1Children}});
                }

                // upward all
                this.estimateAllChecked();

                this.$emit('on-change', this.checkedIds);
            },
            handleCheckP2(i1, i2) {
                if (this.disabled) {
                    return false;
                }

                let p1 = this.postData[i1];
                let p1Children = p1.children;
                let p2 = p1Children[i2];

                // set level2
                if (p2.indeterminate) {
                    p2.checked = false;
                 } else {
                    p2.checked = !p2.checked;
                }
                p2.indeterminate = false;

                // downward level3
                for (let p3 of p2.children) {
                    p3.checked = p2.checked;

                    // gather checked permission id of level3
                    this._getCheckIds(p2.checked, p3.id);
                }

                // upward level1
                p1.checked = p1Children.every(item => item.checked);
                p1.indeterminate = !p1.checked && p1Children.some(item => (item.indeterminate || item.checked));
                this.postData.$set(i1, JSON.parse(JSON.stringify(p1)));

                // upward all
                this.estimateAllChecked();
                this.$emit('on-change', this.checkedIds);
            },
            handleCheckP3(i1, i2, i3) {
                if (this.disabled) {
                    return false;
                }

                let p1 = this.postData[i1];
                let p1Children = p1.children;
                let p2 = p1.children[i2];
                let p2Children = p2.children;

                // set level3
                p2Children[i3].checked = !p2Children[i3].checked;

                // gather checked permission id of level3
                this._getCheckIds(p2Children[i3].checked, p2Children[i3].id);

                // upward level2
                p2.checked = p2Children.every(item => item.checked);
                p2.indeterminate = !p2.checked && p2Children.some(item => item.checked);

                // upward level1
                p1.checked = p1Children.every(item => item.checked);
                p1.indeterminate = !p1.checked && p1Children.some(item => (item.indeterminate || item.checked));
                this.postData.$set(i1, JSON.parse(JSON.stringify(p1)));

                // upward all
                this.estimateAllChecked();

                this.$emit('on-change', this.checkedIds);
            },
            _getCheckIds(checked, id) {
                let index = this.checkedIds.indexOf(id);
                if (checked) {
                    if (index === -1) {
                        this.checkedIds.push(id);
                    }
                } else {
                    if (index !== -1) {
                        this.checkedIds.splice(index, 1);
                    }
                }
            },
            dataPostProcessor(val) {
                if (!this.data instanceof Array) return;
                if (!val instanceof Array) {
                    this.postData = data;
                    return;
                }
                let data = this.data;
                this.checkedIds = val;
                for (let p1 of data) {
                    for (let p2 of p1.children) {
                        for (let p3 of p2.children) {
                            if (this.checkedIds.includes(p3.id)) {
                                p3.checked = true;
                            } else {
                                p3.checked = false;
                            }
                        }
                        p2.checked = p2.children.every(item => item.checked);
                        p2.indeterminate = !p2.checked && p2.children.some(item => item.checked);
                    }
                    p1.checked = p1.children.every(item => item.checked);
                    p1.indeterminate = !p1.checked && p1.children.some(item => item.checked || item.indeterminate);
                }
                this.checked = data.every(item => item.checked);
                this.indeterminate = !this.checked && data.some(item => item.checked || item.indeterminate);
                this.postData = data;
            }
        },
        watch: {
	        data(newVal) {
	            console.log(newVal);
	            if (!newVal instanceof Array) return;
	            if (this.value.length === 0) {
                    this.postData = newVal;
                }
            },
            value(newVal) {
                console.log(`value: ${newVal}`);
                this.dataPostProcessor(newVal);
            },
            activeKey(newVal) {
                console.log(`active-key: ${newVal}`);
            }
        },
        events: {
            'check-all': function (checked) {
                this.checkAll(checked);
            }
        }
    }
</script>
<style lang="less" scoped>
    .ivu-collapse {
        .ivu-collapse-item {
            -moz-user-select:none;/*火狐*/
            -webkit-user-select:none;/*webkit浏览器*/
            -ms-user-select:none;/*IE10*/
            -khtml-user-select:none;/*早期浏览器*/
            user-select:none;
        }
    }
    .ivu-collapse-content-box {
        margin-left: 32px;
    }
</style>
