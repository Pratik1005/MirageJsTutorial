import {createServer, Model} from "miragejs";

export default function () {
  createServer({
    models: {
      reminder: Model,
    },

    seeds(server) {
      server.create("reminder", {text: "Study frontend"});
      server.create("reminder", {text: "Study class component"});
      server.create("reminder", {text: "Work out"});
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
        return schema.reminders.create(data);
      });

      this.delete("/api/reminders/:id", (schema, request) => {
        let id = request.params.id;
        return schema.reminders.find(id).destroy();
      });
    },
  });
}
