<template>
  <div class="layout-topbar">
    <router-link to="/home" class="layout-topbar-logo">
      <img
        alt="Logo"
        :src="darkTheme ? '/images/logo.PNG' : '/images/logo.PNG'"
      />
      <span></span>
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      id="menu_toggle"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <ul class="layout-topbar-menu hidden lg:flex">
      <li>
        <button class="p-link layout-topbar-button">
          <SwitchLanguage @language-changed="onLanguageChange()" />
        </button>
      </li>
      <li @click="toggleUserActions">
        <button class="p-link layout-topbar-button">
          <i class="pi pi-user"></i><span>Profile</span>
        </button>
        <Menu
          ref="userActionsMenu"
          style="width: 250px"
          :model="userActions"
          :popup="true"
        />
      </li>
      <li class="link" style="padding-top: 14px" @click="toggleUserActions">
        <span>{{ userName }}</span>
      </li>
    </ul>

    <ChangePasswordModal
      :close="closeModal"
      :display="displayChangePwdModal"
    ></ChangePasswordModal>
  </div>
</template>

<script>
import SwitchLanguage from "./components/SwitchLanguage";
import ChangePasswordModal from "./modules/user/change_pwd.vue";


export default {
  data() {
    return {
      connectedUser: {},
      userName: "",
      displayChangePwdModal: false,
      userActions: [],
    };
  },
  created() {
    this.connectedUser = this.$store.state.session.user || {};
    this.userName = this.connectedUser.displayname;
   
  },
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    toggleUserActions(event) {
      this.$refs.userActionsMenu.toggle(event);
      this.setUserActions();
    },
    onLanguageChange() {
      this.$emit("language-changed");
    },
    setUserActions() {
      this.userActions = [
        // label: this.connectedUser.name,
        {
          label: this.$t("IHRIS.CHANGE_PASSWORD"),
          icon: "pi pi-pencil",
          command: () => {
            this.displayChangePwdModal = true;
          },
        },
        {
          label: this.$t("FORM.BUTTONS.LOGOUT"),
          icon: "pi pi-sign-out",
          command: () => {
            this.$store.commit("updateSession", {});
            this.$router.push("/sign_in");
          },
        },
      ];
    },
    closeModal() {
      this.displayChangePwdModal = false;
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.theme.startsWith("saga");
    },
  },

  components: {
    SwitchLanguage,
    ChangePasswordModal,
  },
};
</script>