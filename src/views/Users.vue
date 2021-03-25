<template>
  <div class="bg-blueGray-100 min-h-screen w-full absolute">
    <Navbar class="fixed z-10" />

    <div
      v-if="!isLoading"
      class="w-full md:w-5/6 lg:w-4/5 xl:w-3/4  mx-auto px-7 py-3 mt-24 md:mt-28"
    >
      <!-- Title & Total -->
      <div class="flex justify-between items-end">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-700 font-poppins">
            Users
          </h1>
        </div>

        <div>
          <h1
            v-if="search === ''"
            class="text-md md:text-lg font-medium text-gray-700 font-poppins"
          >
            Total Users {{ total_users }}
          </h1>

          <h1
            v-else
            class="text-md md:text-lg font-medium text-gray-700 font-poppins"
          >
            Total Search {{ data_user.length }}
          </h1>
        </div>
      </div>

      <!-- Search -->
      <div class="block md:inline-flex w-full mt-8 md:mt-5">
        <div class="w-full md:w-3/6 xl:w-2/6 mr-8 relative text-gray-500">
          <span
            @click="getUser()"
            class="absolute inset-y-0 right-0 flex items-center py-4 px-6  hover:text-cyan-700"
          >
            <i class="fas fa-search fa-md mt-1"></i>
          </span>
          <fieldset class="my-5">
            <input
              v-model="search"
              @input="getOriginUser()"
              type="text"
              class="w-full rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 font-poppins font-regular py-3 px-6 transition duration-300 text-sm lg:text-md"
              name="search"
              placeholder="Search..."
            />
          </fieldset>
        </div>
      </div>

      <!-- Table -->
      <div
        v-if="data_user.length !== 0"
        class="w-full overflow-hidden rounded-lg shadow-md mt-8 md:mt-4 mb-5 md:mb-10"
      >
        <div class="w-full max-h-screen overflow-x-auto overflow-y-auto">
          <table class="w-full whitespace-no-wrap table-auto font-poppins">
            <thead>
              <tr
                class="bg-blueGray-200 text-gray-700 tracking-wide text-left whitespace-nowrap"
              >
                <th class="py-5 px-5 text-center">
                  <i
                    @click="onSortTable('sortByDesc=id')"
                    v-show="noAsc"
                    class="fas fa-sort-alpha-down"
                  ></i>
                  <i
                    @click="onSortTable('sortByAsc=id')"
                    v-show="!noAsc"
                    class="fas fa-sort-alpha-down-alt"
                  ></i>
                  No
                </th>
                <th class="py-5 px-4">
                  <i
                    @click="onSortTable('sortByDesc=first_name')"
                    v-show="nameAsc"
                    class="fas fa-sort-alpha-down"
                  ></i>
                  <i
                    @click="onSortTable('sortByAsc=first_name')"
                    v-show="!nameAsc"
                    class="fas fa-sort-alpha-down-alt"
                  ></i>
                  Full Name
                </th>
                <th class="py-5 px-4">
                  <i
                    @click="onSortTable('sortByDesc=email')"
                    v-show="emailAsc"
                    class="fas fa-sort-alpha-down"
                  ></i>
                  <i
                    @click="onSortTable('sortByAsc=email')"
                    v-show="!emailAsc"
                    class="fas fa-sort-alpha-down-alt"
                  ></i>
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in data_user"
                :key="user.id"
                class="bg-white border-t border-gray-300 text-gray-700 "
              >
                <td class="p-4 text-center w-1/5">{{ user.id }}</td>
                <td class="p-4 w-2/5">
                  {{ user.first_name }} {{ user.last_name }}
                </td>

                <td class="p-4 w-2/5">{{ user.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="block md:flex md:justify-between px-10 py-5 text-sm font-semibold tracking-wide text-gray-700 border-t bg-blueGray-200 sm:grid-cols-9"
        >
          <fieldset
            class="flex justify-center items-center whitespace-nowrap mt-1 md:mt-0"
          >
            <label class="mr-2 font-poppins text-sm">Showing Entries:</label>

            <select
              v-model="limit"
              @change="getOriginUser()"
              class="block md:w-full py-2 px-4 rounded-lg text-sm form-select bg-white focus:outline-none font-poppins"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </fieldset>

          <!-- Pagination -->
          <span
            class="flex justify-center mt-4 mb-2 md:mt-1 md:mb-0 sm:mt-auto sm:justify-end font-poppins"
          >
            <nav aria-label="Table navigation">
              <ul class="inline-flex items-center">
                <li v-show="page_range !== 1 && page !== 1">
                  <button
                    @click="onPrevious()"
                    class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none"
                    aria-label="Previous"
                  >
                    <i class="fas fa-chevron-left fa-lg"></i>
                  </button>
                </li>

                <li v-for="index in page_range" :key="index">
                  <button
                    v-if="index === page"
                    disabled
                    class="px-3 py-1 mx-2 rounded-md bg-cyan-700 text-white focus:outline-none"
                  >
                    {{ index }}
                  </button>

                  <button
                    v-else
                    @click="onPagination(index)"
                    class="px-3 py-1 mx-2 rounded-md focus:outline-none"
                  >
                    {{ index }}
                  </button>
                </li>

                <li v-show="page_range !== 1 && page_range !== page">
                  <button
                    @click="onNext()"
                    class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none "
                    aria-label="Next"
                  >
                    <i class="fas fa-chevron-right fa-lg"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>

      <div
        v-else
        class="text-gray-700 w-full min-h-1/2 flex items-center justify-center"
      >
        <div class="text-center">
          <i class="fas fa-dizzy fa-3x mb-2"></i>
          <h1 class="font-poppins font-medium text-2xl">
            No results found
          </h1>
        </div>
      </div>
    </div>

    <!-- Loading Animation -->
    <div
      v-else
      class="w-full md:w-5/6 lg:w-4/5 xl:w-3/4  mx-auto px-7 py-3 min-h-screen flex items-center justify-center text-cyan-700"
    >
      <i class="fab fa-bandcamp fa-4x md:fa-5x mr-2 animate-spin"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import Vue from "vue";
import Navbar from "../components/Navbar.vue";

export default Vue.extend({
  name: "Users",

  components: {
    Navbar,
  },

  data() {
    return {
      // Authentication data
      base_url: "http://163.47.115.230:30000/api" as string,
      limit: 5 as number,
      page: 1 as number,
      page_range: 1 as number,
      sort: "sortByAsc=id" as string,
      user_id: "" as string,
      user_email: "" as string,
      access_token: "" as string,
      expires_in: "" as string,

      // User input
      search: "" as string,

      // API data fetched
      data_user: [] as {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
      }[],
      total_users: 0 as number,

      // Component state
      isLoading: false as boolean,

      // Sorting state
      noAsc: true as boolean,
      nameAsc: true as boolean,
      emailAsc: true as boolean,
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

    // Route to dashboard if token available
    if (getToken === "") this.$router.replace("/");

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
        url: `${this.base_url}/users?limit=${this.limit}&page=${this.page}&${this.sort}`,
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
          this.page_range = Math.ceil(response.data[1] / this.limit);

          this.total_users = response.data[1];

          if (this.search === "") {
            this.data_user = response.data[0];
          } else {
            let dataUser_origin = response.data[0];

            // Filter data for search - first name
            this.data_user = dataUser_origin.filter(
              (word) =>
                word.first_name.toLowerCase() === this.search.toLowerCase()
            );

            // Filter data for search - last name
            if (this.data_user.length === 0) {
              this.data_user = dataUser_origin.filter(
                (word) =>
                  word.last_name.toLowerCase() === this.search.toLowerCase()
              );
            }

            // Filter data for search - full name
            if (this.data_user.length === 0) {
              this.data_user = dataUser_origin.filter((word) => {
                let fullname = `${word.first_name} ${word.last_name}`;
                return fullname.toLowerCase() === this.search.toLowerCase();
              });
            }

            // Filter data for search - email
            if (this.data_user.length === 0) {
              this.data_user = dataUser_origin.filter(
                (word) => word.email.toLowerCase() === this.search.toLowerCase()
              );
            }
          }

          this.isLoading = false;
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          this.isLoading = false;
          console.log(error.response.status);
        });
    },

    getOriginUser() {
      // Set to default
      this.page = 1;
      if (this.search === "") this.getUser();
    },

    onSortTable(input: string) {
      this.sort = input;

      // Set to default
      this.noAsc = true;
      this.nameAsc = true;
      this.emailAsc = true;

      switch (input) {
        case "sortByAsc=id":
          this.noAsc = true;
          break;

        case "sortByDesc=id":
          this.noAsc = false;
          break;

        case "sortByAsc=first_name":
          this.nameAsc = true;
          break;

        case "sortByDesc=first_name":
          this.nameAsc = false;
          break;

        case "sortByAsc=email":
          this.emailAsc = true;
          break;

        case "sortByDesc=email":
          this.emailAsc = false;
          break;
      }

      this.getUser();
    },

    onPrevious() {
      this.page -= 1;
      this.getUser();
    },

    onPagination(input: number) {
      this.page = input;
      this.getUser();
    },

    onNext() {
      this.page += 1;
      this.getUser();
    },
  },
});
</script>

<style scoped>
::placeholder {
  color: #71717a;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #0e7490;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #155e75;
}
</style>
