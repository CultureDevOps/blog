
'use client'

import { Inter } from 'next/font/google'
import SectionContainer from './SectionContainer'
import Footer from './navigation/Footer'
import { ReactNode } from 'react'
import Header from './navigation/Header'
import { usePathname } from 'next/navigation'
import { SearchProvider } from './search/SearchProvider'
import FullLayoutSectionContainer from './FullLayoutSectionContainer'

interface LayoutWrapperProps {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  const isFullPageLayout = pathname === '/' || pathname.startsWith('/landing');
  // const isFullPageLayout = true;

  return isFullPageLayout ? ( 
    <div className="h-screen">
      <SearchProvider>
        <SectionContainer>
          <div className="flex flex-col justify-between font-sans">
          <Header />  
          </div>
        </SectionContainer>
        <FullLayoutSectionContainer>      
          <div className="flex flex-col justify-between font-sans">
            {children}        
          </div>
        </FullLayoutSectionContainer>
      </SearchProvider>
      <div className="flex flex-col justify-between font-sans">
        <Footer />
      </div>
    </div>       
  ) : (    
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between font-sans">
        <SearchProvider>
          <Header />            
            {children}            
          <Footer /> 
        </SearchProvider>
      </div>   
    </SectionContainer>    
  );
}
export default LayoutWrapper
