import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import GlobalStyles from "./global/globalStyles";
import router from "./routes/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import Modal from "react-modal";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <GlobalStyles />
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
    </RecoilRoot>
  </QueryClientProvider>,
);

Modal.setAppElement("#root");
