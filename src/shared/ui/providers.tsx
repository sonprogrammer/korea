"use client";

import { useState } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, App } from "antd";
import koKR from "antd/locale/ko_KR";
import { makeQueryClient } from "@/shared/api/query-client";
import { AuthInitializer } from "@/features/auth/ui/auth-initializer";


export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <AntdRegistry>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            components: {
              Modal: {
                contentBg: "#111118",
                headerBg: "#111118",
                footerBg: "#111118",
                titleColor: "#ffffff",
                borderRadius: 12,
                colorText: "rgba(255,255,255,0.6)",
                colorBorder: "rgba(255,255,255,0.5)"
              },
            },
          }}
          locale={koKR} >
          <App>
            <AuthInitializer />
            {children}
          </App>
        </ConfigProvider>
      </QueryClientProvider>
    </AntdRegistry>
  );
}
