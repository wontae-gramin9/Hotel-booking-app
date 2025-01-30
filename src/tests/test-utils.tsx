import { ReactElement } from "react";
import { render, renderHook, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 공식 DOC에서 새로운 객체 만들어서 전달하라고 나와있음
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const QueryClientWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <DarkModeProvider>
      <QueryClientWrapper>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          {children}
        </BrowserRouter>
      </QueryClientWrapper>
    </DarkModeProvider>
  );
};

const customRenderHook = (customHook: Function) =>
  renderHook(() => customHook(), { wrapper: QueryClientWrapper });

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render, customRenderHook as renderHook };
