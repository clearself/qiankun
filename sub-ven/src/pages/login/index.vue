<template>
    <div class="ub ub-ver ub-ac ub-pc w100">
        <div style="margin-top:100px;"><img alt="Vue logo" src="../../assets/img/logo.png"></div>
        <div class="vns-btn marb">
            <a href="https://clearself.github.io/vs-ui/dist/index.html#/" target="_blank" >vns-ui</a>
        </div>
        <vs-drag-ball>
            <i class="vs-icon-remind font"></i>
        </vs-drag-ball>
        <div class="marb">组件展示：</div>
        <div class="ub marb">
            <vs-button @click="isShow = true" type="primary">Drag拖拽框</vs-button>
        </div>
        <vs-drag title="聊天管理" :drag-min-width="500" :drag-min-height="500" v-if="isShow" @close="close"><div>拖动边框可改变宽高</div></vs-drag>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            isShow: false
        }
    },
    created() {

    },
    methods: {
        close(val) {
            this.isShow = val
        }
    }
}
</script>

<style lang="scss">
    .marb{
        margin-bottom: 20px;
    }
    .vns-btn{
        a {
            color:blue;
            font-size:16px;
            text-decoration: underline;
        }
        a:hover{
            color:blue;
            text-decoration: underline;
        }
    }
</style>
