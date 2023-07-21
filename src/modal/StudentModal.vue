<template>
  <div class="changeData_wrapper">
    <div
      v-click-outside="sendModalClose"
      class="v-student"
    >
      <div class="v-student__header">
        <h3>{{ titleModal }}</h3>
        <span>
          <i
            class="material-icons"
            @click="sendModalClose"
          >close</i>
        </span>
      </div>
      <div class="v-student__content">
        <div class="student-component">
          <div class="input-group">
            <label class="form-label">ФИО:</label>
            <input
              v-model="currentObject.fullname"
              type="text"
              class="form-control"
              placeholder="Введите ФИО"
            >
          </div>
          <div class="input-group">
            <label class="form-label">Город:</label>
            <select
              v-model="currentObject.address.city"
              class="form-select"
            >
              <option
                v-for="address in addresses"
                :key="address.id"
              >
                {{ address.City.City }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label class="form-label">Почтовый индекс:</label>
            <select
              v-model="currentObject.address.postindex"
              class="form-select"
            >
              <option
                v-for="address in addresses"
                :key="address.id"
              >
                {{ address.Postindex.PostIndex }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label class="form-label">Улица:</label>
            <select
              v-model="currentObject.address.street"
              class="form-select"
            >
              <option
                v-for="address in addresses"
                :key="address.id"
              >
                {{ address.Street.Street }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label class="form-label">Факультет:</label>
            <select
              v-model="currentObject.curriculum.faculty"
              class="form-select"
            >
              <option
                v-for="curriculum in curriculums"
                :key="curriculum.id"
              >
                {{ curriculum.Faculty.Faculty }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label class="form-label">Специальность:</label>
            <select
              v-model="currentObject.curriculum.speciality"
              class="form-select"
            >
              <option
                v-for="curriculum in curriculums"
                :key="curriculum.id"
              >
                {{ curriculum.Speciality.Speciality }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label class="form-label">Курс:</label>
            <select
              v-model="currentObject.curriculum.course"
              class="form-select"
            >
              <option
                v-for="curriculum in curriculums"
                :key="curriculum.id"
              >
                {{ curriculum.Course.Course }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label class="form-label">Группа:</label>

            <div class="search-box">
              <input
                class="form-control"
                type="text"
                placeholder="Введите группу"
              >
              <table
                class="popur-list hidden"
                @click="chooseItem"
              >
                <tbody>
                  <tr
                    v-for="curriculum in curriculums"
                    :key="curriculum.id"
                  >
                    <td class="rows-box">
                      {{ curriculum.Group.Group }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="input-group">
            <label class="form-label">Номер телефона:</label>
            <input
              v-model="currentObject.contact.phone"
              type="text"
              class="form-control"
              placeholder="Введите телефон"
            >
          </div>
          <div class="input-group">
            <label class="form-label">Эл. почта:</label>
            <input
              v-model="currentObject.contact.email"
              type="text"
              class="form-control"
              placeholder="Введите эл. почту"
            >
          </div>
        </div>
      </div>
      <div class="v-student__footer">
        <button
          class="close_modal"
          @click="sendModalClose"
        >
          Отмена
        </button>
        <button
          class="submit_btn"
          @click="sendRightButton"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//import _ from "lodash";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    titleModal: {
      type: String,
      default: "Студент"
    },

    studentObject: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      currentObject: null
    };
  },

  computed: {
    ...mapGetters({
      // cities: "addressModule/cities",
      // postindexes: "addressModule/postindexes",
      // streets: "addressModule/streets",
      curriculums: "curriculumModule/curriculums",
      groups: "curriculumModule/groups"
      // setWordByCourseList: "curriculumModule/wordByCourseList"
    })
  },

  created() {
    this.currentObject = {
      address: {
        city: this.studentObject?.Address.City,
        postindex: this.studentObject?.Address.PostIndex,
        street: this.studentObject?.Address.Street
      },
      curriculum: {
        faculty: this.studentObject?.Curriculum.Faculty,
        speciality: this.studentObject?.Curriculum.Speciality,
        course: this.studentObject?.Curriculum.Course,
        group: this.studentObject?.Curriculum.Group
      },
      contact: {
        phone: this.studentObject?.Contact.Phone,
        email: this.studentObject?.Contact.Email
      },
      fullname: this.studentObject?.FullName,
      id: this.studentObject?.Id
    };

    this.$store.dispatch("curriculumModule/wordByCourseList", this.currentObject.curriculum.group ?? "");
  },

  async mounted() {
    await this.getAddressData();
    await this.getCurriculumData();


    // this.courses = await _.uniq(_.map(this.curriculums, "Course")).toSorted();
    // this.facultes = await _.uniq(_.map(this.curriculums, "Faculty"));
    // this.specialites = await _.uniq(_.map(this.curriculums, "Speciality"));

    // //this.cites = await _.uniq(_.map(this.addresses, "City"));
    // this.postindexes = await _.uniq(_.map(this.addresses, "PostIndex"));
    // this.streets = await _.uniq(_.map(this.addresses, "Street"));
    console.log(this.addresses);
  },

  methods: {
    ...mapActions({
      getAddressData: "addressModule/getAddressData",
      getCurriculumData: "curriculumModule/curriculumData",
      createStudent: "studentModule/createStudent",
      updateStudent: "studentModule/updateStudent"
    }),

    chooseItem(event) {
      this.$store.dispatch("curriculumModule/wordByCourseList", event.target.innerHTML.trim());
    },

    sendModalClose() {
      this.$emit("closeModal");
    },

    sendRightButton() {
      if (this.currentObject.id) {
        this.updateStudent(this.currentObject);
      }
      else {
        this.createStudent(this.currentObject);
      }
      this.sendModalClose();
    }

    // setWordByCourseList(event) {
    //   this.$store.dispatch("curriculumModule/wordByCourseList", event.target.value.trim());
    // }
  }
};
</script>

<style scoped lang="scss">
.changeData_wrapper{
  background: #59595996;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  .v-student{
    padding: 16px;
    position: fixed;
    background: white;
    border: 1px solid black;
    border-radius: 7px;
    box-shadow: 0 0 17px 0 rgb(161, 161, 161);
    width: 600px;
    z-index: 10;
    &__header, &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h3 {
          text-decoration: underline;
        }
    };
    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
      .input-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 7px;
        font-size: 14px;
        .form-label{
          margin-right: 2px;
        }
        .form-control {
          width: 320px;
          border: 1px solid black;
          border-radius: 5px;
          padding: 1px 1px 1px 3px;
        }
        .form-select{
          width: 326.21px;
          border: 1px solid black;
          border-radius: 5px;
          cursor: pointer;
          color: #000;
        }
        .search-box{
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          position: relative;
          .hidden{
            display: none;
          }
          .popur-list{
            position: absolute;
            top: 100%;
            width: 100%;
            border-collapse: collapse;
            cursor: default;
            background: white;
            border: 1px solid gray;
            .rows-box{
              min-width: 320px;
              font-weight: normal;
              min-height: 1.2em;
              &:hover {
                background: #1915f7;
                color: white;
              }
            }
          }
          &:hover .popur-list{
            display: block;
          }
        }
      }
    }
  }
  i:hover{
    cursor: pointer;
  }
  button{
    background-color: #87CEEB;
    border: 1px;
    border-style: solid;
    border-radius: 7px;
    box-sizing: border-box;
    color: black;
    text-align: center;
    height: 25px;
    margin: 1px;
      &:hover {
      background: #1915f7;
      border: 1px;
      border-style: solid;
      border-color: #000;
      color: white;
    }
  }
}
</style>