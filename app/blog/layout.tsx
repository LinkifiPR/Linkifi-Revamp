export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hide GoHighLevel chat widget on all blog pages */}
      <style>{`chat-widget { display: none !important; }`}</style>
      {children}
    </>
  );
}
