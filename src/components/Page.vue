<template>
    <div>
        <div>hello</div>
        <div>
            <button @click="test">点击</button>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        methods: {
            test () {
                axios.get('/api/search?keywords=海阔天空').then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>
<style>

</style>
