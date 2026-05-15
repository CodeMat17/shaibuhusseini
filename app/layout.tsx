import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const BASE_URL = "https://drshaibu.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dr. Shaibu Husseini — Film Scholar, Cultural Administrator & NFVCB DG",
    template: "%s | Dr. Shaibu Husseini",
  },
  description:
    "Official profile of Dr. Shaibu Husseini, Executive Director/CEO of the National Film and Video Censors Board (NFVCB), Nigeria. Film scholar, cultural administrator, and Nollywood documentarist with over 30 years in media.",
  keywords: [
    "Dr. Shaibu Husseini",
    "NFVCB",
    "National Film and Video Censors Board",
    "Nollywood",
    "Nigerian film industry",
    "film scholar",
    "cultural administrator",
    "AMAA",
    "Africa Movie Academy Awards",
    "Golden Globe voting member",
    "Berlinale consultant",
    "Executive Director NFVCB",
    "Nigerian cinema",
    "film regulation Nigeria",
  ],
  authors: [{ name: "Dr. Shaibu Husseini" }],
  creator: "Dr. Shaibu Husseini",
  publisher: "Dr. Shaibu Husseini",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_NG",
    url: BASE_URL,
    siteName: "Dr. Shaibu Husseini",
    title: "Dr. Shaibu Husseini — Film Scholar, Cultural Administrator & NFVCB DG",
    description:
      "Official profile of Dr. Shaibu Husseini, Executive Director/CEO of the NFVCB Nigeria. Film scholar, cultural administrator, and Nollywood documentarist.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Shaibu Husseini — Executive Director, NFVCB Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Shaibu Husseini — Film Scholar, Cultural Administrator & NFVCB DG",
    description:
      "Official profile of Dr. Shaibu Husseini, Executive Director/CEO of the NFVCB Nigeria.",
    images: ["/opengraph-image.jpg"],
    creator: "@igalaman",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "person",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Shaibu Husseini",
  honorificPrefix: "Dr.",
  jobTitle: "Executive Director / CEO",
  worksFor: {
    "@type": "GovernmentOrganization",
    name: "National Film and Video Censors Board (NFVCB)",
    url: "https://www.nfvcb.gov.ng",
  },
  url: BASE_URL,
  image: `${BASE_URL}/opengraph-image.jpg`,
  sameAs: [
    "https://www.instagram.com/igalaman",
    "https://www.facebook.com/shaibu.husseini.7",
    "https://www.linkedin.com/in/husseini-shaibu",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Lagos State University" },
    { "@type": "CollegeOrUniversity", name: "University of Lagos" },
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "PhD, Mass Communication", recognizedBy: { "@type": "CollegeOrUniversity", name: "University of Lagos" } },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MSc Mass Communication (Distinction)", recognizedBy: { "@type": "CollegeOrUniversity", name: "University of Lagos" } },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "BSc Mass Communication (First Class)", recognizedBy: { "@type": "CollegeOrUniversity", name: "Lagos State University" } },
  ],
  knowsAbout: [
    "Film Criticism",
    "Cultural Administration",
    "Nollywood",
    "Film Policy",
    "Theatre Arts",
    "Mass Communication",
    "Public Relations",
    "Creative Economy",
  ],
  description:
    "Film scholar, cultural administrator, and Executive Director/CEO of the National Film and Video Censors Board (NFVCB) Nigeria, with over 30 years in media.",
  nationality: { "@type": "Country", name: "Nigeria" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${nunito.className} antialiased scroll-smooth`}
    >
      <head>
        <meta name="theme-color" content="#f59e0b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-black focus:font-semibold focus:rounded-lg focus:outline-none"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
