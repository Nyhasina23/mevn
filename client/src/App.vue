<template>
  <div id="app">
    <div class="field has-addons">
      <div class="control is-expanded">
        <label for=""></label>
        <input
          class="input"
          type="text"
          v-model="descriptions"
          placeholder="Add item..."
        />
      </div>
      <div class="control">
        <button type="submit" class="button is-info" @click="addItem">
          Add
        </button>
      </div>
    </div>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input
          type="text"
          class="column input"
          v-if="isSelected(item)"
          :key="item_id"
          v-model="editedDescription"
        />
        <p v-else class="column">
          <span class="tag is-primary"> {{ i + 1 }} </span>
          {{ item.description }}
        </p>
        <div class="column is-narrow">
          <span class="icon has-text-primary" @click="isSelected(item) ? unselect() : select(item)">
            <i class="material-icons">{{isSelected(item) ? 'close' : 'edit'}}</i>
          </span>
        </div>
        <div class="column is-narrow">
          <span class="icon has-text-info" @click="isSelected(item) ? updateItem(item , i) : removeItem(item, i)">
            <i class="material-icons">{{isSelected(item) ? 'save' : 'delete'}}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      items: [],
      descriptions: "",
      editedDescription: "",
      selected: {},
    };
  },
  async mounted() {
    const response = await axios.get(
      "http://localhost:3000/api/bucketListItems/"
    );
    this.items = response.data;
  },
  methods: {
    async addItem() {
      console.log("passed");
      const response = await axios.post(
        "http://localhost:3000/api/bucketListItems/",
        {
          description: this.descriptions,
        }
      );
      this.items.push(response.data);
      this.descriptions = "";
    },
    async removeItem(item, i) {
      await axios.delete(
        "http://localhost:3000/api/bucketListItems/" + item._id
      );
      this.items.splice(i, 1);
    },
    select(item) {
      this.selected = item;
      this.editedDescription = item.description;
    },
    isSelected(item) {
      return item._id === this.selected._id
    },
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    } , 
    async updateItem(item , i) {
      const response = await axios.put("http://localhost:3000/api/bucketListItems/" + item._id , {
        description : this.editedDescription
      });

      this.items[i] = response.data
      this.unselect();

    }
  },
};
</script>

<style>
#app {
  font-family: Urbanist;
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>
'