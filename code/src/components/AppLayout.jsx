import { useState } from 'react'
import { Sidebar, Header } from './Layout'
import Footer from './Footer'

// Wrapper component for protected routes with layout
const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-accent-dark">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            isCollapsed={isCollapsed} 
            setIsCollapsed={setIsCollapsed} 
          />
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
      {/* <div className="w-full border-t border-gray-800">
        <Footer />
      </div> */}
    </div>
  )
}

export default AppLayout
