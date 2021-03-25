<template>
  <div>
    <!-- Successful Message -->
    <div
      v-if="type === 'success_message'"
      class="h-auto w-auto mx-10 p-4 text-sm bg-green-500 text-white flex items-center justify-center rounded-lg shadow-lg"
    >
      <i class="fas fa-check-circle fa-lg mr-2"></i>
      <span class="font-poppins">
        {{ message }}
      </span>
    </div>

    <!-- Error Message -->
    <div
      v-if="type === 'error_message'"
      class="h-auto w-auto mx-10 p-4 text-sm text-white bg-red-500 flex items-center justify-center rounded-lg shadow-lg"
    >
      <i class="fas fa-exclamation-circle fa-lg mr-2"></i>
      <span class="font-poppins">
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Notification",

  props: {
    message: String,
    type: String,
  },
});
</script>
