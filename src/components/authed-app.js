import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "components/lib/layout";
import { H3 } from "components/lib/typography";
import { client } from "api/client";

const MASTER_TOKEN = "641";
function getMasterToken() {
  return MASTER_TOKEN;
}

function AuthedApp({ username }) {
  const [todoLists, setTodoLists] = useState(null);
  const [editingList, selectEditingList] = useState(null);
  const { data, isLoading, isError } = useQuery("TodoLists", () => {
    return client(`/lists`, {
      method: "GET",
      token: getMasterToken(),
    });
  });

  useEffect(() => {
    if (isError) {
      // TODO: throw new error to be caught by ErrorBoundary
    } else if (isLoading) {
      //  TODO: set loading state
    } else if (data) {
      const { data: lists, error } = data;
      if (error) {
        // TODO: set error state
        console.error("error message: ", error.message);
      } else if (lists) {
        setTodoLists(lists);
      }
    }
  }, [isError, isLoading, data]);

  useEffect(() => {
    if (todoLists && !!todoLists.length) {
      selectEditingList(todoLists[0]);
    }
  }, [todoLists]);

  console.log("editingList: ", editingList);
  return (
    <Layout>
      <H3>"Authed App"</H3>
      {`Welcome, ${username}!`}
    </Layout>
  );
}
export default AuthedApp;
