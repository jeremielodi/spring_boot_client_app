<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Revenue</span>
            <div class="text-900 font-medium text-xl">
              USD <span class="text-primary">{{ revenue.USD }}</span
              >, CDF <span class="text-primary">{{ revenue.CDF }}</span>
            </div>
          </div>
          <div
            class="
              flex
              align-items-center
              justify-content-center
              bg-orange-100
              border-round
            "
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-map-marker text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium"></span>
        <span class="text-500"></span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Membres</span>
            <div class="text-900 font-medium text-xl">
              {{ customerNumber }}
            </div>
          </div>
          <div
            class="
              flex
              align-items-center
              justify-content-center
              bg-cyan-100
              border-round
            "
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-inbox text-cyan-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium"></span>
        <span class="text-500"></span>
      </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Transactions</span>
            <div class="text-900 font-medium text-xl">
              {{ transactionNumber }}
            </div>
          </div>
          <div
            class="
              flex
              align-items-center
              justify-content-center
              bg-blue-100
              border-round
            "
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium"> </span>
        <span class="text-500"></span>
      </div>
    </div>
    <div class="col-12 xl:col-12">
      <div class="card">
        <h5>Revenue par type de paiement</h5>
        <div v-html="revenueByPaymentMethod"></div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { defineComponent } from "vue";

import CurrencyService from "../service/currencyService";

export default defineComponent({
  data() {
    return {
      products: null,
      lineData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Revenue",
            data: [0, 0, 0, 0, 0, 0, 0],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
          },
          {
            label: "Sales",
            data: [0, 0, 0, 0, 0, 0, 0],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
          },
        ],
      },
      items: [
        { label: "Add New", icon: "pi pi-fw pi-plus" },
        { label: "Remove", icon: "pi pi-fw pi-minus" },
      ],
      revenue: { USD: 0, CDF: 0 },
      revenueByPaymentMethod: "",
      transactionNumber: 0,
      customerNumber: 0,
      thisWeekLeterNumber: 0,
      lastWeekLeterNumber: 0,
      cardSellTendance: 0,
      activationTendance: 0,
      rechargeTendance: 0,
    };
  },
  created() {

  },
  methods: {
    pourcentage(total, part) {
      var t = 100 * (part / (total || 1));
      return t.toFixed(2);
    },
    formatCurrency(value, id) {
      return CurrencyService.format(value, id);
    }
  },
});
</script>

<style scoped>
.table {
  width: 100%;
  background: var(--main-table-color);

  margin-top: 1px;
}

.table th,
.table td {
  background: #fff;
  vertical-align: top;
}
</style>