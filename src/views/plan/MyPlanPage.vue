<template>
  <div class="result-container">
    <h1>나만의 계획 세우기</h1>
    <RegionSelector :selectedSido="sido" :selectedGugun="gugun" @update-region="onSearch" />
    <PlanMap :markers="places" :planMarkers="planItems" :areaName="`${sido} ${gugun}`" />
    <div class="row">
      <div class="col-md-8">
        <RecommendedList
          :places="places"
          v-model:selectedAttId="attId"
          @change-att="changeAtt"
          @add-to-plan="addToPlan"
        />
      </div>
      <div class="col-md-4 place-list-scroll">
        <MyPlan :planItems="planItems" @update-plan="updatePlanItems" />
      </div>
    </div>
  </div>
</template>

<script>
import RegionSelector from '@/components/plan/RegionSelector.vue'
import RecommendedList from '@/components/plan/RecommendedList.vue'
import PlanMap from '@/components/plan/PlanMap.vue'
import MyPlan from '@/components/plan/MyPlan.vue'

export default {
  components: { RegionSelector, RecommendedList, PlanMap, MyPlan },
  data() {
    return {
      sido: this.$route.query.sido || '',
      gugun: this.$route.query.gugun || '',
      attId: 0,
      places: history.state.places || [],
      planItems: JSON.parse(localStorage.getItem('planItems')) || [],
      editPlan: JSON.parse(localStorage.getItem('editPlan')),
      isEditMode: !!localStorage.getItem('editPlan'),
    }
  },
  mounted() {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      alert('로그인이 필요한 서비스입니다.')
      this.$router.push('/login')
      return
    }
    if (this.sido && this.gugun) {
      this.fetchPlaces()
    }
    if (this.editPlan) {
      this.planItems = this.editPlan.places || []
    } else {
      this.planItems = JSON.parse(localStorage.getItem('planItems')) || []
    }
  },
  watch: {
    planItems: {
      deep: true,
      handler(newVal) {
        if (this.isEditMode) {
          const edit = JSON.parse(localStorage.getItem('editPlan'))
          edit.places = newVal
          localStorage.setItem('editPlan', JSON.stringify(edit))
        } else {
          localStorage.setItem('planItems', JSON.stringify(newVal))
        }
      },
    },
  },
  methods: {
    addToPlan(place) {
      if (!this.planItems.some((item) => item.no === place.no)) {
        this.planItems.push(place)
        this.updatePlanItems(this.planItems)
      }
    },
    updatePlanItems(newPlan) {
      this.planItems = []
      this.$nextTick(() => {
        this.planItems = [...newPlan]
      })
    },
    changeAtt(attId) {
      this.attId = attId
      this.fetchPlaces()
    },
    onSearch({ sido, gugun }) {
      this.sido = sido
      this.gugun = gugun
      this.fetchPlaces()
    },
    fetchPlaces() {
      fetch('/api/att/attplan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          sido: this.sido,
          gugun: this.gugun,
          att_id: this.attId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.places = data
        })
        .catch((err) => {
          console.error('Failed to fetch places:', err)
        })
    },
  },
}
</script>

<style scoped>
.result-container {
  max-width: 1200px;
  margin: 50px auto;
  margin-top: 10px;
  padding: 20px;
}

h1 {
  padding-bottom: 5%;
  text-align: center;
  font-family: 'GowunDodum-Regular', sans-serif;
}
</style>
