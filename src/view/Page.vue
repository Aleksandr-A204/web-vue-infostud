<template>
  <div class="page-main">
    <CustomButton
      class="back"
      @click="$router.push('/students')"
    >
      Вернуться к таблице
    </CustomButton>

    <div class="information-page">
      <div class="information-page-header">
        <h2>Информация о студенте</h2>
      </div>

      <hr>

      <div class="information-page-content">
        <div v-if="$route.params.id >= 1 && $route.params.id <= students.length">
          <div class="row">
            <label>Фамилия Имя Отечество:</label><span>{{ student?.fullName }}</span>
          </div>
          <div class="row">
            <label>Город:</label><span>{{ student?.city.city }}</span>
          </div>
          <div class="row">
            <label>Улица:</label><span>{{ student?.street }}</span>
          </div>
          <div class="row">
            <label>Почтовый индекс:</label><span>{{ student?.postindex }}</span>
          </div>
          <div class="row">
            <label>Факультет:</label><span>{{ student?.faculty }}</span>
          </div>
          <div class="row">
            <label>Специальность:</label><span>{{ student?.speciality }}</span>
          </div>
          <div class="row">
            <label>Курс:</label><span>{{ student?.course }}</span>
          </div>
          <div class="row">
            <label>Группа:</label><span>{{ student?.group }}</span>
          </div>
          <div class="row">
            <label>Номер телефона:</label><span>{{ student?.phone }}</span>
          </div>
          <div class="row">
            <label>Электронная почта:</label><span>{{ student?.email }}</span>
          </div>
        </div>
        <div v-else>
          <h3>Данные отсутствуют</h3>
        </div>
      </div>

      <hr>

      <div class="information-page-footer">
        <CustomButton
          icon="chevron-left"
          :disabled="$route.params.id <= 1"
          @click="previousPage()"
        />
        <span>{{ $route.params.id }} / {{ students.length }}</span>
        <CustomButton
          icon="chevron-right"
          :disabled="$route.params.id >= students.length"
          @click="nextPage()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      students: "studentModule/students"
    }),

    student() {
      return this.students[this.$route.params.id - 1];
    }
  },

  methods: {
    previousPage() {
      this.$route.params.id > this.students.length ? this.$router.push(`/students/pages/${this.students.length}`)
        : this.$router.push(`/students/pages/${this.$route.params.id - 1}`);
    },

    nextPage() {
      this.$route.params.id <= 0 ? this.$router.push(`/students/pages/${1}`) : this.$router.push(`/students/pages/${Number(this.$route.params.id) + 1}`);
    }
  }
};
</script>

<style scoped lang="scss">
.page-main{
  display: flex;
  flex-direction: column;

  .back{
    margin-right: auto;
  }
}

.information-page{
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  min-width: 700px;

  &-header{
    margin-left: 10px;
    text-align: left;
  }

  &-content{
    padding-left: 25px;
    text-align: left;
    font-size: 18px;

    .row{
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      margin-top: 25px;

      label {
        width: 205px;
      }
    }
  }

  &-footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 20px 0px;
    padding: 0px 20px;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
