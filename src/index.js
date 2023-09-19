import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import route from "./routes/index.js";
import connect from "../config/db/index.js";
import methodOverride from "method-override";
import SortMiddleware from "./app/middleware/SortMiddleware.js";

// connect db
connect();

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

// HTTP logger
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json(""));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// custom middelware
app.use(SortMiddleware);

// template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "bi bi-chevron-bar-expand",
          asc: "bi bi-sort-down-alt",
          desc: "bi bi-sort-down",
        };
        const types = {
          default: "desc",
          desc: "asc",
          asc: "desc",
        };

        const icon = icons[sortType];
        const type = types[sortType];
        return `
        <a href="?_sort&column=${field}&type=${type}" class="text-black">
          <i class="${icon} text-primary"></i>
        </a>
        `;
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(
  port,
  console.log(`Example app listening at http://localhost:${port}`)
);
