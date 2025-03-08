import { Suspense } from "react";
import AppTheme from "./theme/AppTheme";
import "./globals.scss";
import GlobalComponent from "./ui/GlobalComponent";


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppTheme>
          <GlobalComponent>
            <Suspense fallback={<div>Loading...</div>}>
              {props.children}
            </Suspense>
          </GlobalComponent>
        </AppTheme>
      </body>
    </html >
  );
}