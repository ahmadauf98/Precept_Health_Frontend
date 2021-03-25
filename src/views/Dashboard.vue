<template>
  <div class="bg-blueGray-100 min-h-screen w-full absolute">
    <Navbar class="fixed z-30" />

    <!-- Overlay Dialog -->
    <transition name="fade">
      <div
        v-show="isView"
        class="fixed z-20 w-full min-h-screen max-h-screen bg-blueGray-200 bg-opacity-80 flex items-center justify-center"
      >
        <!-- Loading Animation -->
        <div
          v-if="isViewLoading"
          class="w-full md:w-5/6 lg:w-4/5 xl:w-3/4  mx-auto px-7 py-3 min-h-screen flex items-center justify-center text-cyan-700"
        >
          <i class="fab fa-bandcamp fa-4x md:fa-5x mr-2 animate-spin"></i>
        </div>

        <!-- Select Device Data -->
        <div
          v-if="!isViewLoading && !isViewDevice"
          class="absolute z-20 w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 2xl:w-1/4 min-h-1/2 bg-white rounded-lg shadow-lg px-8 md:px-12 py-10 font-poppins"
        >
          <!-- Brand -->
          <div class="block text-center text-cyan-700">
            <i class="fab fa-bandcamp fa-3x"></i>
            <h1 class="text-xl  font-extrabold mt-1.5">
              {{ selectionHeader }}
            </h1>
          </div>

          <!-- Device Selection -->
          <div class="my-5 h-72 overflow-auto">
            <ul v-if="data_modelData.length !== 0">
              <li
                v-for="model in data_modelData"
                :key="model.Id"
                class="flex justify-between items-center py-3 border-b"
              >
                <h1 class="text-gray-700">{{ model.Name }}</h1>
                <button
                  @click="viewModelData(model.Id)"
                  class="py-1 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white focus:outline-none"
                >
                  View
                </button>
              </li>
            </ul>

            <div v-else class="flex h-72 items-center justify-center">
              <h1 class="text-lg text-gray-700">No data available</h1>
            </div>
          </div>

          <!-- Button -->
          <button
            @click="isView = !isView"
            class="py-3 rounded-lg block w-full bg-gradient-to-r from-cyan-700 to-cyan-600 hover:to-cyan-700 text-white focus:outline-none"
          >
            Cancel
          </button>
        </div>

        <transition name="fade">
          <!-- View Device Data -->
          <div
            v-if="!isViewLoading && isViewDevice"
            class="absolute w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 2xl:w-1/4 min-h-1/2 bg-white rounded-lg shadow-lg px-8 md:px-12 py-10 font-poppins"
          >
            <!-- Brand -->
            <div class="block text-center text-cyan-700">
              <i class="fab fa-bandcamp fa-3x"></i>
              <h1 class="text-xl  font-extrabold mt-1.5">
                Med Dev Manager
              </h1>
            </div>

            <!-- Device Model Data -->
            <div
              v-for="model in data_viewModelData"
              :key="model.Id"
              class="my-10 font-regular text-gray-700"
            >
              <div class="flex justify-between">
                <span>Device Id</span>
                <span>{{ model.Id }}</span>
              </div>

              <div class="flex justify-between">
                <span>Status</span>
                <span v-if="!model.status">Not available</span>
                <span v-else>{{ model.status }}</span>
              </div>

              <div class="flex justify-between mb-4">
                <span>Group Id</span>
                <span v-if="!model.GroupId">Not available</span>
                <span v-else>{{ model.GroupId }}</span>
              </div>

              <div class="flex justify-between">
                <span>Brand</span>
                <span v-if="!model.Brand">Not available</span>
                <span v-else>{{ model.Brand }}</span>
              </div>

              <div class="flex justify-between">
                <span>Model</span>
                <span v-if="!model.Model">Not available</span>
                <span v-else>{{ model.Model }}</span>
              </div>

              <div class="flex justify-between">
                <span>Name</span>
                <span v-if="!model.Name">Not available</span>
                <span v-else>{{ model.Name }}</span>
              </div>

              <div class="grid grid-cols-3 gap-4 my-4">
                <h1>Description</h1>
                <h1 class="text-sm italic col-span-2 text-right">
                  <span v-if="!model.Description">"Not available"</span>
                  <span v-else>"{{ model.Description }}"</span>
                </h1>
              </div>

              <div class="flex justify-between font-medium">
                <span>Protocol Order</span>
                <h1 class="text-right">
                  <span v-if="!model.ProtocolOrder">Not available</span>
                  <span>{{ model.ProtocolOrder }}</span>
                </h1>
              </div>
            </div>

            <!-- Button -->
            <button
              @click="onCloseView()"
              class="py-3 rounded-lg block w-full bg-gradient-to-r from-cyan-700 to-cyan-600 hover:to-cyan-700 text-white focus:outline-none"
            >
              Close
            </button>
          </div>
        </transition>
      </div>
    </transition>

    <div
      v-if="!isLoading"
      class="w-full md:w-5/6 lg:w-4/5 xl:w-3/4  mx-auto px-7 py-3 mt-24 md:mt-28"
    >
      <!-- Title & Total -->
      <div class="flex justify-between items-end">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-700 font-poppins">
            Dashboard
          </h1>
        </div>

        <div>
          <h1 class="text-md md:text-lg font-medium text-gray-700 font-poppins">
            Total Devices {{ data_modelType.length }}
          </h1>
        </div>
      </div>

      <!-- Search & Add Button -->
      <div class="block md:inline-flex w-full mt-8 md:mt-5">
        <div class="w-full md:w-3/6 xl:w-2/6 mr-8 relative text-gray-500">
          <span
            @click="getModelType()"
            class="absolute inset-y-0 right-0 flex items-center py-4 px-6  hover:text-cyan-700"
          >
            <i class="fas fa-search fa-md mt-1"></i>
          </span>
          <fieldset class="my-5">
            <input
              v-model="search"
              @input="getOriginModelType()"
              type="text"
              class="w-full rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 font-poppins font-regular py-3 px-6 transition duration-300 text-sm lg:text-md"
              name="search"
              placeholder="Search..."
            />
          </fieldset>
        </div>

        <div class="items-center hidden md:flex">
          <button
            @click="addNewDevice()"
            class="py-3 px-4 bg-gradient-to-r from-cyan-700 to-cyan-600 hover:to-cyan-700 text-white rounded-lg font-poppins focus:outline-none text-sm lg:text-md"
          >
            Add new device
          </button>
        </div>
      </div>

      <!-- Table -->
      <div
        v-if="data_modelType.length !== 0"
        class="w-full overflow-hidden rounded-lg shadow-md mt-8 md:mt-4 mb-5 md:mb-10"
      >
        <div class="w-full max-h-screen overflow-x-auto overflow-y-auto">
          <table class="w-full whitespace-no-wrap table-auto font-poppins">
            <thead>
              <tr class="bg-blueGray-200 text-gray-700 tracking-wide text-left">
                <th class="py-5 px-5 text-center">No</th>
                <th class="py-5 px-4">Brand</th>
                <th class="py-5 px-4">Name</th>
                <th class="py-5 px-4">Comment</th>
                <th class="py-5 px-4">Description</th>
                <th class="py-5 px-5"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(modeltype, index) in data_modelType"
                :key="modeltype.Id"
                class="bg-white border-t border-gray-300 text-gray-700 "
              >
                <td class="py-4 px-5 text-center w-1/6">{{ index + 1 }}</td>
                <td class="py-4 px-4 w-1/6">
                  <span v-if="modeltype.BrandId === null">Not available</span>
                  <span v-else>
                    {{ modeltype.BrandId }}
                  </span>
                </td>
                <td class="py-4 px-4 w-1/6">{{ modeltype.Name }}</td>
                <td class="py-4 px-4 w-1/6">
                  <span v-if="modeltype.Comment === null">Not available</span>
                  <span v-else>
                    {{ modeltype.Comment }}
                  </span>
                </td>
                <td class="py-4 px-4 w-1/6">
                  <span v-if="modeltype.Description === null"
                    >Not available</span
                  >
                  <span v-else>
                    {{ modeltype.Description }}
                  </span>
                </td>
                <td class="py-2.5 px-5 w-1/6">
                  <button
                    @click="selectModelData(modeltype.BrandId, modeltype.Name)"
                    class="py-1.5 px-5 rounded-lg bg-green-500 hover:bg-green-600 text-white focus:outline-none"
                  >
                    Select
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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

    <!-- SM: Add Button -->
    <button
      type="button"
      @click="addNewDevice()"
      class="fixed z-10 bottom-5 right-5 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-800 text-white block md:hidden focus:outline-none"
    >
      <i class="fas fa-plus fa-lg"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import Vue from "vue";
import Navbar from "../components/Navbar.vue";

export default Vue.extend({
  name: "Dashboard",

  components: {
    Navbar,
  },

  data() {
    return {
      // Authentication data
      base_url: "http://163.47.115.230:30000/api" as string,
      user_id: "" as string,
      user_email: "" as string,
      access_token: "" as string,
      expires_in: "" as string,

      // User input
      search: "" as string,

      // API data fetched
      data_modelType: [] as {
        id: number;
        BrandId: string;
        Name: string;
        TypeId: number;
        Comment: string;
        Description: string;
      }[],

      data_deviceType: [] as {
        Id: number;
        Description: string;
      }[],

      data_modelData: [] as {
        Id: number;
        DataType: string;
        Brand: string;
        Model: string;
        Name: string;
        DisplayName: string;
        Description: string;
        Status: string;
        GroupId: string;
        ProtocolOrder: number;
      }[],

      data_viewModelData: [] as {
        Id: number;
        DataType: string;
        Brand: string;
        Model: string;
        Name: string;
        DisplayName: string;
        Description: string;
        Status: string;
        GroupId: string;
        ProtocolOrder: number;
      }[],

      selectionHeader: "" as string,

      // Component state
      isLoading: false as boolean,
      isView: false as boolean,
      isViewLoading: false as boolean,
      isViewDevice: false as boolean,
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
    this.getDeviceType();
  },

  methods: {
    /* User interface to display available medical devices (/modeltype route) */
    getModelType() {
      this.isLoading = true;

      let axios = require("axios").default;

      let data = JSON.stringify({
        user: { id: Number(this.user_id[1]), email: this.user_email },
        access_token: this.access_token,
        expires_in: this.expires_in,
      });

      let config = {
        method: "get",
        url: `${this.base_url}/overview/modeltype`,
        headers: {
          authorization: this.access_token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      interface Response {
        data: [
          {
            id: number;
            BrandId: string;
            Name: string;
            TypeId: number;
            Comment: string;
            Description: string;
          }
        ];
      }

      axios(config)
        .then((response: Response) => {
          if (this.search === "") {
            let dataModelType_origin = response.data;

            // Set null data to description
            dataModelType_origin.forEach((element) => {
              if (element.Description === null) {
                this.data_deviceType.filter((item) => {
                  if (item.Id === element.TypeId) {
                    element.Description = item.Description;
                  }
                });
              }
            });

            this.data_modelType = dataModelType_origin;
          } else {
            let dataModelType_origin = response.data;

            dataModelType_origin.forEach((element) => {
              // Set null data to not available
              if (element.BrandId === null) {
                element.BrandId = "Not available";
              }

              // Set null data to not available
              if (element.Name === null) {
                element.Name = "Not available";
              }

              // Set null data to description
              if (element.Description === null) {
                this.data_deviceType.filter((item) => {
                  if (item.Id === element.TypeId) {
                    element.Description = item.Description;
                  }
                });
              }
            });

            // Filter data for search - brand
            this.data_modelType = dataModelType_origin.filter(
              (word) => word.BrandId.toLowerCase() === this.search.toLowerCase()
            );

            // Filter data for search - name
            if (this.data_modelType.length === 0) {
              this.data_modelType = dataModelType_origin.filter(
                (word) => word.Name.toLowerCase() === this.search.toLowerCase()
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

    getDeviceType() {
      this.isLoading = true;

      let axios = require("axios").default;

      let data = JSON.stringify({
        user: { id: Number(this.user_id[1]), email: this.user_email },
        access_token: this.access_token,
        expires_in: this.expires_in,
      });

      let config = {
        method: "get",
        url: `${this.base_url}/devicetype`,
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
              Id: number;
              Description: string;
            }
          ],
          number
        ];
      }

      axios(config)
        .then((response: Response) => {
          this.data_deviceType = response.data[0];
          this.isLoading = false;
          this.getModelType();
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          this.isLoading = false;
          console.log(error.response.status);
        });
    },

    addNewDevice() {
      this.$router.push("/device/new");
    },

    getOriginModelType() {
      if (this.search === "") this.getModelType();
    },

    /* Selecting a model (from above route) should request the medical device model’s data (/modeldata route) and present this in an overlay dialog */
    selectModelData(brand: string, model: string) {
      this.isView = true;
      this.isViewLoading = true;

      this.selectionHeader = `${brand} ${model}`;

      let axios = require("axios").default;

      let data = JSON.stringify({
        user: { id: Number(this.user_id[1]), email: this.user_email },
        access_token: this.access_token,
        expires_in: this.expires_in,
      });

      let config = {
        method: "get",
        url: `${this.base_url}/overview/modeldata/${brand}/${model}`,
        headers: {
          authorization: this.access_token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      interface Response {
        data: [
          {
            Id: number;
            DataType: string;
            Brand: string;
            Model: string;
            Name: string;
            DisplayName: string;
            Description: string;
            Status: string;
            GroupId: string;
            ProtocolOrder: number;
          }
        ];
      }

      axios(config)
        .then((response: Response) => {
          this.data_modelData = response.data;
          this.isViewLoading = false;
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          this.isViewLoading = false;
          console.log(error.response.status);
        });
    },

    viewModelData(device_id: number) {
      this.isView = true;
      this.isViewLoading = true;

      setTimeout(() => {
        let modelData_origin = this.data_modelData;

        // Filter device - id
        this.data_viewModelData = modelData_origin.filter(
          (device) => device.Id === device_id
        );

        this.isViewLoading = false;
        this.isViewDevice = true;
      }, 500);
    },

    onCloseView() {
      this.isView = false;
      setTimeout(() => {
        this.isViewDevice = false;
      }, 300);
    },
  },
});
</script>

<style scoped>
::placeholder {
  color: #71717a;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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
