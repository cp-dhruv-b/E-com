<template>
  <div class="flex justify-center items-center h-screen">
    <form
      @submit.prevent="createCategory"
      class="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="categoryName">
          Category Name
        </label>
        <input
          v-model="categoryName"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="categoryName"
          type="text"
          placeholder="Category Name"
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="parentCategory">
          Parent Category (Optional)
        </label>
        <select
          v-model="parentCategory"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-3 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          id="parentCategory"
        >
          <option value="" disabled>Select a parent category (if applicable)</option>
          <option
            v-for="category in filteredCategories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Category
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
      categoryName: "",
      parentCategory: "",
      categories: [],
    };
  },
  async created() {
    await this.fetchCategories();
  },
  computed: {
    filteredCategories() {
      return this.categories.filter((category) => !category.parentId);
    },
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
        console.error("Error fetching categories", error.response.data);
      }
    },
    async createCategory() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3000/admin/category",
          {
            name: this.categoryName,
            parentId: this.parentCategory,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Category created successfully", response.data);
        this.categoryName = "";
        this.parentCategory = "";
      } catch (error) {
        console.error("Error creating category", error.response.data);
      }
    },
  },
};
</script>
