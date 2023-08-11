<template>
  <table class="plato-table">
    <thead class="thead">
      <tr>
        <th
          v-for="(column, index) in columns"
          :key="`table-head-${index}`"
          :align="column.align"
        >
          <div
            v-if="column.sort"
            class="table-head"
            @click="$emit('columnClick', column)"
          >
            <span class="table-head-label">
              {{ column.label }}
            </span>
            <div class="table-head-icon">
              <div v-if="column.sort === 'Desc'">
                <Icon icon="mdi:sort-descending" />
              </div>
              <div v-if="column.sort === 'Asc'">
                <Icon icon="mdi:sort-ascending" />
              </div>
            </div>
          </div>
          <div
            v-else
            class="table-head-sort-off"
          >
            {{ column.label }}
          </div>
        </th>
      </tr>
    </thead>

    <tbody class="tbody">
      <tr
        v-for="(element, index) in elements"
        :key="`table-body-${index}`"
      >
        <td
          v-for="(column, secondIndex) in columns"
          :key="secondIndex"
          :align="column.align"
        >
          <slot
            :name="column.property"
            :element="element"
          >
            {{ getProperty(element, column.property) }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import _ from "lodash";
import { Icon } from "@iconify/vue2";

export default {
  components: {
    Icon
  },

  props: {
    columns: {
      type: Array,
      required: true
    },
    elements: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    getProperty(element, property) {
      return _.get(element, property);
    }
  }
};
</script>

<style scoped lang="scss">
.table-head-sort-off{
    cursor: default;
}

.table-head {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  gap: 5px;

  &-label {
    text-align: center;
    width: 100%;
  }
}

.plato-table[hoverable] {
  tbody > :not(.group-row):not(.plato-card__body_no-content_table) {
    &:hover {
      background-color: #f3f9ff;
    }

    &[checked]:not([active]) {
      background-color: #f5f6f8;
    }

    &[active] {
      background-color: #deebff;
    }
  }
}

.plato-table {
  margin-top: 7px;
  background: #ceeff3;
  border: 15px solid #ceeff3;
  border-collapse: collapse;

  &[sticky-with-header] {
    thead{
      top: 80px;
    }
  }

  .thead {
    position: sticky;
    position: -webkit-sticky;
    top: 0px;
    background-color: white;

    tr {
      box-shadow: inset 0 -1px 0 #dfe1e6
    }

    th {
      vertical-align: middle;
      padding: 6px 3px;
      line-height: 1.2;
      color: #6b778c;

      &[align=right] {
        justify-content: flex-end;
      }
    }
  }
  .title-wrapper {
    position: relative;

    @media screen and (max-width: 768px) {
      position: relative;
      max-height: 35px;
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
    }

  }

  .tbody {
    tr {
      border-bottom: 1px solid #dfe1e6;
      position: relative;
    }

    .group {
      &-header {
        padding: 7px 0 7px 7px;

        &_group {
          display: flex;
          align-items: center;
          font-weight: bold;
          color: #6b778c;
          text-align: left;
        }

        &_collapser {
          padding-right: 5px;
        }

        &_checkbox {
          padding-right: 2px;
          padding-left: 8px
        }

        &_count {
          padding-left: 10px;
        }
      }

      &-footer__count {
        font-weight: bold;
      }
    }
  }

  .tbody {
    td {
      vertical-align: middle;
      padding: 5px 3px;
      font-size: 14px;
      line-height: 1.2;
      color: #172b4d;
      border-right: 1px solid #dfe1e6;

      &[align=right] {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  &__sort-icon {
    margin-bottom: -2px;
    text-align: center;
    font-size: 10px;
    position: absolute;
    top: -9px;
    right: calc(50% - 8px);
    &-desc {
      margin-bottom: -9px;
    }
  }

  &__check {
    padding-left: 7px;
    width: 30px;
  }

  &__checkbox {
    width: 24px;
    height: 24px;
  }

  .group-table:last-child {
    tr:last-child {
      border-bottom: 0;
    }
  }
}
</style>