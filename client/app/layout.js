import '@styles/globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css';
import "react-toastify/dist/ReactToastify.css";



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FI-TS AI Chat',
  description: 'Chatte mit deinen Dokumenten - AI Testprojekt',
}

export default function RootLayout({ children }) {
  return (
    <html lang="de" suppressHydrationWarning={true}>
    
      <body className={inter.className}>
        {children}
        </body>
      
    </html>
  )
}
