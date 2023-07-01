<template>
  <div>
    <form @submit.prevent>
      <h4>Создание поста</h4>
      <my-input v-model="post.title" type="text" placeholder="название" />
      <my-input v-model="post.body" type="text" placeholder="Описание" />

      <my-button class="form__btn" @click="createPost">Создать </my-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.form__btn {
  align-self: flex-end;
  margin-top: 15px;
}
</style>
