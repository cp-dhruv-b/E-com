<template>
  <div class="flex">
    <SidebarMenu />

    <div class="flex-grow">
      <Header />
      <div class="flex justify-center items-center h-screen">
        <form class="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Product Name
            </label>
            <input
              v-model="name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Product Name"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
              Price
            </label>
            <input
              v-model="price"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Price"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
              Category
            </label>
            <select
              v-model="categoryId"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              required
            >
              <option value="" disabled>Select category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="photo">
              Photo
            </label>
            <input
              v-model="photo"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="photo"
              type="url"
              placeholder="Photo Url"
            />
          </div>

          <div class="flex items-center justify-between">
            <button
              @click.prevent="createProduct"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import axios from "axios";
import SidebarMenu from "./SidebarMenu.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    Header,
    Footer,
    SidebarMenu,
  },
  data() {
    return {
      name: "",
      price: null,
      categoryId: null,
      categories: [],
      photo: null,
    };
  },
  methods: {
    async createProduct() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3000/admin/product",
          {
            name: this.name,
            price: this.price,
            categoryId: this.categoryId,
            photo: this.photo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Product created successfully", response.data);
        this.$router.push("/products");
      } catch (error) {
        console.error("Error creating product", error.response.data);
      }
    },
    onFileChange(event) {
      this.photo = event.target.files[0];
      console.log("Selected file:", this.photo);
    },
  },
  async created() {
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
};
</script>

<style lang="postcss"></style>
