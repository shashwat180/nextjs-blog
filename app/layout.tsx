import { Providers } from "./providers";
import { fonts } from "./chakra/fonts";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.raleway.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
