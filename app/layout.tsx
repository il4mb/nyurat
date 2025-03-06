import { Suspense } from "react";
import AppTheme from "./theme/AppTheme";
import "./globals.scss";


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <AppTheme>
            {props.children}
          </AppTheme>
        </Suspense>
      </body>
    </html>
  );
}