"use client";

import { useState } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, App } from "antd";
import koKR from "antd/locale/ko_KR";
import { makeQueryClient } from "@/shared/api/query-client";
import { AuthInitializer } from "@/features/auth/ui/auth-initializer";

const theme = {
  token: {
    colorPrimary: "#1a56db",
    borderRadius: 12,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <AntdRegistry>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider locale={koKR} theme={theme}>
          <App>
            <AuthInitializer />
            {children}
          </App>
        </ConfigProvider>
      </QueryClientProvider>
    </AntdRegistry>
  );
}
