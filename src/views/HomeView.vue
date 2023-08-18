<template>
  <div>
    <post-list :posts="posts"></post-list>
  </div>
</template>

<script>
import { ref } from 'vue'
import PostList from '@/components/PostList.vue'

export default {
  name: 'HomeView',
  components: {
    PostList
  },
  setup() {
    const posts = ref([
      { title: 'Welcome to the blog', body: 'Lorem ipsum', id: 1 },
      { title: 'Top 5 CSS tips', body: 'Lorem ipsum', id: 2 }
    ])

    return { posts }
  }
}
</script>
