<template>
    <div class="mask" :style="{'opacity': opacity, 'display': display ? 'block' : 'none'}">

    </div>
</template>
<script>
    export default {
        props: {
            display: Boolean,
            opacity: {
                type: String,
                default: '0.6'
            }
        }
    };
</script>
<style scoped>
    .mask {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #000000;
        opacity: 0.6;
        z-index: 999;
    }

</style>
