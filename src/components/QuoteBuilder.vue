<script>
import { useI18n } from "vue-i18n";

export default {
  name: "QuoteBuilder",
  setup() {
    const { t, locale, messages } = useI18n();
    return { t, locale, messages };
  },
  data() {
    return {
      steps: [
        "purpose",
        "details",
        "service",
        "kpis",
        "estimate",
        "contact",
        "confirm"
      ],
      currentStep: 0,
      form: {
        useCase: "",
        agricultureCategory: "",
        landSize: null,
        region: { country: "", region: "" },
        landUse: "",
        infrastructure: { water: false, electricity: false, internet: false },
        serviceTier: "",
        selectedKPIs: [],
        additionalNotes: "",
        contact: { name: "", email: "", organization: "", wantsCall: null, phone: "" }
      },
      selectedUnit: "ha",
      errors: {},
      showToast: false,
      toastMessages: [],
      toastTimeout: null,
      serviceTiers: ["essentials", "design_plus", "full_service"],
      availableKpis: [],
      selectedKpis: [],
      customKpis: [],
      customKpiInput: "",
      basePricePerIC: 1200,
      CONTINENT_ORDER: ["EU", "NA", "SA", "AS", "AF", "OC"]
    };
  },
  computed: {
    landAreaUnits() {
      return [
        { value: "ha", label: this.t("steps.details.land_area_units.ha"), toHa: v => v },
        { value: "ac", label: this.t("steps.details.land_area_units.ac"), toHa: v => v * 0.404686 },
        { value: "km2", label: this.t("steps.details.land_area_units.km2"), toHa: v => v * 100 }
      ];
    },
    convertedHa() {
      const val = this.form.landSize || 0;
      const unit = this.landAreaUnits.find(u => u.value === this.selectedUnit);
      return unit ? unit.toHa(val) : val;
    },
    continentList() {
      const dict = this.messages[this.locale];
      return Object.entries(dict)
        .filter(([code, val]) => val && val.countries)
        .map(([contCode, contObj]) => ({
          code: contCode,
          name: contObj.name,
          countries: Object.entries(contObj.countries)
            .map(([cc, cObj]) => ({
              code: cc,
              name: cObj.name
            }))
            .sort((a, b) => a.name.localeCompare(b.name, this.locale))
        }))
        .sort((a, b) => {
          const idxA = this.CONTINENT_ORDER.indexOf(a.code);
          const idxB = this.CONTINENT_ORDER.indexOf(b.code);
          return idxA - idxB;
        });
    },
    regionList() {
      if (!this.form.region.country) return [];
      for (const cont of this.continentList) {
        const match = cont.countries.find(c => c.code === this.form.region.country);
        if (match) {
          const countryObj = this.messages[this.locale][cont.code].countries[this.form.region.country];
          return countryObj.regions || [];
        }
      }
      return [];
    },
    kpiKeys() {
      const dict = this.messages[this.locale]?.steps?.kpis?.kpi_options || this.messages.en.steps.kpis.kpi_options;
      return Object.keys(dict);
    },
    allSelectedKpis() {
      return [...this.selectedKpis, ...this.customKpis];
    },
    estimate() {
      let ic = 1;

      // Service tier
      if (this.form.serviceTier === "design_plus") ic += 0.5;
      if (this.form.serviceTier === "full_service") ic += 1.2;

      // KPIs
      if (this.form.selectedKPIs.length > 1) ic += (this.form.selectedKPIs.length - 1) * 0.3;
      if (this.form.customKpis && this.form.customKpis.length > 0) ic += this.form.customKpis.length * 0.5;

      // Land use
      if (this.form.landUse === "contaminated") ic += 0.7;
      if (this.form.useCase === "brownfield_bioremediation") ic += 0.8;

      // Land area
      const ha = this.convertedHa;
      if (ha < 100) ic += 0.4;     // penalty for small land
      if (ha > 50) ic += 0.3;      // as before
      if (ha > 200) ic -= 0.2;     // small reduction for >200ha

      // Infrastructure
      if (!this.form.infrastructure.electricity) ic += 0.4;
      if (!this.form.infrastructure.water) ic += 0.6;
      if (!this.form.infrastructure.internet) ic += 0.2;

      // Optionally, rough adjustment for location if you want
      // Example: higher IC for countries far from a service hub
      // Could use a helper that maps countries to a "distance penalty"
      if (this.form.region && this.form.region.country) {
        ic += this.getLocationICPenalty(this.form.region.country);
      }

      const basePrice = this.getBasePricePerIC();
      const priceHa = Math.round(basePrice * ic);
      const unitObj = this.landAreaUnits.find(u => u.value === this.selectedUnit);
      const priceUserUnit = unitObj ? Math.round(priceHa / unitObj.toHa(1)) : priceHa;
      return {
        ic: ic.toFixed(2),
        priceHa,
        priceUserUnit
      };
    }
  },
  mounted() {
    // When the form is first shown, replace state so back button knows we're on step 0
    window.history.replaceState({ step: 0 }, "");
    window.addEventListener("popstate", this.onPopState);
  },
  beforeUnmount() {
    window.removeEventListener("popstate", this.onPopState);
  },
  watch: {
    "form.region.country"() {
      this.form.region.region = "";
    },
    kpiKeys: {
      handler(newList) {
        this.availableKpis = newList.filter(k => !this.selectedKpis.includes(k));
      },
      immediate: true
    }
  },
  methods: {
    getLocationICPenalty(countryCode) {
      // Barcelona, Guatemala City, Texas are hubs
      // Spain, France, Portugal: 0, nearby EU (Italy, Germany, NL): 0.1
      // Central America: 0
      // North America: 0.1, South America: 0.3, Africa/Asia/Australia: 0.5
      const eu = ["ES", "PT", "FR", "IT", "NL", "DE", "BE", "CH", "AT"];
      const centralAmerica = ["GT", "HN", "SV", "NI", "CR", "PA", "BZ"];
      const northAmerica = ["US", "MX", "CA"];
      if (eu.includes(countryCode)) return 0;
      if (centralAmerica.includes(countryCode)) return 0;
      if (northAmerica.includes(countryCode)) return 0.1;
      // You can expand these rules as needed.
      return 0.3; // Default penalty for other continents
    },
    getBasePricePerIC() {
      switch (this.form.agricultureCategory) {
        case "cereals": return 900;
        case "oilseeds": return 1000;
        case "orchard": return 1200;
        case "open_veg": return 1300;
        case "greenhouse": return 2000;
        case "mixed": return 1200;
        case "livestock": return 2200;
        default: return 1200;
      }
    },
    openToast(messages) {
      this.toastMessages = messages;
      this.showToast = true;
      if (this.toastTimeout) clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => (this.showToast = false), 5000);
    },
    closeToast() {
      this.showToast = false;
      if (this.toastTimeout) clearTimeout(this.toastTimeout);
    },
    validateStep() {
      Object.keys(this.errors).forEach(k => delete this.errors[k]);
      const messages = [];

      if (this.steps[this.currentStep] === "purpose") {
        if (!this.form.useCase) messages.push(this.t("errors.choose_purpose"));
      } else if (this.steps[this.currentStep] === "details") {
        if (!this.form.landSize || this.form.landSize <= 0) messages.push(this.t("errors.enter_land_size"));
        if (!this.form.region.country) messages.push(this.t("errors.choose_country"));
        if (this.regionList.length && !this.form.region.region) messages.push(this.t("errors.choose_region"));
        if (!this.form.landUse) messages.push(this.t("errors.choose_land_use"));
      } else if (this.steps[this.currentStep] === "service") {
        if (!this.form.serviceTier) messages.push(this.t("errors.choose_service_tier"));
      } else if (this.steps[this.currentStep] === "kpis") {
        if (this.selectedKpis.length + this.customKpis.length < 1)
          messages.push(this.t("errors.choose_at_least_one_kpi"));
      } else if (this.steps[this.currentStep] === "contact") {
        if (!this.form.contact.name || !this.form.contact.name.trim())
          messages.push(this.t("errors.enter_name"));
        if (!this.form.contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.contact.email))
          messages.push(this.t("errors.enter_valid_email"));
        if (this.form.contact.wantsCall !== true && this.form.contact.wantsCall !== false)
          messages.push(this.t("errors.choose_contact_method"));
        if (this.form.contact.wantsCall === true && (!this.form.contact.phone || !this.form.contact.phone.trim()))
          messages.push(this.t("errors.enter_phone"));
      }

      if (messages.length > 0) {
        this.openToast(messages);
        return false;
      }
      return true;
    },
    handleFormInput() {
      if (this.showToast) this.closeToast();
    },
    nextStep() {
      if (this.validateStep()) this.currentStep++;
      window.history.pushState({ step: this.currentStep }, "");
    },
    prevStep() {
      if (this.currentStep > 0) this.currentStep--;

    },
    async submitQuote() {
      if (!this.validateStep()) return;
      try {
        await fetch('/api/receive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'quote', ...this.form })
        });
      } catch (err) {
        console.error(err);
        this.openToast([this.t('contact.error')]);
      }
      this.currentStep = this.steps.length - 1;
    },
    selectWantsCall(val) {
      this.form.contact.wantsCall = val;
    },
    selectKpi(k) {
      this.availableKpis = this.availableKpis.filter(item => item !== k);
      this.selectedKpis.push(k);
    },
    deselectKpi(k) {
      this.selectedKpis = this.selectedKpis.filter(item => item !== k);
      if (!this.availableKpis.includes(k)) {
        this.availableKpis.push(k);
        this.availableKpis.sort((a, b) => this.kpiKeys.indexOf(a) - this.kpiKeys.indexOf(b));
      }
    },
    addCustomKpi() {
      const clean = this.customKpiInput.trim();
      if (clean && !this.customKpis.includes(clean)) {
        this.customKpis.push(clean);
        this.customKpiInput = "";
      }
    },
    removeCustomKpi(k) {
      this.customKpis = this.customKpis.filter(item => item !== k);
    },
    onPopState(event) {
      if (event.state && typeof event.state.step === "number") {
        this.currentStep = event.state.step;
      } else {
        window.removeEventListener("popstate", this.onPopState);
      }
    }
  }
};
</script>

<template>
  <a href="/" class="floating_logo"><img src="/img/single_flower_logo.png" alt="back to home page"/>Back to home page </a>
  <div class="quote-builder">
    <transition name="toast-fade">
      <div v-if="showToast" class="toast" @click="closeToast">
        <span class="toast-title">{{ t('errors.toast_title') }}</span>
        <ul>
          <li v-for="msg in toastMessages" :key="msg">{{ msg }}</li>
        </ul>
        <span class="toast-close">{{ t('close') }}</span>
      </div>
    </transition>
    <div class="form-card" @input="handleFormInput" @focusin="handleFormInput">
      <!-- Step Title -->
      <h2 class="step-title">{{ t('steps.' + steps[currentStep] + '.title') }}</h2>
      <div class="step-content">
        <!-- Step 1: Purpose -->
        <div v-if="steps[currentStep] === 'purpose'" class="card-group">
          <label
              v-for="option in Object.keys(messages[locale].steps.purpose.options)"
              :key="option"
              class="card"
              :class="{ selected: form.useCase === option }"
          >
            <input type="radio" v-model="form.useCase" :value="option" class="visually-hidden"/>
            <span>{{ t('steps.purpose.options.' + option) }}</span>
          </label>

          <div
              v-if="form.useCase === 'agricultural_production'"
              class="subcard-group"
              style="margin-top: 1.2em;"
          >
            <label
                v-for="option in Object.keys(messages[locale].steps.purpose.agriculture_type)"
                :key="option"
                class="subcard"
                :class="{ selected: form.agricultureCategory === option }"
            >
              <input type="radio" v-model="form.agricultureCategory" :value="option" class="visually-hidden"/>
              <span>{{ t('steps.purpose.agriculture_type.' + option) }}</span>
            </label>
          </div>
        </div>


        <!-- Step 2: Details -->
        <div v-if="steps[currentStep] === 'details'" class="details-fields">
          <label class="field-label">
            <span class="question">{{ t('steps.details.land_size') }}:</span>
            <div class="inline-row">
              <input
                  type="number"
                  v-model.number="form.landSize"
                  min="1"
                  step="1"
                  class="input"
              />
              <select v-model="selectedUnit" class="input input-unit">
                <option v-for="u in landAreaUnits" :key="u.value" :value="u.value">
                  {{ u.label }}
                </option>
              </select>
            </div>
          </label>
          <label class="field-label">
            <span class="question">{{ t('steps.details.country') }}:</span>
            <select v-model="form.region.country" class="input">
              <option value="" disabled selected hidden></option>
              <optgroup v-for="cont in continentList" :key="cont.code" :label="cont.name">
                <option v-for="c in cont.countries" :key="c.code" :value="c.code">
                  {{ c.name }}
                </option>
              </optgroup>
            </select>
          </label>
          <label class="field-label" v-if="regionList.length">
            <span class="question">{{ t('steps.details.region') }}:</span>
            <select v-model="form.region.region" class="input">
              <option value="" disabled selected hidden></option>
              <option v-for="r in regionList" :key="r" :value="r">{{ r }}</option>
            </select>
          </label>
          <label class="field-label">
            <span class="question">{{ t('steps.details.land_use') }}:</span>
            <select v-model="form.landUse" class="input">
              <option value="" disabled selected hidden></option>
              <option v-for="key in Object.keys(messages[locale].steps.details.land_use_options)" :key="key"
                      :value="key">
                {{ t('steps.details.land_use_options.' + key) }}
              </option>
            </select>
          </label>
          <span class="question">{{ t('steps.details.available_infra') }}:</span>
          <div class="icon-group">
            <button
                v-for="icon in Object.keys(messages[locale].steps.details.infra)"
                :key="icon"
                type="button"
                class="icon-btn"
                :class="{ active: form.infrastructure[icon] }"
                @click="form.infrastructure[icon] = !form.infrastructure[icon]"
                :aria-label="t('steps.details.infra.' + icon)"
            >
              <span class="icon-svg"
                    v-html="icon === 'water'
                  ? `<svg width='28' height='28' viewBox='0 0 28 28'><path d='M14 3C14 3 6 13.09 6 18C6 22.08 9.58 25 14 25C18.42 25 22 22.08 22 18C22 13.09 14 3 14 3Z' fill='${form.infrastructure.water ? '#00bcd4' : 'none'}' stroke='#00bcd4' stroke-width='2'/></svg>`
                  : icon === 'electricity'
                  ? `<svg width='28' height='28' viewBox='0 0 28 28'><polygon points='13,2 5,16 13,16 11,26 23,10 15,10 17,2' fill='${form.infrastructure.electricity ? '#ffeb3b' : 'none'}' stroke='#ffeb3b' stroke-width='2'/></svg>`
                  : `<svg width='28' height='28' viewBox='0 0 28 28'><path d='M3 13c3.8-3.5 18.2-3.5 22 0' stroke='${form.infrastructure.internet ? '#ffd700' : '#888'}' stroke-width='2' fill='none'/><path d='M6 17c2.8-2.3 13.2-2.3 16 0' stroke='${form.infrastructure.internet ? '#ffd700' : '#888'}' stroke-width='2' fill='none'/><path d='M9 20c1.8-1 7.2-1 9 0' stroke='${form.infrastructure.internet ? '#ffd700' : '#888'}' stroke-width='2' fill='none'/><circle cx='14' cy='23' r='1.1' fill='${form.infrastructure.internet ? '#ffd700' : '#888'}'/></svg>`
                "
              ></span>
              <span>{{ t('steps.details.infra.' + icon) }}</span>
            </button>
          </div>
        </div>

        <!-- Step 3: Service Tier -->
        <div v-if="steps[currentStep] === 'service'" class="card-group">
          <label
              v-for="tier in serviceTiers"
              :key="tier"
              class="card"
              :class="{ selected: form.serviceTier === tier }"
              tabindex="0"
              @click="form.serviceTier = tier"
              @keydown.enter.prevent="form.serviceTier = tier"
              @keydown.space.prevent="form.serviceTier = tier"
          >
            <input
                type="radio"
                v-model="form.serviceTier"
                :value="tier"
                class="visually-hidden"
                tabindex="-1"
            />
            <div class="card-header">
              <span class="card-title">{{ t('steps.service.service_tiers.' + tier + '.label') }}</span>
              <span class="tooltip-icon" tabindex="0">&#9432;</span>
              <span class="tooltip-box">{{ t('steps.service.service_tiers.' + tier + '.ideal') }}</span>
            </div>
            <span class="card-subhead">{{ t('steps.service.service_tiers.' + tier + '.subhead') }}</span>
            <span class="card-desc">{{ t('steps.service.service_tiers.' + tier + '.desc') }}</span>


          </label>
        </div>

        <!-- Step 4: KPIs -->
        <div v-if="steps[currentStep] === 'kpis'" class="kpi-section">
          <!-- Available KPIs and custom input (top) -->
          <div class="pill-group available">
            <label
                v-for="kpi in availableKpis"
                :key="kpi"
                class="pill"
                @click="selectKpi(kpi)"
                tabindex="0"
            >
              {{ t('steps.kpis.kpi_options.' + kpi) }}
            </label>
            <input
                type="text"
                v-model="customKpiInput"
                class="input custom-kpi-input"
                @keyup.enter="addCustomKpi"
                :placeholder="t('steps.kpis.other_priorities_placeholder')"
                style="min-width:180px;max-width:320px;"
            />
            <button v-if="customKpiInput" @click="addCustomKpi" class="btn" style="margin-left:0.5em;">{{
                t('add')
              }}
            </button>
          </div>

          <!-- Selected KPIs (bottom) -->
          <div class="pill-group selected" v-if="selectedKpis.length || customKpis.length"
               style="margin-top:2em; border-top:1px solid var(--primary);padding-top:1em;">
            <span class="selected-title"
                  style="margin-bottom:0.7em; display:block;font-weight:600;">{{ t('steps.kpis.selected_kpis') }}</span>
            <label
                v-for="kpi in selectedKpis"
                :key="kpi"
                class="pill selected"
                @click="deselectKpi(kpi)"
                tabindex="0"
                :title="t('remove')"
                style="cursor:pointer;"
            >
              {{ t('steps.kpis.kpi_options.' + kpi) }}
            </label>
            <label
                v-for="kpi in customKpis"
                :key="kpi"
                class="pill custom selected"
                @click="removeCustomKpi(kpi)"
                tabindex="0"
                :title="t('remove')"
                style="cursor:pointer;"
            >
              {{ kpi }}
            </label>
          </div>
        </div>

        <!-- Step 5: Estimate -->
        <div v-if="steps[currentStep] === 'estimate'" class="estimate-summary">
          <h3>{{ t('steps.estimate.title') }}</h3>
          <table class="estimate-table">
            <tbody>
            <tr>
              <th>{{ t('steps.estimate.purpose') }}</th>
              <td>{{ t('steps.purpose.options.' + form.useCase) }} <span v-if="form.useCase === 'agricultural_production'"> - {{ t('steps.purpose.agriculture_type.' + form.agricultureCategory) }}</span></td>

            </tr>
            <tr>
              <th>{{ t('steps.estimate.land_size') }}</th>
              <td>
                {{ form.landSize }} {{ t('steps.details.land_area_units.' + selectedUnit) }}
                <span v-if="selectedUnit !== 'ha'">({{
                    convertedHa.toFixed(2)
                  }} {{ t('steps.details.land_area_units.ha') }})</span>
              </td>
            </tr>
            <tr>
              <th>{{ t('steps.estimate.location') }}</th>
              <td>
                <template v-if="form.region.country">
                  {{
                    (() => {
                      for (const cont of continentList) {
                        const country = cont.countries.find(c => c.code === form.region.country);
                        if (country) return country.name;
                      }
                      return form.region.country;
                    })()
                  }}
                </template>
                <template v-if="form.region.region">, {{ form.region.region }}</template>
              </td>
            </tr>
            <tr>
              <th>{{ t('steps.estimate.service_tier') }}</th>
              <td>{{ t('steps.service.service_tiers.' + form.serviceTier + '.label') }}</td>
            </tr>
            <tr>
              <th>{{ t('steps.estimate.kpis') }}</th>
              <td>
                <span v-if="allSelectedKpis.length">
                  <span v-for="(k, idx) in allSelectedKpis" :key="k">
                    {{
                      t('steps.kpis.kpi_options.' + k) !== 'steps.kpis.kpi_options.' + k ? t('steps.kpis.kpi_options.' + k) : k
                    }}
                    <span v-if="idx !== allSelectedKpis.length - 1">, </span>
                  </span>
                </span>
                <span v-else>{{ t('none') }}</span>
              </td>
            </tr>
            </tbody>
          </table>

          <div class="estimate-amount">
            <span class="estimate-number">€{{ estimate.priceUserUnit }}</span>
            <span class="estimate-label">{{
                t('steps.estimate.per_unit', {unit: t('steps.details.land_area_units.' + selectedUnit)})
              }}</span>
          </div>
          <p class="estimate-note">
            <em>{{ t('steps.estimate.note') }}</em>
          </p>
        </div>

        <!-- Step 6: Contact -->
        <div v-if="steps[currentStep] === 'contact'" class="contact-fields">
          <label class="field-label">
            {{ t('steps.contact.name') }}:
            <input type="text" v-model="form.contact.name" class="input"/>
          </label>
          <label class="field-label">
            {{ t('steps.contact.email') }}:
            <input type="email" v-model="form.contact.email" class="input"/>
          </label>
          <label class="field-label">
            {{ t('steps.contact.organization') }}:
            <input type="text" v-model="form.contact.organization" class="input"/>
          </label>
          <span class="question">{{ t('steps.contact.schedule_call') }}</span>
          <div class="card-group contact-choice">
            <div
                class="card"
                :class="{ selected: form.contact.wantsCall === true }"
                @click="selectWantsCall(true)"
                tabindex="0"
            >
              {{ t('steps.contact.call_yes') }}
            </div>
            <div
                class="card"
                :class="{ selected: form.contact.wantsCall === false }"
                @click="selectWantsCall(false)"
                tabindex="0"
            >
              {{ t('steps.contact.call_no') }}
            </div>
          </div>
          <label v-if="form.contact.wantsCall === true" class="field-label">
            {{ t('steps.contact.phone') }}:
            <input type="tel" v-model="form.contact.phone" class="input" autocomplete="tel"/>
          </label>
        </div>

        <!-- Step 7: Confirmation -->
        <div v-if="steps[currentStep] === 'confirm'" class="confirmation">
          <h3>{{ t('steps.confirm.thank_you') }}{{ form.contact.name ? `, ${form.contact.name}` : "" }}!</h3>
          <p>{{ t('steps.confirm.confirmation') }}</p>
        </div>
      </div>
      <!-- Navigation Buttons -->
      <div class="button-row" v-if="steps[currentStep] !== 'confirm'">
        <div class="nav-left">
          <button v-if="currentStep > 0" @click="prevStep" class="btn">{{ t('back') }}</button>
        </div>
        <div class="nav-right">
          <button v-if="currentStep < steps.length - 2" @click="nextStep" class="btn">{{ t('next') }}</button>
          <button v-if="currentStep === steps.length - 2" @click="submitQuote" class="btn submit">{{
              t('submit')
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.quote-builder {
  min-height: 100vh;
  width: 100vw;
  background: var(--backgroundDark);
  color: var(--textLight);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  height: 90vh;
  max-height: 96vh;
  overflow-y: auto;
  width: 100%;
  max-width: 540px;
  min-width: 320px;
  margin: auto;
  padding: 2.4rem 2rem;
  background: var(--backgroundDarkTranslucent, rgba(20, 30, 30, 0.96));
  border-radius: 28px;
  box-shadow: 0 8px 44px 0 rgba(0, 0, 0, 0.24);
}

.step-title {
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 1.1em;
  margin-top: 0.2em;
  letter-spacing: -0.02em;
}

.step-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

/* Card Groups (for options, service tiers, etc) */
.card-group {
  display: flex;
  flex-direction: column;
  gap: 1.15em;
  width: 100%;

}

.card, .subcard {
  background: rgba(40, 50, 54, 0.62);
  border: 2px solid var(--primary);
  border-radius: 1.2em;
  padding: 1.12em 1.2em;
  cursor: pointer;
  transition: border 0.19s, background 0.19s;
  margin: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  font-size: 1.09em;
}

.subcard-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1em 2%;
  align-items: flex-start;
}

.subcard {
  width: 48%;
  min-height: 5em;
  margin-bottom: 0.251em;
  box-sizing: border-box;
  height: auto;
  align-self: flex-start;
  display: block;
  align-content: center;
}


.card.selected, .subcard.selected, .pill.selected, .icon-btn.active {
  border-color: var(--accent);
  background: rgba(70, 110, 100, 0.21);
}

.card-header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.09em;
  width: 100%;
  justify-content: space-between;
}

.card-title {
  font-weight: bold;
  font-size: 1.13em;
}

.card-subhead {
  font-size: 1.01em;
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 0.11em;
  display: block;
}

.card-desc {
  font-size: 0.97em;
  color: var(--textLight);
  margin-bottom: 0.14em;
  line-height: 1.4;
}

.tooltip-icon {
  position: absolute;
  top: 0;
  right: -0.85em;
  transform: translateY(-50%);
  font-size: 2em;
  width: 1.7em;
  height: 1.7em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.18s;
}


.tooltip-box {
  position: absolute;
  top: -50%;
  left: 0;
  width: 100%;
  height:inherit;
  z-index: 1000;
  background: black;
  color: #ffe388;
  border-radius: 8px;
  padding: 2.2em 1em 1em 1em;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  white-space: normal;
  visibility: hidden;

}

.tooltip-icon:focus ~ .tooltip-box,
.tooltip-icon:hover ~ .tooltip-box {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}

/* Icon buttons (infra) */
.icon-group {
  display: flex;
  flex-direction: row;
  gap: 1.5em;
  margin: 1.1em 0 0.3em 0;
}

.icon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 88px;
  padding: 0.6em 0.9em 0.3em 0.9em;
  border-radius: 2em;
  background: rgba(40, 50, 54, 0.6);
  border: 2px solid var(--primary);
  font-weight: 500;
  color: var(--primary);
  outline: none;
  user-select: none;
}

.icon-svg {
  margin-bottom: 0.16em;
}

.icon-btn span {
  margin-top: 0.13em;
  font-size: 1em;
  color: var(--primary);
}

/* Field layout and inputs */
.field-label {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.1em;
  margin-top: 1.1em;
  font-size: 1.05em;
  font-weight: 500;
  width: 100%;
}

.input, select, .CountrySelect, .RegionSelect {
  font-size: 1.08em;
  padding: 0.57em 1.08em;
  border-radius: 9px;
  border: 1.5px solid var(--primary);
  background: rgba(34, 38, 38, 0.87);
  color: var(--textLight);
  margin-top: 0.28em;
  outline: none;
  width: 100%;
  max-width: 220px;
  box-sizing: border-box;
}

.input-unit {
  max-width: 180px;
  min-width: 110px;
  font-size: 1em;
  margin-left: 0.8em;
}

.inline-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  margin-bottom: 0.2em;
  width: 100%;
}

.question {
  display: block;
  font-weight: 500;
  margin-bottom: 0.09em;
  margin-top: 0.35em;
}

.pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em 0.5em;
  margin-bottom: 1.1em;
  align-items: flex-start;
  width: 100%;
}

.kpi-section {
  display: flex;
  flex-direction: column;
}

.pill-group.available {
  flex-wrap: wrap;
  gap: 0.5em 0.5em;
  align-items: center;
}

.pill-group.selected {
  flex-wrap: wrap;
  gap: 0.5em 0.5em;
  align-items: center;
  margin-top: 2em;
  border-top: 1px solid var(--primary);
  padding-top: 1em;
}

.selected-title {
  margin-bottom: 0.7em;
  display: block;
  font-weight: 600;
}

.pill {
  display: inline-block;
  background: var(--backgroundDark);
  border: 1.5px solid var(--primary);
  border-radius: 16px;
  padding: 0.52em 1em;
  text-align: center;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.15s;
  min-width: 120px;
}

.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  border: 0;
  padding: 0;
  margin: -1px;
}

.button-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2em;
  width: 100%;
}

.nav-left {
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-start;
}

.nav-right {
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-end;
  gap: 1.2em;
}

.btn {
  padding: 0.7em 2.2em;
  font-size: 1.1rem;
  background: var(--primary);
  color: var(--textDark);
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  min-width: 110px;
}

.btn.submit {
  background: var(--accent);
}

.confirmation {
  background: var(--backgroundDarkTranslucent, rgba(30, 40, 40, 0.98));
  padding: 3rem 1.4rem;
  border-radius: 30px;
  box-shadow: 0 4px 22px rgba(0, 0, 0, 0.11);
  max-width: 480px;
  margin: 3vh auto;
  text-align: center;
}

.estimate-summary {
  margin-bottom: 2em;
  padding: 2.2em 1em 2.6em 1em;
  background: rgba(20, 30, 30, 0.95);
  border-radius: 18px;
}

.estimate-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2em;
}

.estimate-table th,
.estimate-table td {
  padding: 0.45em 0.9em;
  text-align: left;
  vertical-align: top;
}

.estimate-table th {
  font-weight: 600;
  color: var(--primary);
  width: 32%;
  white-space: nowrap;
}

.estimate-table td {
  color: var(--textLight);
}

.estimate-amount {
  font-size: 2.2em;
  font-weight: bold;
  margin: 0.5em 0;
}

.estimate-label {
  font-size: 0.7em;
  color: var(--primary);
  display: block;
}

.estimate-note {
  color: var(--accent);
  font-size: 0.98em;
}
.floating_logo {
  position: absolute;
  top: 18px;
  right: 18px;
  left: unset;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--primary, #12cbc4);
  font-size: 1.08rem;
  font-weight: 500;
  text-decoration: underline;
  z-index: 30;
  background: none;
  border: none;
  outline: none;
  transition: color 0.16s;
}

.floating_logo img {
  width: 30px;
  height: auto;
  display: block;
}

.floating_logo:hover {
  color: var(--accent, #ffe75a);
}



@media (max-width: 700px) {
  .floating_logo {
    top: 7px;
    right: 8px;
    font-size: 0.95rem;
    gap: 6px;
  }
  .floating_logo img {
    width: 22px;
  }
  .step-title {
    font-size: 1.08em;
  }

  .form-card {
    padding: 2rem 2rem;
    max-width: 100vw;
    min-width: 0;
    border-radius: 0;
    height: 100vh;
    max-height: 100vh;
  }

  .card-group, .pill-group, .icon-group {
    gap: 0.35em;
  }

  .btn {
    padding: 0.62em 1.1em;
    font-size: 1em;
    min-width: 80px;
  }

  .inline-row {
    gap: 0.6em;
  }

  .estimate-table th, .estimate-table td {
    padding: 0.38em 0.2em;
    font-size: 0.98em;
  }

 .subcard {
    width: 100%;
  }
}

.toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #20292b;
  color: #ffe388;
  border: 2px solid #ff6474;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.32);
  border-radius: 14px;
  min-width: 320px;
  max-width: 440px;
  z-index: 4000;
  padding: 1.1em 1.5em 1.1em 1.2em;
  font-size: 1.04em;
  cursor: pointer;
  transition: opacity .2s;
}

.toast-title {
  font-weight: 600;
  font-size: 1.1em;
  margin-bottom: 0.4em;
  display: block;
}

.toast-close {
  float: right;
  font-size: 0.95em;
  color: #ff6474;
  cursor: pointer;
  margin-left: 1em;
}

.toast ul {
  margin: 0.2em 0 0.2em 0.5em;
  padding-left: 1em;
}

.toast li {
  margin-bottom: 0.08em;
  line-height: 1.36;
}

.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.22s;
}

.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
}



</style>

