import Router from '../router'

function App() {
  return (
    <div
      className={
        'flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-grayscale-background'
      }
    >
      <Router />
    </div>
  )
}
export default App
