<template>
    <div class="post-list">
        <div v-for="post in posts" :key="post.id">
            <single-post :post="post" />
        </div>
    </div>
</template>

<script>
import SinglePost from '@/components/SinglePost.vue'

export default {
    name: 'PostList',
    components: {
        SinglePost
    },
    props: ['posts']
}
</script>

<style lang="scss"></style>