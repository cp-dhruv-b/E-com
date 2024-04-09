<template>
  <div class="flex justify-center items-center h-screen">
    <form class="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input
          v-model="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Name"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          @click.prevent="registerAdmin"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async registerAdmin() {
      try {
        const response = await axios.post("http://localhost:3000/admin/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        if (response && response.data) {
          console.log("Admin registration successful", response.data);
          localStorage.setItem("token", response.data.token);
        } else {
          console.error("Unexpected response:", response);
        }

        this.name = "";
        this.email = "";
        this.password = "";

        this.$router.push("/dashboard");
      } catch (error) {
        if (error.response && error.response.data) {
          console.error("Error registering admin", error.response.data);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    },
  },
};
</script>
