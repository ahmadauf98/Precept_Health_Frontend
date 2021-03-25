<template>
  <nav
    class="bg-gradient-to-r from-cyan-500 to-cyan-800 min-h-16 w-full shadow-md block md:flex justify-center"
  >
    <div
      class="w-full md:w-5/6 lg:w-4/5 xl:w-3/4 flex justify-between px-5 py-3"
    >
      <!-- SM: Menu Button -->
      <ul class="flex align-center md:hidden text-white ">
        <li @click="toggleNav()" class="flex items-center">
          <i v-if="!isNavOpen" class="fas fa-bars fa-md"></i>
          <i v-else class="fas fa-times fa-lg"></i>
        </li>
      </ul>

      <!-- Brand -->
      <div class="flex items-center mt-0.5 text-white">
        <router-link class="flex" to="/">
          <i class="fab fa-bandcamp fa-2x mr-2"></i>
          <h1 class="text-lg font-poppins font-extrabold mt-0.5">
            Med Dev Manager
          </h1>
        </router-link>
      </div>

      <!-- Navigation -->
      <ul class="flex list-none font-poppins font-normal mt-1 ">
        <li
          class="hidden md:flex items-center mr-5 text-white hover:text-gray-200"
        >
          <router-link to="/">Dashboard</router-link>
        </li>

        <li
          class="hidden md:flex items-center mx-5 text-white hover:text-gray-200"
        >
          <router-link to="/users">Users</router-link>
        </li>

        <li class="block relative select-none md:ml-5">
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
          >
            <img
              class="object-cover w-8 h-8 md:w-9 md:h-9 rounded-full pointer-events-none"
              src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              alt="..."
            />
          </button>

          <transition name="fade">
            <div
              v-show="isMenuOpen"
              class="absolute w-72 h-auto shadow-md rounded-lg pt-4 pb-2 space-y-2 right-0 mt-2 bg-white"
            >
              <div class="px-4 pb-2 flex text-gray-700">
                <div class="mr-3">
                  <img
                    class="object-cover w-9 h-9 rounded-full pointer-events-none"
                    src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    alt="..."
                  />
                </div>

                <div v-if="!isLoading">
                  <h1 class="text-sm font-medium">
                    {{ fullname }}
                  </h1>
                  <h1 class="text-xs font-normal">{{ email }}</h1>
                </div>

                <div v-else class="space-y-2 animate-pulse">
                  <div class="h-4 bg-gray-200 text-transparent rounded w-4/6">
                    ahmad auf nasruddin
                  </div>
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>

              <div class="border-b border-gray-300"></div>

              <button
                @click="onLogout()"
                class="w-full py-2  hover:bg-gray-200 text-sm font-medium text-gray-700 focus:outline-none"
              >
                <i
                  v-if="logoutState"
                  class="fas fa-circle-notch fa-spin mr-1"
                ></i>

                <i v-else class="fas fa-sign-out-alt mr-1"></i>
                Logout
              </button>
            </div>
          </transition>
        </li>
      </ul>
    </div>

    <!-- SM: Navigation -->
    <transition name="fade">
      <ul
        v-show="isNavOpen"
        class="block md:hidden list-none font-poppins font-normal py-2 px-5"
      >
        <router-link to="/">
          <li class="block items-center py-3 text-white">
            <i class="fas fa-hospital mr-3"></i>
            Dashboard
          </li>
        </router-link>

        <router-link to="/users">
          <li class="block items-center py-3 text-white">
            <i class="fas fa-user-circle mr-2"></i>
            Users
          </li>
        </router-link>
      </ul>
    </transition>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Sidebar",

  data() {
    return {
      // Authentication data
      base_url: "http://163.47.115.230:30000/api" as string,
      user_id: "" as string,
      user_email: "" as string,
      access_token: "" as string,
      expires_in: "" as string,

      // Component state
      isLoading: false as boolean,
      isNavOpen: false as boolean,
      isMenuOpen: false as boolean,
      logoutState: false as boolean,

      // API data fetched
      fullname: "" as string,
      email: "" as string,
    };
  },

  mounted() {
    // Get user id from session storage
    let getUserID: string = sessionStorage.getItem("user_id") || "";
    this.user_id = getUserID;

    // Get user email from session storage
    let getUserEmail: string = sessionStorage.getItem("user_email") || "";
    this.user_email = getUserEmail;

    // Get access token from session storage
    let getToken: string = sessionStorage.getItem("access_token") || "";
    this.access_token = getToken;

    // Get expired date from session storage
    let getExpires: string = sessionStorage.getItem("expires_in") || "";
    this.expires_in = getExpires;

    this.getUser();
  },

  methods: {
    getUser() {
      this.isLoading = true;

      let axios = require("axios").default;

      let data = JSON.stringify({
        user: { id: Number(this.user_id[1]), email: this.user_email },
        access_token: this.access_token,
        expires_in: this.expires_in,
      });

      let config = {
        method: "get",
        url: `${this.base_url}/users`,
        headers: {
          authorization: this.access_token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      interface Response {
        data: [
          [
            {
              id: number;
              first_name: string;
              last_name: string;
              email: string;
              password: string;
            }
          ],
          number
        ];
      }

      axios(config)
        .then((response: Response) => {
          let dataUser_origin = response.data[0];

          // Filter data for user data
          let data_user = dataUser_origin.filter(
            (word) => word.email.toLowerCase() === this.user_email.toLowerCase()
          );

          this.fullname = `${data_user[0].first_name} ${data_user[0].last_name}`;
          this.email = data_user[0].email;
          this.isLoading = false;
        })
        .catch((error: string) => {
          this.isLoading = false;
          console.log(error);
        });
    },

    onLogout() {
      this.logoutState = true;

      setTimeout(() => {
        // Remove token from session storage
        sessionStorage.clear();

        // Route to login page
        this.$router.replace("/");
        this.logoutState = false;
      }, 1500);
    },

    toggleNav() {
      this.isMenuOpen = false;
      this.isNavOpen = !this.isNavOpen;
    },
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
