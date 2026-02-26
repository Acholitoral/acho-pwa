import './globals.css'

export const metadata = {
  title: 'Achô - Marketplace Local',
  description: 'Encontre tudo que você precisa no litoral norte de São Paulo',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#00CED1',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Achô" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
