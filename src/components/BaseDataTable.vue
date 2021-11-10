<template>
  <v-card>
    <v-card-title>
      {{tableName}}
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-card-text>
    <v-data-table :headers="compHeaders" :items="items" :search="search">
      <template v-slot:item.actions="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn text v-on="on" color="primary"><v-icon>mdi-menu</v-icon></v-btn>
          </template>
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item link @click="onDetails(item)">
                <v-list-item-icon class="mr-3"><v-icon>mdi-tag</v-icon></v-list-item-icon>
                <v-list-item-content><v-list-item-title>Details</v-list-item-title></v-list-item-content>
              </v-list-item> 
              <v-list-item link @click="onEdit(item)">
                <v-list-item-icon class="mr-3"><v-icon>mdi-pencil</v-icon></v-list-item-icon>
                <v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
              </v-list-item>
               <v-list-item link @click="onDelete(item)">
                <v-list-item-icon class="mr-3"><v-icon>mdi-delete</v-icon></v-list-item-icon>
                <v-list-item-content><v-list-item-title>Delete</v-list-item-title></v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:item.id="{ item }">
        <v-chip color="primary">{{item.id}}</v-chip>
      </template>
    </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    tableName: {
      type: String,
      required: true
    }
  },
  methods: {
    onDetails(item) {
      this.$emit('item-details', item);
    },
    onEdit(item) {
      this.$emit('item-edit', item);
    },
    onDelete(item) {
      this.$emit('item-delete', item);
    }
  },
  computed: {
    compHeaders() {
      const res = [];
      this.headers.forEach((header) => {
        res.push({
          text: header.name,
          align: 'center',
          value: header.value
        });
      });
      res.push({
        text: 'Actions',
        align: 'center',
        value: 'actions',
        sortable: 'false'
      });
      return res;
    }
  }

}
</script>