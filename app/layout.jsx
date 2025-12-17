import './globals.css'

export const metadata = {
  title: 'Blue Ocean Keywords - Find Low-Competition Gold',
  description: 'Discover high-value, low-competition keywords with intelligent analysis',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}