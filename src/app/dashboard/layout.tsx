export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="h-screen w-screen bg-gray-100 overflow-hidden">
    {children}
    </div>
    
      
  );
 }