<template>
  <div
    class="Login bg min-h-screen w-full flex justify-center items-center md:block absolute"
  >
    <!-- Notification -->
    <div class="hidden md:flex justify-center">
      <transition name="fade">
        <Notification
          v-show="displayNotification"
          :message="noti_message"
          :type="noti_type"
          class="md:fixed z-10 top-14"
        />
      </transition>
    </div>

    <!-- Background division -->
    <div
      class="bg-gradient-to-r from-cyan-500 to-cyan-800 h-96 w-full hidden md:flex"
    ></div>

    <!-- Login card -->
    <div class="block md:flex justify-center items-center">
      <!-- Notification -->
      <div class="flex md:hidden justify-center">
        <transition name="fade">
          <Notification
            v-show="displayNotification"
            :message="noti_message"
            :type="noti_type"
            class="fixed z-10 top-5"
          />
        </transition>
      </div>

      <div
        class="bg px-12 pb-12 pt-10 md:-mt-36 sm:w-1 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 md:shadow-lg rounded-lg"
      >
        <!-- Brand  -->
        <div class="flex justify-center">
          <i class="fab fa-bandcamp fa-4x my-8 md:my-5 text-cyan-700"></i>
        </div>

        <div class="flex justify-center">
          <h1
            class="font-poppins text-xl md:text-2xl md:w-3/4 font-medium mb-10 text-center text-cyan-700"
          >
            Login to
            <span class="font-semibold">Med Dev Manager</span>
            Account
          </h1>
        </div>

        <ValidationObserver ref="form">
          <form @submit.prevent="onLogin(email, password)">
            <ValidationProvider
              mode="lazy"
              name="Email Address"
              rules="required|email"
              v-slot="{ errors }"
            >
              <fieldset class="mb-6">
                <div class="relative">
                  <span
                    class="absolute inset-y-0 left-0 flex items-center pl-2"
                  >
                    <svg
                      class="mx-1"
                      style="width:24px;height:24px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#71717a"
                        d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
                      />
                    </svg>
                  </span>

                  <input
                    v-model="email"
                    type="email"
                    class="block w-full rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 font-poppins font-regular text-sm text-gray-500 py-3 px-11 transition duration-300"
                    name="email"
                    placeholder="Email Address"
                  />
                </div>

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
              name="Password"
              rules="required|min:6"
              v-slot="{ errors }"
            >
              <fieldset class="mb-5">
                <div class="relative">
                  <span
                    class="absolute inset-y-0 left-0 flex items-center pl-2"
                  >
                    <svg
                      class="mx-1"
                      style="width:24px;height:24px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#71717a"
                        d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
                      />
                    </svg>
                  </span>

                  <input
                    v-model="password"
                    type="password"
                    class="block w-full rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 font-poppins font-ragular text-sm text-gray-500 py-3 px-11 transition duration-300"
                    name="password"
                    placeholder="Password"
                  />
                </div>

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

            <button
              type="submit"
              class="block w-full bg-gradient-to-r from-cyan-700 to-cyan-600 hover:to-cyan-700 text-white rounded-lg focus:outline-none font-poppins font-medium py-3 mt-10"
            >
              <i
                v-if="loginState"
                class="fas fa-circle-notch fa-spin fa-1x mr-1"
              ></i>
              Login
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";
import Notification from "../components/Notification.vue";

extend("required", {
  ...required,
  message: "{_field_} is required",
});

extend("email", {
  ...email,
  message: "{_field_} must be a valid email",
});

extend("min", {
  ...min,
  message: "{_field_} must be at least {length} characters",
});

export default (Vue as VueConstructor<
  Vue & {
    $refs: {
      form: InstanceType<typeof ValidationProvider>;
    };
  }
>).extend({
  name: "Login",

  components: {
    ValidationObserver,
    ValidationProvider,
    Notification,
  },

  data() {
    return {
      // Authentication data
      base_url: "http://163.47.115.230:30000/api" as string,

      // Notification
      noti_message: "" as string,
      noti_type: "" as string,

      // User input
      email: "" as string,
      password: "" as string,

      // Component state
      errorEmail: false as boolean,
      errorPassword: false as boolean,
      loginState: false as boolean,
      displayNotification: false as boolean,
    };
  },

  mounted() {
    // Get token from session storage
    let getToken: string = sessionStorage.getItem("access_token") || "";

    // Route to dashboard if token available
    if (getToken !== "") this.$router.replace("/dashboard");
  },

  methods: {
    /* Login */
    onLogin(email: string, password: string) {
      this.$refs.form.validate().then((success) => {
        if (!success) return;

        this.loginState = true;

        let axios = require("axios").default;

        let data = JSON.stringify({
          email: email,
          password: password,
        });

        var config = {
          method: "post",
          url: `${this.base_url}/login`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        interface Response {
          data: {
            user: {
              id: number;
              email: string;
            };
            access_token: string;
            expires_in: string;
          };
        }

        axios(config)
          .then((response: Response) => {
            setTimeout(() => {
              // Check browser support
              if (typeof Storage !== "undefined") {
                // Store token in session storage

                /* User ID */
                sessionStorage.setItem(
                  "user_id",
                  response.data.user.id.toString()
                );

                /* Email */
                sessionStorage.setItem("user_email", response.data.user.email);

                /* Access Token */
                sessionStorage.setItem(
                  "access_token",
                  response.data.access_token
                );

                /* Expired Date */
                sessionStorage.setItem("expires_in", response.data.expires_in);

                // Route to dashboard
                this.$router.replace("/dashboard");
              } else {
                console.log(
                  "Sorry, your browser does not support Web Storage..."
                );
              }
            }, 2000);
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch((error: any) => {
            this.loginState = false;
            this.displayNotification = true;
            this.noti_type = "error_message";

            switch (error.response.status) {
              case 400:
                this.noti_message =
                  "Your client has issued a malformed or illegal request";
                break;

              case 401:
                this.noti_message =
                  "Authentication failed. Please enter valid email and password";
                break;

              case 403:
                this.noti_message =
                  "You don't have permission to access this server";
                break;

              case 408:
                this.noti_message =
                  "Your browser didn't send complete request in time";
                break;

              default:
                this.noti_message = "Error occured. Kindly try again";
                break;
            }

            setTimeout(() => {
              this.displayNotification = false;
            }, 2000);

            setTimeout(() => {
              this.noti_message = "";
              this.noti_type = "";
            }, 2500);
          });
      });
    },
  },
});
</script>

<style scoped>
.bg {
  background-color: #f7f7f7;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

::placeholder {
  color: #71717a;
}
</style>
