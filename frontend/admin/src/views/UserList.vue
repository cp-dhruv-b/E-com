<template>
  <div class="flex">
    <SidebarMenu />

    <div class="flex-grow">
      <Header />
      <div class="max-w-5xl mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8">User List</h1>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border rounded-lg shadow-md">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="py-3 px-6 text-left">ID</th>
                <th class="py-3 px-6 text-left">Name</th>
                <th class="py-3 px-6 text-left">Email</th>
                <th class="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              <tr v-for="user in users" :key="user.id">
                <td class="py-3 px-6">{{ user.id }}</td>
                <td class="py-3 px-6">{{ user.username }}</td>
                <td class="py-3 px-6">{{ user.email }}</td>
                <td class="py-3 px-6 text-center">
                  <button
                    @click="deleteUser(user.id)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  </div>
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
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    viewUser(user) {
      console.log("View user:", user);
    },
    editUser(user) {
      console.log("Edit user:", user);
    },
    async deleteUser(userId) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User deleted successfully");
        this.fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error.response.data);
      }
    },
  },
};
</script>

<style></style>
