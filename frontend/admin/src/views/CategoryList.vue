<template>
  <div class="flex">
    <SidebarMenu />

    <div class="flex-grow">
      <Header />
      <div class="max-w-5xl mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8">Category List</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="category in categories"
            :key="category.id"
            class="bg-white shadow-md rounded-md p-6"
          >
            <h2 class="text-xl font-bold mb-4">{{ category.name }}</h2>
            <div class="mt-6 flex justify-end">
              <router-link
                :to="{
                  name: 'UpdateCategory',
                  params: { categoryId: category.id, category: category },
                }"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mr-2 hover:bg-blue-600"
              >
                Update
              </router-link>
              <button
                @click="deleteCategory(category)"
                class="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import SidebarMenu from "../components/SidebarMenu.vue";

export default {
  components: {
    Header,
    Footer,
    SidebarMenu,
  },
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/admin/category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async deleteCategory(category) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/admin/category/${category.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Category deleted:", category.name);

        this.fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error.response.data);
      }
    },
  },
};
</script>

<style></style>
