<template>
  <div class="sandbox">
    <section class="loading">
      <h2>CLoading (FullScreen)</h2>
      <b-field>
        <button
          class="button is-primary"
          @click="onFullScreenLoadingButtonClicked"
        >
          Toggle Loading
        </button>
      </b-field>
      <c-loading :loading="fullScreenLoading">
        <p>The loading indicator</p>
      </c-loading>
    </section>

    <section class="loading">
      <h2>CLoading (on Component)</h2>
      <b-field>
        <button
          class="button is-primary"
          @click="onComponentLoadingButtonClicked"
        >
          Toggle Loading
        </button>
      </b-field>
      <c-loading
        :loading="componentLoading"
        :full-screen="false"
      >
        <p>The loading indicator</p>
      </c-loading>
    </section>

    <section class="table">
      <h2>Table</h2>
      <c-table
        :column-names="table.columns"
        :table-data="table.data"
      >
        <template #header>
          <th>I Like</th>
          <th>I Love</th>
          <th>I hate</th>
        </template>
        <template v-slot:row="{ row, index }">
          <tr>
            <td>{{ index }}: {{ row.first }}</td>
            <td>{{ row.second }}</td>
            <td>{{ row.last }}</td>
          </tr>
        </template>
      </c-table>
    </section>

    <section class="collection-list">
      <h2>List</h2>
      <c-list
        v-slot="slotProps"
        :collection="listCollection"
      >
        <c-list-cell>
          <template v-slot:icon>
            <b-icon icon="face" />
          </template>
          <template>
            {{ slotProps.item.text }}
          </template>
          <template v-slot:description>
            Doener macht schoener
          </template>
        </c-list-cell>
      </c-list>
    </section>
  </div>
</template>

<script>
import CLoading from './c_loading.vue';
import CTable from './c_table.vue';
import CList from './list_view.vue';
import CListCell from './list_cell.vue';

export default {
  components: {
    CLoading,
    CTable,
    CList,
    CListCell,
  },
  data() {
    return {
      fullScreenLoading: false,
      componentLoading: false,
      table: {
        columns: { first: 'First', second: 'Second', last: 'Last' },
        data: [
          { first: 'Banana', second: 'Apple', last: 'Orange' },
          { first: 'Banana', second: 'Apple', last: 'Orange' },
          { first: 'Banana', second: 'Apple', last: 'Orange' },
          { first: 'Banana', second: 'Apple', last: 'Orange' },
        ],
      },
      listCollection: [{ text: 'doener' }, { text: 'macht' }, { text: 'schoener' }],
    };
  },
  methods: {
    onFullScreenLoadingButtonClicked() {
      this.fullScreenLoading = true;
      window.setTimeout(() => {
        this.fullScreenLoading = false;
      }, 5000);
    },

    onComponentLoadingButtonClicked() {
      this.componentLoading = true;
      window.setTimeout(() => {
        this.componentLoading = false;
      }, 15000);
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 2rem;
  margin-top: 2rem;
}
</style>
