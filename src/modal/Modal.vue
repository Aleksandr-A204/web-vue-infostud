<template>
  <div class="outside-modal">
    <div
      v-click-outside="closeModal"
      class="inside-modal"
    >
      <div class="inside-modal__header">
        <span class="title">Создание</span>
        <span>
          <i
            class="material-icons"
            @click="closeModal"
          >close</i>
        </span>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      console.log("!");
      //this.$emit("closeModal");
    }
  }
};
</script>

<style scoped lang="scss">
.outside-modal{
  background: #59595996;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  .inside-modal{
    padding: 20px;
    position: fixed;
    background: white;
    border: 1px solid black;
    border-radius: 7px;
    box-shadow: 0 0 20px 0 black;
    width: 600px;

    &__header, &__footer {
      margin: 10px 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title{
        font-size: 22px;
        font-weight: bold;
        text-decoration: underline;
      }

      .material-icons:hover{
        cursor: pointer;
      }

      .button{
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
    };

    &__content {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: gray;
        font-size: 19px;
        font-style: italic;
        margin-bottom: 5px;
        margin-top: 10px;
        text-decoration: underline;
        text-align: right;
      };

      .block-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 7px;
        font-size: 14px;

        .form-label{
          margin-right: 2px;
        }

        .form-control {
          height: 15px;
          width: 320px;
          border: 1px solid black;
          border-radius: 5px;
          padding: 1px 1px 1px 3px;
          text-align: left;
        }

        .form-select{
          border: 1px solid black;
          border-radius: 5px;
          cursor: pointer;
          color: #000;
          height: 19.2px;
          width: 326.21px;
        }

        .search-box{
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          position: relative;

          .drop-down-list{
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

          .hidden{
            display: none;
          }
        }
      }
    }
  }
}
</style>