"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout(props: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/logos/favicon.ico" />
        <title>Buildis</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
