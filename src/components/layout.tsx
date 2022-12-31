interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-grayscale-background">
      {children}
    </div>
  )
}
