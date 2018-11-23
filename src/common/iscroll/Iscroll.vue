<template>
    <!-- 滚动视图 -->
    <div class="content">
        <!-- 滚动容器 -->
        <div class="wrap">
            <!-- 滚动的内容 -->
            <slot/>
        </div>
    </div>
</template>
<script src="../../../build/iscroll-probe.js"></script>  
<script>


export default {
    name:'iscroll',
    created(){
        var myScroll = new IScroll('.content', {
            //常见的配置项
            bounce: true,//默认为：true，弹簧效果
            click: true,//默认为false,click事件是否监听
            tap: true,//默认为false,tap事件是否监听
            // 滚动条的配置
            scrollbars: true,
            fadeScrollbars: true,
            interactiveScrollbars: true,
            //x,y轴是否可以滚动
            scrollX: true,//默认为false
            scrollY: true,//默认为true
            //x，y轴初始位置
            startX: -20,
            startY: -180,
            //设置滚动是的监听级别
            probeType: 3//1,2,3
        });
    }
}
</script>

<style>

</style>
