import React from 'react'

function HomeLogo() {
  return (
    <a href="/" className="flex items-center gap-2">
         <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BA</span>
              </div>
              <h1 className="text-xl font-bold text-primary-500">Black Aura</h1>
            </div>
    </a>
  )
}

export default HomeLogo