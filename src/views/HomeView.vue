<template>
  <div>
    <post-list :posts="posts" />


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
      {
        title: 'Welcome to the blog',
        body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo quas, aspernatur natus, minus fugiat reprehenderit debitis autem iusto voluptate expedita consequuntur provident dicta iure cupiditate? Quia quam recusandae necessitatibus deleniti nam blanditiis numquam tempore similique commodi consequatur, vitae ullam obcaecati beatae esse, cumque aspernatur. Veniam harum iste, deserunt dolores adipisci necessitatibus vero totam temporibus corporis debitis corrupti et porro officia velit delectus facilis! Ipsam aspernatur obcaecati non neque cupiditate at voluptas, quasi, tempore omnis earum ipsum. Itaque, mollitia et. Neque aperiam assumenda fugiat dicta fugit saepe placeat nihil harum labore. Ipsam dolores labore dolorem eaque cumque nemo consequatur aperiam aliquid?',
        id: 1
      },
      {
        title: 'Top 5 CSS tips',
        body: 'Lorem ipsum',
        id: 2
      }
    ])

    return { posts }
  }
}
</script>
