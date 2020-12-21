<template>
  <section class="best-selling">
    <template v-if="isBooksSet">
      <div
          v-for="list of bestSellingItems"
          :key="list.listName"
          class="best-selling__category"
      >
        <div class="best-selling__category__books">
          <bookCart
              v-for="book of list.books"
              :book="book"
              :key="book.title"
              :data-catagery="list.listName"
              show-rank
          />
        </div>

      </div>
    </template>
    <skeletonLoader v-if="loading"/>

  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import bestSellersModel from '../../models/Books/BestSellersNYT'
  import bookCart from './bookCart'
  import skeletonLoader from './loadingSceleten'

  export default {
    name: "BestSellingBooks",
    components: { bookCart, skeletonLoader },
    data () {
      return {
        popularityList: [],
        apiCallLimit: 1,
        loading: false
      }
    },

    computed: {
      ...mapGetters({
        isBooksSet: 'bestSellersBooks/getIsBooksSet',
        categoriesList: 'bestSellersBooks/getCategoriesList',
        apiOffset: 'bestSellersBooks/getOffset',
        bestSellingItems: 'bestSellersBooks/getBestSellingItems'
      })
    },

    async created () {
      if (!this.isBooksSet) {
        await this.getPopularityList()
        await this.getBestSellersByCategory()
      }
    },

    mounted () {
      this.scroll()
    },

    methods: {
      async loadBooksByCategory (category) {
        const res = await bestSellersModel.getBestSellersByCategory(category)
        console.log(res)
      },
      async getPopularityList () {
        try {
          this.loading = true
          const res = await bestSellersModel.getPopulrList()
          if (res?.data?.results) {
            const booksCategories = res.data.results.map((el) => {
              return {
                listName: el.list_name,
                displayValue: el.display_name
              }
            })
            this.$store.commit('bestSellersBooks/SET_CATEGORIES', booksCategories)
          } else {
            //todo errorhandler
          }
        } catch (e) {
          this.loading = false
        }

      },

      async getBestSellersByCategory () {
        try {
          this.loading = true
          const apiCallItem = []
          for(let i = 0; i < this.apiCallLimit; i++) {
            console.log(this.categoriesList[i + this.apiOffset].listName)
            apiCallItem.push(this.setEachCategory(this.categoriesList[i + this.apiOffset].listName))
          }
          await Promise.allSettled(apiCallItem)
          this.$store.commit('bestSellersBooks/SET_OFFSET', this.apiOffset + this.apiCallLimit)
          this.$store.commit('bestSellersBooks/SET_SETTED', true)
          this.loading = false

        } catch (e) {
          this.handleToMuchRequestError(e)
          console.log(e.response)
        }

      },

      async setEachCategory (category) {
        return new Promise((resolve, reject) => {
          try {
            bestSellersModel.getBestSellersByCategory(category).then((res) => {
              const response = res.data.results
              const bestSellingItem = {}
              bestSellingItem.listName = response.display_name
              bestSellingItem.listId = category
              bestSellingItem.books = response.books
              this.$store.commit('bestSellersBooks/SET_BESTSELING', bestSellingItem)
              resolve()
            }).catch((e) => {
              this.handleToMuchRequestError(e)
              console.log(e)
            })
          } catch (e) {
            this.handleToMuchRequestError(e)
            reject(e)
          }
        })
      },
      scroll () {
        window.onscroll = () => {
          let bottomOfWindow = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2
          if (bottomOfWindow) {
            if (!this.loading && this.apiOffset < this.categoriesList.length) {
              this.getBestSellersByCategory()
            }
          }
        }
      },
      handleToMuchRequestError (e) {
        console.log(e, e.response)
        if (e?.response?.status === 429) {
          setTimeout(async () => {
            if (!this.isBooksSet) {
              await this.getPopularityList()
              await this.getBestSellersByCategory()
            } else {
              this.getBestSellersByCategory()
            }
          }, 20000)
        } else {
          this.loading = false
          this.error = true
        }
      }
    },

  }
</script>

<style lang="scss">
.best-selling {


  &__category {


    &__books {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
      padding-top: 90px;

      .book-cart:first-of-type {
        &:before {
          content: attr(data-catagery);
          position: absolute;
          top: -55px;
          left: 0;
          font-size: 20px;
          font-weight: 700;
          width: max-content;
        }
      }

    }
  }
}
</style>
