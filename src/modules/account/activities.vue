<template>
  <div class="col-p12 card page-body">
    
    <br />
    <div style="height: calc(76vh)">
      <div class="grid">
        <div class="col-12 lg:col-12 xl:col-12">
          <div class="p-field">
            <Label>{{ $t('FORM.LABELS.ACCOUNT') }}</Label>
            <Dropdown
              id="account"
              style="width:100%"
              v-model="selectedAccount"
              :options="accounts"
              @change="OnAccountChange()"
              optionLabel="text"
              :filter="true"
            >
            </Dropdown>
          </div>
          <br/>

          <div class="p-field">
            <Label>{{ $t('FORM.LABELS.BALANCE') }}</Label>
            <div><b>{{ selectedAccount.balance || 0 }} {{ selectedAccount.currencySymbol }}</b></div>
          </div>
        </div>
      </div>
      <br/>
      <DataTable
        @rowSelect="onRowSelect"
        :value="transactions"
        showGridlines
        stripedRows
        filterDisplay="row"
        v-model:selection="selectedUser"
        v-model:filters="filters"
        :resizableColumns="true"
        :scrollable="true"
        columnResizeMode="fit"
        scrollHeight="flex"
        dataKey="transactionId"
        responsiveLayout="scroll"
      >
        <template #header>
          {{ $t("FORM.INFO.TRANSACTIONS") }}
        </template>
        <Column selectionMode="single" style="max-width: 30px"></Column>

       
        <Column field="date" :header="$t('FORM.LABELS.DATE')"></Column>
        
        <Column field="amount" :header="$t('FORM.LABELS.AMOUNT')">
          <template #body="e">
          <div class="w100 text-right">
            <span><b>{{ e.data.amount }} {{ e.data.currencySymbol }}</b></span>
          </div>
          </template>
        </Column>
        <Column field="transactionType" :header="$t('FORM.LABELS.TRANSACTION_TYPE')"></Column>
        <Column field="accountNumber" :header="$t('FORM.LABELS.ACCOUNT')"></Column>
        
        <Column field="description" :header="$t('FORM.LABELS.DESCRIPTION')"></Column>
        
      </DataTable>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import AccountService from "./account.service";
import TransactionService from '../transactions/transactions.service';
// import AppCache from "../../service/appCache";

export default {
  data() {
    return {
      users: [],
      user: {},
      items: [],
      accounts: [],
      transactions: [],
      selectedUser: null,
      displayCreateModal: false,
      connectedUser: {},
      selectedAccount: {},
      filters: {
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
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
          account.text =  `${account.accountTitle} -  ${account.accountNumber} ${account.currencySymbol}`;
          return account;
        });
        this.selectedAccount = this.accounts[0] || {};
        this.OnAccountChange();
      });
    },
    OnAccountChange() {
      this.getTransactions(this.selectedAccount.accountId);
    },
    getTransactions(accountId) {
      TransactionService.listForUser(accountId).then((transactions) =>{
        this.transactions = transactions.reverse();
      });
    },
    onRowSelect($event) {
      console.log($event.data);
    },
    Add() {
      this.displayCreateModal = true;
      this.user = {};
    },
    closeDialog(result) {
      if (result) {
        this.getUsers();
      }
      this.displayCreateModal = false;
    },

    toggleAction(event) {
      this.$refs.cm.show(event.originalEvent);
      this.items = [
        {
          label: "delete",
          icon: "pi pi-check",
          command: () => {},
        },
      ];
    },
  },
  components: {},
};
</script>
