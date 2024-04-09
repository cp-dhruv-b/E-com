<template>
  <div class="flex">
    <SidebarMenu />

    <div class="flex-grow">
      <Header />

      <div class="container mx-auto px-4 py-6">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold">Welcome, Admin!</h2>
        </div>

        <div class="flex flex-wrap -mx-4">
          <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">View Products</h3>
              <button
                @click="navigateToProducts"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
              >
                <i class="fas fa-eye mr-2"></i> View Products
              </button>
            </div>
          </div>

          <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">View Users</h3>
              <button
                @click="navigateToUsers"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
              >
                <i class="fas fa-eye mr-2"></i> View Users
              </button>
            </div>
          </div>

          <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">View Categories</h3>
              <button
                @click="navigateToCategories"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
              >
                <i class="fas fa-eye mr-2"></i> View Categories
              </button>
            </div>
          </div>

          <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">Add Product</h3>
              <button
                @click="navigateToAddProduct"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
              >
                <i class="fas fa-plus-circle mr-2"></i> Add Product
              </button>
            </div>
          </div>

          <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">Add Category</h3>
              <button
                @click="navigateToAddCategory"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
              >
                <i class="fas fa-plus-circle mr-2"></i> Add Category
              </button>
            </div>
          </div>

          <div class="w-full px-4 mb-4">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold mb-4">Recently Added Products</h3>
              <ul>
                <li v-for="product in recentProducts" :key="product.id">
                  {{ product.name }} - ${{ product.price }}
                </li>
              </ul>
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
      recentProducts: [],
    };
  },
  created() {
    this.fetchRecentProducts();
  },
  methods: {
    async fetchRecentProducts() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/admin/recent/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.recentProducts = response.data;
      } catch (error) {
        console.error("Error fetching recent products:", error);
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
      console.log("Logged out");
    },
    navigateToAddCategory() {
      this.$router.push("/category");
      console.log("Navigate to Add Category");
    },
    navigateToAddProduct() {
      this.$router.push("/product");
      console.log("Navigate to Add Product");
    },
    navigateToCategories() {
      this.$router.push("/categories");
      console.log("Navigate to View Categories");
    },
    navigateToProducts() {
      this.$router.push("/products");
      console.log("Navigate to View Products");
    },
    navigateToUsers() {
      this.$router.push("/users");
      console.log("Navigate to View Users");
    },
  },
};
</script>
