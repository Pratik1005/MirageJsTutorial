import {createServer, Model, hasMany, belongsTo} from "miragejs";

export default function () {
  createServer({
    models: {
      list: Model.extend({
        reminders: hasMany(),
      }),
      reminder: Model.extend({
        list: belongsTo(),
      }),
    },

    seeds(server) {
      server.create("reminder", {text: "Study frontend"});
      server.create("reminder", {text: "Study class component"});
      server.create("reminder", {text: "Work out"});

      let homeList = server.create("list", {name: "Home"});
      server.create("reminder", {list: homeList, text: "Read book"});

      let workList = server.create("list", {name: "Work"});
      server.create("reminder", {list: workList, text: "Study frontend"});
    },

    routes() {
      // static GET method
      // this.get("/api/reminders", () => ({
      //   reminders: [
      //     {id: 1, text: "Walk the dog"},
      //     {id: 2, text: "Take out the trash"},
      //     {id: 3, text: "Work out"},
      //   ],
      // }));

      this.get("/api/reminders", (schema) => {
        return schema.reminders.all();
      });

      // let newId = 4;
      this.post("/api/reminders", (schema, request) => {
        let data = JSON.parse(request.requestBody);
        // data.id = newId++;
        // return {reminder: data};
        console.log(data);
        return schema.reminders.create(data);
      });

      this.delete("/api/reminders/:id", (schema, request) => {
        let id = request.params.id;
        return schema.reminders.find(id).destroy();
      });

      this.get("/api/lists", (schema) => {
        return schema.lists.all();
      });

      this.get("/api/lists/:id/reminders", (schema, request) => {
        let listId = request.params.id;
        let list = schema.lists.find(listId);
        return list.reminders;
      });
    },
  });
}
