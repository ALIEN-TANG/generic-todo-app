import { v4 as uuidv4 } from "uuid";

export function fetchFromFakeDB(request) {
  const { url, method, data: requestData, headers } = request;
  let statusInfo = {};
  let responseData = {};

  if (verifyBearerAuth(headers)) {
    const endpoint = `${method}:${url}`;
    const dbReturn = ENDPOINTS.get(endpoint);
    let data = undefined;

    if (requestData && dbReturn) {
      data = dbReturn(requestData);
    } else if (dbReturn) {
      data = dbReturn();
    }

    if (data) {
      statusInfo = { status: 200, statusText: "OK" };
      responseData = { data };
    } else {
      statusInfo = { status: 404, statusText: "Not Found" };
      responseData = {
        error: { message: `Could not locate resource at ${url}` },
      };
    }
  } else {
    statusInfo = { status: 401, statusText: "Unauthorized" };
    responseData = { error: { message: "Invalid credentials" } };
  }
  const responseBlob = new Blob([JSON.stringify(responseData, null, 2)], {
    type: "application/json",
  });

  const response = new Response(responseBlob, statusInfo);
  return response;
}

// Backend "routes"
const ENDPOINTS = new Map([["GET:/lists", getLists]]);

// Models
const TEMPLATE_LIST_ITEM = {
  id: "", // UUID
  listIndex: "", // INT AUTO_INCREMENT
  title: "", // STRING
  description: "", // TEXT
  status: "PENDING", // ENUM("PENDING", "DONE")
  dueDate: "", // DATE
};
// const TEMPLATE_LIST = { id: "", name: "", items: [] };

// API handlers
function getLists() {
  let lists = window.localStorage.getItem("lists");
  if (!lists) {
    const newListItem = {
      ...TEMPLATE_LIST_ITEM,
      id: uuidv4(),
      createdAt: Date.now(),
    };
    const newList = {
      id: uuidv4(),
      items: [newListItem],
      createdAt: Date.now(),
    };
    lists = [newList];
  } else {
    lists = JSON.parse(window.localStorage.getItem("lists"));
  }

  window.localStorage.setItem("lists", JSON.stringify(lists));
  return lists;
}

function verifyBearerAuth({ Authorization }) {
  return Authorization === "Bearer 641";
}
