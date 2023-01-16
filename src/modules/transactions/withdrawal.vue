<template>
  <div class="form-demo">
    <div style="height: 100vh; background-color: rgba(0,0,0,0.1)">
      <!--Content before waves-->
      <div class="inner-header flex">
        <!--Just the logo.. Don't mind this-->

        <div class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
          <div class="p-d-flex p-jc-center">
            <div class="card">
              <h5 class="p-text-center">Retrait Argent</h5>

              <form @submit.prevent="handleSubmit()" class="p-fluid">
                <div class="p-field">
                 
                    <div  style="text-align:left !important">
                        <label
                      for="accountNumber"
                      class="label-required"
                     
                      :class="{
                        'p-error':
                          validationErrors.accountNumber && submitted,
                      }"
                      >{{ $t("FORM.LABELS.ACCOUNT") }}</label
                    >
                    </div>

                    <Dropdown
                        id="accountNumber"
                        style="width:100%"
                        v-model="selectedFromAccount"
                        :options="accounts"
                        @change="onFromAccountChange()"
                        placeholder="Sélectionner votre compte"
                        optionLabel="text"
                        :filter="true"

                        :class="{
                        'p-invalid':
                          validationErrors.accountNumber && submitted,
                      }"
                        >
                    </Dropdown>

                  
                </div>

                <div class="p-field">
                  <div class="p-float-label">
                    <InputText
                      id="agentNumber"
                      v-on:input="validate()"
                      v-model="data.agentNumber"
                      :class="{
                        'p-invalid':
                          validationErrors.agentNumber && submitted,
                      }"
                    />
                    <label
                      for="agentNumber"
                      class="label-required"
                      :class="{
                        'p-error':
                          validationErrors.agentNumber && submitted,
                      }"
                      >Numéro de l'agent</label
                    >
                  </div>
                </div>
                
                <div class="p-field">
                  <div class="p-float-label">
                   
                    <InputNumber
                      id="amount"
                      :currency="USD"
                      locale="en-US"
                      :minFractionDigits="2"
                      v-model="data.amount"
                      style="width: 100%"
                      :class="{
                        'p-invalid':
                          validationErrors.amount && submitted,
                      }"
                    />

                    <label
                      for="amount"
                      class="label-required"
                      :class="{ 'p-error': validationErrors.amount && submitted }"
                      >{{ $t("FORM.LABELS.AMOUNT") }}</label
                    >
                  </div>
                </div>

                <div class="p-field">
                  <div class="p-float-label">
                    <InputText
                      id="description"
                      v-on:input="validate()"
                      v-model="data.description"
                      :class="{
                        'p-invalid': validationErrors.description && submitted,
                      }"
                    />
                    <label
                      for="description"
                      class="label-required"
                      :class="{ 'p-error': validationErrors.description && submitted }"
                      >{{ $t("FORM.LABELS.DESCRIPTION") }}</label
                    >
                  </div>
                </div>

                <Button
                  id="submitButton"
                  type="submit"
                  :label="$t('FORM.BUTTONS.SUBMIT')"
                  class="p-mt-2"
                  :disabled="loading"
                />

                <br /><br />
              </form>
            </div>
          </div>
        </div>
      </div>

      <!--Waves end-->
    </div>
    <!--Header ends-->

    <!--Content ends-->
  </div>
</template>

<script>
import TransactionService from "./transactions.service";
import AccountService from "../account/account.service";
import NotifyService from "../../service/Notify.service";



import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      data: { accountNumber: null, amount: null },
      user: {},
      accounts: [],
      connectedUser: {},
      validationErrors: {},
      selectedFromAccount: {},
      submitted: false,
      countries: null,
      showMessage: false,
      loading: false,
    };
  },
  created() {
    const { session } = this.$store.state;
    if (!session || !Object.keys(session).includes("user")) {
      this.$router.push("/sign_in");
    }

    this.connectedUser = this.$store.state.session.user;
    this.getAccounts();
  },
  methods: {
    getAccounts() {
      AccountService.userAccounts(this.connectedUser.id).then((accounts) => {
        this.accounts = accounts.map(account => {
          account.text =  `${account.accountTitle} -  ${account.accountNumber} - ${account.currencySymbol}`;
          return account;
        });
      });
    },

    handleSubmit() {
      if(this.loading) return;

      this.submitted = true;
      const isValid = this.validate();
      if (!isValid) {
        NotifyService.danger(this, "", "FORM.ERRORS.INVALID");
        return;
      }
      this.loading = true;
      TransactionService.withdrawal(this.data)
        .then((res) => {
          console.log(res);
          NotifyService.success(this, "", null);
          setTimeout(() => {
            this.$router.push("/activities");
          }, 1000);
        })
        .catch((error) => {
         const errorJson  = error.toJSON();
          const badContent = errorJson.message.indexOf("400") !== -1;
          if(badContent) {
            const _data = error.response.data || {};
            if(_data.message) {
              NotifyService.danger(this, "",  _data.message);
            }else {
              NotifyService.danger(this, "", null);
            }
          }else {
          NotifyService.danger(this, "", null);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    validate() {
      if (!this.submitted) return;
      const fields = ['accountNumber', 'agentNumber', 'description', 'amount'];
      fields.forEach(f => {
        if (this.data[f]) {
        delete this.validationErrors[f];
      } else {
        this.validationErrors[f] = true;
      }
      });

      if(this.data.amount < 0) {
        this.validationErrors.amount = true;
      }
    
      return Object.keys(this.validationErrors).length === 0;
    },
    onFromAccountChange() {
        this.data.accountNumber = this.selectedFromAccount.accountNumber;
        console.log(this.data.accountNumber);
    },
   
    resetForm() {
      this.user = {
        name: null,
        password: null,
      };

      this.submitted = false;
    },
  },
});
</script>


<style lang="css" scoped>
@import "../../assets/styles/wave.css";

.form-demo .card {
  background: #fff;
  position: relative;
  z-index: 1000;
  color: black;
  min-width: 450px;
  padding: 15px;
  box-shadow: 0px 1px 50px rgba(46, 45, 45, 0.18);
  margin-top: 30px;
}

.form-demo .card a {
  text-decoration: none !important;
}

.form-demo form {
  margin-top: 0rem;
  padding: 5px;
  padding-top: 10px;
  padding-bottom: 0px;
}

.form-demo .p-field {
  margin-bottom: 1.5rem;
}

.iconProfil {
  box-shadow: 0px -1px 10px rgba(116, 116, 117, 0.2);
  border-radius: 50%;
  padding: 30px;
}

@media screen and (max-width: 960px) {
  .card {
    width: 80%;
  }
}
</style>