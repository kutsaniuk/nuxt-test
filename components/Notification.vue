<template>
  <div class="alert alert-danger mt-5">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: ['message'],
};
</script>
