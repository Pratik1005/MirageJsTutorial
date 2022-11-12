import {createServer} from "miragejs";

export default function () {
  createServer({
    routes() {
      this.get("/api/reminders", () => ({
        reminders: [
          {id: 1, text: "Walk the dog"},
          {id: 2, text: "Take out the trash"},
          {id: 3, text: "Work out"},
        ],
      }));

      let newId = 4;
      this.post("/api/reminders", (schema, request) => {
        let data = JSON.parse(request.requestBody);
        data.id = newId++;
        return {reminder: data};
      });
    },
  });
}
