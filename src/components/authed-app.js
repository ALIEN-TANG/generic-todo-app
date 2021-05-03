import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "components/lib/layout";
import { H1 } from "components/lib/typography";
import TodoList from "components/todo-list";
import { client } from "api/client";
import { useLogin } from "context/login-provider";

function AuthedApp({ username }) {
  const { getMasterToken } = useLogin();
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

  return (
    <Layout>
      <H1>{`Welcome, ${username}!`}</H1>
      {editingList && <TodoList list={editingList} />}
    </Layout>
  );
}
export default AuthedApp;
