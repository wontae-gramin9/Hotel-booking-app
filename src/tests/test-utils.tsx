import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 공식 DOC에서 새로운 객체 만들어서 전달하라고 나와있음
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

// https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
