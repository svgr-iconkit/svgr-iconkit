
import { lazy, Suspense } from 'react'
import './App.css'


const IconPage = lazy(() => import('./icon-view'))

function App() {

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <IconPage />
      </Suspense>
    </main>
  )
}

export default App
