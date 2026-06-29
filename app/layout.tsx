import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const manrope = Manrope({
  variable: "--font-manrope-base",
  subsets: ["latin"],
  weight: ['200','300','400','500','600','700','800']
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-base",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${manrope.variable}  ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="bg-w min-h-full flex flex-col">
           <Header></Header>
        {children}
        <Footer></Footer>
        </body>
    </html>
  );
}