<template>
    <v-content>
      <v-container fluid fill-height>
        <v-row class="centered">
            <v-card
              class="elevation-12 centered"
              style="padding-bottom: 10px; width: max-content"
            >
              <v-toolbar>
                <v-toolbar-title
                  class="medium-font secondfont-bold bigfont centered"
                  >Sign up</v-toolbar-title
                >
              </v-toolbar>
              <v-stepper v-model="step_header">
                <v-stepper-header>
                  <v-stepper-item
                    title="What's your email?"
                    :complete="step > 1"
                    value="1"
                  ></v-stepper-item>

                  <v-divider></v-divider>

                  <v-stepper-item
                    title="Set your personal data"
                    :complete="step > 2"
                    value="2"
                  ></v-stepper-item>

                  <v-divider></v-divider>

                  <v-stepper-item
                    title="Choose your user data"
                    :complete="step > 3"
                    value="3"
                  ></v-stepper-item>

                  <v-divider></v-divider>

                  <v-stepper-item
                    title="Complete registration"
                    :complete="step >= 4"
                    value="4"
                  ></v-stepper-item>
                </v-stepper-header>
              </v-stepper>
              <br />
              <v-stepper-items>
                <v-stepper-content step="1" v-if="step === 1">
                  <v-card-text>
                    <div class="success-message"></div>
                    <v-form @submit.prevent="verifyEmailAndProceed">
                      <v-text-field
                        class="secondfont"
                        id="email"
                        name="email"
                        label="EMAIL"
                        ref="emailInput"
                        v-model="email"
                        :rules="emailRules"
                        @input="resetEmailRules()"
                        required
                      >
                      </v-text-field>
                      <div>
                        <v-card-actions class="centered">
                          <v-btn
                            class="enter-button centered"
                            type="submit"
                            :disabled="loading"
                            >NEXT</v-btn
                          >
                        </v-card-actions>
                        <br />
                        <div class="secondfont">
                          <p class="secondfont">
                            Already Have an Account?
                            <router-link
                              class="light-blue-colors"
                              to="/login"
                              style="color: inherit; text-decoration: none"
                              >Log in</router-link
                            >
                          </p>
                        </div>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-stepper-content>
                <v-stepper-content step="2" v-if="step === 2">
                  <v-card-text>
                    <v-form @submit.prevent="verifyNameAndProceed">
                      <v-text-field
                        class="secondfont"
                        v-model="name"
                        name="name"
                        label="FIRST NAME"
                        type="text"
                        :rules="textRules"
                        ref="nameInput"
                        required
                      ></v-text-field>
                      <v-text-field
                        class="secondfont"
                        v-model="surname"
                        id="surname"
                        name="surname"
                        label="LAST NAME"
                        type="tesxt"
                        :rules="textRules"
                        ref="surnameInput"
                        required
                      ></v-text-field>
                      <div>
                        <v-card-actions class="centered">
                          <v-btn class="enter-button centered" @click="setStep(1)"
                            >BACK</v-btn
                          >
                          <v-btn
                            class="enter-button centered"
                            type="submit"
                            :disabled="loading"
                            >NEXT</v-btn
                          >
                        </v-card-actions>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-stepper-content>
                <v-stepper-content step="3" v-if="step === 3">
                  <v-card-text>
                    <v-form @submit.prevent="verifyUserDataAndProceed">
                      <v-text-field
                        class="secondfont"
                        v-model="username"
                        name="username"
                        label="USERNAME"
                        type="text"
                        ref="usernameInput"
                        :rules="textRules"
                        required
                        @input="resetUsernameRules()"
                      ></v-text-field>
                      <v-text-field
                        class="secondfont"
                        v-model="password"
                        id="password"
                        name="password"
                        label="PASSWORD"
                        ref="passwordInput"
                        :append-icon="passwordVisible ? '$eyeOff' : '$eye'"
                        :type="passwordVisible ? 'text' : 'password'"
                        :rules="passwordRules"
                        @click:append="togglePasswordVisibility()"
                        required
                      ></v-text-field>
                      <v-text-field
                        class="secondfont"
                        v-model="repeatPassword"
                        id="passwordRepeated"
                        name="passwordRepeated"
                        label="REPEAT PASSWORD"
                        ref="repeatPasswordInput"
                        :append-icon="
                          repeatPasswordVisible ? '$eyeOff' : '$eye'
                        "
                        :type="repeatPasswordVisible ? 'text' : 'password'"
                        :rules="repeatPasswordRules"
                        @click:append="toggleRepeatPasswordVisibility()"
                        required
                      ></v-text-field>
                      <v-card-actions class="centered">
                        <v-btn class="enter-button centered" @click="setStep(2)"
                          >BACK</v-btn
                        >
                        <v-btn
                          class="enter-button centered"
                          type="submit"
                          >REGISTER</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-stepper-content>
                <v-stepper-content step="4" v-if="step === 4">
                  <v-card-text>
                    <div>
                      <div class="success-message"></div>
                      <h3 class="secondfont-bold">Registration Successful!</h3>
                      <p class="secondfont">
                        Welcome to Robot Escape!. You can now start using your
                        account.
                      </p>
                    </div>
                    <v-card-actions class="centered">
                      <v-btn class="enter-button centered" to="/login">Go Home</v-btn>
                    </v-card-actions>
                  </v-card-text>
                </v-stepper-content>
              </v-stepper-items>
            </v-card>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import { useAppStore } from "../stores/app";
import {
  registerUser,
  isEmailAvailable,
  isUsernameAvailable,
} from "../communicationsManager";
export default {
  name: "RegisterForm",
  setup() {
    const appStore = useAppStore();
    return {
      appStore,
    };
  },
  data() {
    return {
      step_header: 0,
      step: 1,
      name: "",
      surname: "",
      username: "",
      password: "",
      repeatPassword: "",
      passwordVisible: false,
      repeatPasswordVisible: false,
      email: "",
      loading: false,
      emailAvailable: true,
      textRules: [(v) => !!v || "This field is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
        (v) => /[a-z]/.test(v) || "Password must contain a lowercase letter",
        (v) => /[A-Z]/.test(v) || "Password must contain an uppercase letter",
        (v) => /[0-9]/.test(v) || "Password must contain a number",
      ],
      repeatPasswordRules: [
        (v) => !!v || "Please confirm your password",
        (v) => v === this.password || "Passwords do not match",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /.+@.+\..+/.test(v) || "E-mail must be valid  Ex: juan@gmail.com",
      ],
    };
  },
  methods: {
    resetEmailRules() {
      this.emailRules = [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid Ex: juan@gmail.com",
      ];
    },
    resetUsernameRules() {
      this.textRules = [(v) => !!v || "This field is required"];
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    toggleRepeatPasswordVisibility() {
      this.repeatPasswordVisible = !this.repeatPasswordVisible;
    },
    setStep(newStep) {
      if (!this.loading) {
        this.step_header = newStep - 1;
        this.step = newStep;
      }
    },
    verifyUserDataAndProceed() {
      console.log("Verifying user data");
      if (!this.username || !this.password) {
        this.$refs.usernameInput.validate();
        this.$refs.passwordInput.validate();
        return;
      }
      console.log("Is it available?");
      this.loading = true;
      isUsernameAvailable(this.username)
        .then((isAvailable) => {
          if (!isAvailable) {
            this.loading = false;
            this.textRules.push(
              () =>
                "This username is already in use. Please choose another username."
            );
            this.$refs.usernameInput.validate();
          } else {
            // If username is available, proceed with registration
            this.register().then(() => {
              this.loading = false;
              console.log("Register done");
              this.setStep(4);
              console.log("Step Setted: " + this.step);
            });
          }
        })
        .catch((error) => {
          this.loading = false;
          console.error("Error checking username availability:", error);
        });
    },
    verifyEmailAndProceed() {
      console.log("Verifying email");
      if (!this.email) {
        this.$refs.emailInput.validate();
        return;
      }
      this.loading = true;
      isEmailAvailable(this.email)
        .then((isAvailable) => {
          this.loading = false;
          if (isAvailable) {
            this.setStep(2);
          } else {
            this.emailAvailable = false;
            this.emailRules.push(
              () => "This email is already in use. Please choose another email."
            );
            this.$refs.emailInput.validate();
          }
        })
        .catch((error) => {
          this.loading = false;
          console.error("Error checking email availability:", error);
        });
    },
    verifyNameAndProceed() {
      if (!this.name || !this.surname) {
        this.$refs.nameInput.validate();
        this.$refs.surnameInput.validate();
        return;
      }
      this.setStep(3);
    },
    async register() {
      if (
        this.name === "" ||
        this.surname === "" ||
        this.username === "" ||
        this.password === "" ||
        this.email === ""
      ) {
        return;
      }
      const userData = {
        name: this.name,
        surname: this.surname,
        username: this.username,
        password: this.password,
        email: this.email,
      };
      registerUser(userData);
    },
  },
};
</script>
