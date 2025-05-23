import { Plus_Jakarta_Sans, Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-baiJamjuree",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "ZenFlow - Your Next gen Task Management App",
  description:
    "Zenflow is a task management app that helps you stay organized and focused.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body
          className={`${plusJakartaSans.variable} ${baiJamjuree.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
