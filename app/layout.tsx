import { Providers } from "./providers";
import { fonts } from "./chakra/fonts";

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
