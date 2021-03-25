<template>
  <div class="bg-blueGray-100 min-h-screen w-full absolute">
    <Navbar class="fixed z-10" />

    <div
      v-if="!isLoading"
      class="w-full md:w-5/6 lg:w-4/5 xl:w-3/4 mx-auto px-7 py-3 mt-24 md:mt-28"
    >
      <!-- Title -->
      <div class="flex  justify-center md:justify-between items-end">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-700 font-poppins">
            Add new device
          </h1>
        </div>
      </div>

      <!-- Add Form -->
      <ValidationObserver ref="form">
        <div
          class="bg-white text-gray-700 w-full mt-8 md:mt-8 px-5 py-6 md:py-10 rounded-lg shadow-md mb-5 md:mb-10"
        >
          <div
            class="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 xl:gap-16 px-5 lg:px-8 xl:px-16"
          >
            <ValidationProvider
              mode="lazy"
              name="Brand"
              rules="required"
              v-slot="{ errors }"
            >
              <fieldset class="my-5">
                <div class="mb-3">
                  <label class="font-poppins font-medium">Brand</label>
                </div>

                <input
                  v-model="BrandId"
                  type="text"
                  class="w-full rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 font-poppins font-regular py-3 px-4 transition duration-300 text-sm lg:text-md"
                  name="brand"
                  placeholder="Product Brand..."
                />

                <transition name="fade">
                  <div
                    v-show="errors[0]"
                    class="text-red-500 text-sm font-medium mx-2 mt-1 -mb-5"
                  >
                    <span class="inline-flex">
                      <svg
                        class="mr-1"
                        style="width:19px;height:19px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                        />
                      </svg>
                      <p>{{ errors[0] }}</p>
                    </span>
                  </div>
                </transition>
              </fieldset>
            </ValidationProvider>

            <ValidationProvider
              mode="lazy"
              name="Name"
              rules="required"
              v-slot="{ errors }"
            >
              <fieldset class="my-5">
                <div class="mb-3">
                  <label class="font-poppins font-medium">Name</label>
                </div>

                <input
                  v-model="Name"
                  type="text"
                  class="w-full rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 font-poppins font-regular py-3 px-4 transition duration-300 text-sm lg:text-md"
                  name="name"
                  placeholder="Product Name..."
                />

                <transition name="fade">
                  <div
                    v-show="errors[0]"
                    class="text-red-500 text-sm font-medium mx-2 mt-1 -mb-5"
                  >
                    <span class="inline-flex">
                      <svg
                        class="mr-1"
                        style="width:19px;height:19px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                        />
                      </svg>
                      <p>{{ errors[0] }}</p>
                    </span>
                  </div>
                </transition>
              </fieldset>
            </ValidationProvider>
          </div>

          <div
            class="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 xl:gap-16 px-5 lg:px-8 xl:px-16"
          >
            <fieldset class="my-5">
              <div class="mb-3">
                <label class="font-poppins font-medium">Type</label>
              </div>

              <select
                v-model="TypeId"
                class="w-full rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 font-poppins font-regular py-3 px-4 transition duration-300 text-sm lg:text-md"
                name="typeid"
              >
                <option
                  v-for="deviceType in data_deviceType"
                  :key="deviceType.Id"
                  :value="deviceType.Id"
                  >{{ deviceType.Description }}</option
                >
              </select>
            </fieldset>

            <ValidationProvider
              mode="lazy"
              name="Comment"
              rules="required"
              v-slot="{ errors }"
            >
              <fieldset class="my-5">
                <div class="mb-3">
                  <label class="font-poppins font-medium">Comment</label>
                </div>

                <textarea
                  v-model="Comment"
                  type="text"
                  class="w-full rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 font-poppins font-regular py-3 px-4 transition duration-300 text-sm lg:text-md"
                  name="comment"
                  rows="5"
                  placeholder="Product Comment..."
                />

                <transition name="fade">
                  <div
                    v-show="errors[0]"
                    class="text-red-500 text-sm font-medium mx-2"
                  >
                    <span class="inline-flex">
                      <svg
                        class="mr-1"
                        style="width:19px;height:19px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                        />
                      </svg>
                      <p>{{ errors[0] }}</p>
                    </span>
                  </div>
                </transition>
              </fieldset>
            </ValidationProvider>
          </div>

          <div class="flex justify-end px-5 lg:px-8 xl:px-16 mt-8">
            <button
              @click="addDevice()"
              class="py-3 px-4 bg-gradient-to-r from-cyan-700 to-cyan-600 hover:to-cyan-700 text-white rounded-lg font-poppins focus:outline-none text-sm lg:text-md"
              :disabled="addDeviceState"
            >
              <i
                v-if="addDeviceState"
                class="fas fa-circle-notch fa-spin fa-1x mr-1"
              ></i>
              Add Device
            </button>
          </div>
        </div>
      </ValidationObserver>
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
import Vue, { VueConstructor } from "vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Navbar from "../components/Navbar.vue";

extend("required", {
  ...required,
  message: "{_field_} is required",
});

export default (Vue as VueConstructor<
  Vue & {
    $refs: {
      form: InstanceType<typeof ValidationProvider>;
    };
  }
>).extend({
  name: "NewDevice",

  components: {
    Navbar,
    ValidationObserver,
    ValidationProvider,
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
      BrandId: "" as string,
      Name: "" as string,
      TypeId: 1 as number,
      Comment: "" as string,

      // API data fetched
      data_deviceType: [] as {
        Id: number;
        Description: string;
      }[],

      // Component state
      isLoading: false as boolean,
      addDeviceState: false as boolean,
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
    /* Note typeid field which can be resolved through /devicetype route */
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
        })
        .catch((error: string) => {
          this.isLoading = false;
          console.log(error);
        });
    },

    /* Allow addition of a new device model (/devicemodel route) */
    addDevice() {
      this.$refs.form.validate().then((success) => {
        if (!success) return;

        this.addDeviceState = true;

        let axios = require("axios").default;

        var data = JSON.stringify({
          BrandId: this.BrandId,
          Name: this.Name,
          TypeId: this.TypeId,
          Comment: this.Comment,
        });

        var config = {
          method: "post",
          url: `${this.base_url}/devicemodel`,
          headers: {
            authorization: this.access_token,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then(() => {
            this.$router.replace("/");
            this.addDeviceState = false;
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch((error: any) => {
            console.log(error.response.status);
          });
      });
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
</style>
