<template>
  <div class="flex">
    <SidebarMenu />

    <div class="flex-grow">
      <Header />
      <div>
        <h1 class="text-2xl font-semibold mb-4">Product List</h1>
        <ul>
          <li v-for="product in products" :key="product.id">
            <div class="flex items-center mb-4">
              <img :src="product.photo" alt="Product Image" class="w-48 h-40 m-4" />
              <div>
                <h2 class="text-lg font-semibold">{{ product.name }}</h2>
                <p class="text-gray-700">Price: ${{ product.price }}</p>
                <p class="text-gray-700">
                  Category: {{ getCategoryName(product.categoryId) }}
                </p>
                <div class="mt-2">
                  <button
                    @click="goToUpdateProduct(product.id)"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
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
import UpdateProductForm from "../components/UpdateProductForm.vue";

export default {
  components: {
    Header,
    Footer,
    SidebarMenu,
    UpdateProductForm,
  },
  data() {
    return {
      products: [],
      categories: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/admin/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
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
    getCategoryName(categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "Unknown";
    },
    async deleteProduct(productId) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/admin/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.products = this.products.filter((product) => product.id !== productId);
        console.log("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    goToUpdateProduct(productId) {
      this.$router.push({ name: "UpdateProduct", params: { productId } });
    },
  },
};
</script>
