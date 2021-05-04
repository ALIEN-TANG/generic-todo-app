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
      let parsedData = JSON.parse(requestData);
      data = dbReturn(parsedData);
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
const ENDPOINTS = new Map([
  ["GET:/lists", getLists],
  ["PUT:/list", editList],
  ["PUT:/item", editItem],
]);

// Models
const TEMPLATE_LIST_ITEM = {
  id: "", // UUID
  title: "", // STRING
  description: "", // TEXT
  status: "PENDING", // ENUM("PENDING", "DONE")
  dueDate: null, // DATE
  createdAt: "", // DATE
};
// const TEMPLATE_LIST = {
//   id: "", // UUID
//   title: "", // STRING
//   items: [], // MAP[LIST_ITEM]
//   createdAt: "", // DATE
// };

// API handlers
function getLists() {
  let lists = window.localStorage.getItem("lists");
  if (!lists) {
    const newListItem = {
      ...TEMPLATE_LIST_ITEM,
      id: uuidv4(),
      title: "Untitled",
      createdAt: Date.now(),
    };
    const newList = {
      id: uuidv4(),
      title: "Untitled",
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
function editList({ id, ...updates }) {
  let lists = window.localStorage.getItem("lists");
  if (lists && lists.length) {
    lists = JSON.parse(lists);
  }
  let matchId = id;
  const list = lists.find(({ id }) => id === matchId);
  let newList;
  if (list && !!Object.keys(updates).length) {
    newList = { ...list, ...updates };
  }
  if (newList) {
    let remainingLists = lists.filter(({ id }) => id !== matchId);
    let newLists = [newList, ...remainingLists];
    window.localStorage.setItem("lists", JSON.stringify(newLists));
    return newList;
  } else {
    return list;
  }
}
function editItem({ id: itemId, listId, ...updates }) {
  const list = editList({ id: listId });
  let newItem;
  let newListItems;
  let newList;
  if (list && list.items.length && itemId && !!Object.keys(updates).length) {
    let item = list.items.find(({ id }) => id === itemId);
    newItem = { ...item, ...updates };
  }
  if (newItem) {
    let remainingItems = list.items.filter(({ id }) => id !== itemId);
    newListItems = [newItem, ...remainingItems];
    newList = editList({ id: listId, items: newListItems });
  }
  return newList || list;
}

function verifyBearerAuth({ Authorization }) {
  return Authorization === "Bearer 641";
}
