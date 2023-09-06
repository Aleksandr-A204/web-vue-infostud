<template>
  <div class="outside-modal">
    <div
      v-click-outside="() => $emit('close')"
      class="inside-modal"
    >
      <slot name="header">
        <div class="inside-modal__header">
          <span class="title">{{ title }}</span>
          <Icon
            icon="xmark"
            size="xl"
            @click="$emit('close')"
          />
        </div>
      </slot>

      <slot name="main">
        <div class="inside-modal__content">
          <slot />
        </div>
      </slot>

      <slot name="footer">
        <div class="inside-modal__footer">
          <CustomButton @click="$emit('close')">
            Отмена
          </CustomButton>
          <CustomButton @click="$emit('saveData')">
            Сохранить
          </CustomButton>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
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
    };

    &__content {
      padding: 25px 75px;
    }
  }
}
</style>
