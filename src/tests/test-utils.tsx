// https://testing-library.com/docs/react-testing-library/setup#custom-render
import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "@/context/DarkModeContext";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <DarkModeProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </DarkModeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
