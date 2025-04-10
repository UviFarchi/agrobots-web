<script>
                  import Socials from './subcomponents/Socials.vue';

                  export default {
                    name: 'ActionColumns',
                    components: { Socials },
                    props: {
                      columns: {
                        type: Array,
                        required: true
                      },
                      general: {
                        type: Object,
                        default: () => ({
                          slideTitle: '',
                          slideTitleColor: '',
                          slideIntro: '',
                          slideIntroColor: ''
                        })
                      },
                      currentSlideIndex: {
                        type: Number,
                        default: 0
                      }
                    },
                    data() {
                      return {
                        activeSocialsColumn: null
                      }
                    },
                    methods: {
                      toggleSocials(index) {
                        this.activeSocialsColumn = this.activeSocialsColumn === index ? null : index;
                      },
                      contactButtonClicked() {
                        // Directly call toggleContact on the root (App.vue)
                        this.$root.toggleContact();
                      }
                    }
                  };
                  </script>

                  <template>
                    <div class="slide-wrapper">
                      <h1 class="slide-title" :style="{ color: general.slideTitleColor }">
                        {{ general.slideTitle }}
                      </h1>
                      <p class="slide-intro" :style="{ color: general.slideIntroColor }">
                        {{ general.slideIntro }}
                      </p>
                      <div class="columnsContainer">
                        <div
                          class="actionColumns"
                          v-for="(column, index) in columns"
                          :key="column.columnTitle"
                          :style="{
                            backgroundColor: column.columnsBgColor,
                            color: column.textColor,
                            borderColor: column.borderColor,
                            borderStyle: 'solid',
                            borderWidth: column.borderWidth ? column.borderWidth + 'px' : '1px'
                          }"
                        >
                          <div class="columnIcon">{{column.columnIcon}}</div>
                          <h2 class="columnTitle">{{ column.columnTitle }}</h2>
                          <p class="columnText">{{ column.columnText }}</p>

                          <!-- Render Socials only on the active column -->
                          <socials v-if="activeSocialsColumn === index"></socials>

                          <a
                            v-if="column.buttonLink === 'share'"
                            href="javascript:;"
                            class="buttonLink"
                            :style="{
                              backgroundColor: column.buttonBgColor,
                              color: column.buttonTextColor,
                              borderColor: column.buttonBorderColor,
                              borderStyle: 'solid'
                            }"
                            @click="toggleSocials(index)"
                          >
                            {{ column.buttonText }}
                          </a>

                          <a
                            v-else-if="column.buttonLink === 'contact'"
                            href="javascript:;"
                            class="buttonLink"
                            :style="{
                              backgroundColor: column.buttonBgColor,
                              color: column.buttonTextColor,
                              borderColor: column.buttonBorderColor,
                              borderStyle: 'solid'
                            }"
                            @click="contactButtonClicked"
                          >
                            {{ column.buttonText }}
                          </a>

                          <a
                            v-else
                            :href="column.buttonLink"
                            class="buttonLink"
                            target="_blank"
                            :style="{
                              backgroundColor: column.buttonBgColor,
                              color: column.buttonTextColor,
                              borderColor: column.buttonBorderColor,
                              borderStyle: 'solid'
                            }"
                          >
                            {{ column.buttonText }}
                          </a>
                        </div>
                      </div>
                    </div>
                  </template>

                  <style scoped>
                  .columnsContainer {
                    display: flex;
                    min-height: 60vh;
                  }

                  .actionColumns {
                    margin: 1rem;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    position: relative;
                    border-radius: 20px;
                  }

                  .columnTitle {
                    text-align: center;
                    margin: 1.2rem;
                    justify-self: start;
                  }

                  .columnText {
                    margin: 1rem;
                    justify-self: start;
                  }

                  .buttonLink {
                    width: 50%;
                    height: 50px;
                    margin-top: auto;
                    margin-bottom: 10px;
                    align-self: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 5px;
                    text-decoration: none;
                    font-weight: bold;
                  }

                  .slide-title{
                    text-align: center;
                    margin-top: 1.2rem;
                  }.slide-intro{
                    text-align: center;
                    margin: 1.2rem;
                  }

                  .columnIcon {
                    text-align: center;
                    margin: 1.2rem;
                    font-size: 4rem;
                  }
                  </style>