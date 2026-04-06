export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hide GoHighLevel chat widget on team page */}
      <style>{`chat-widget { display: none !important; }`}</style>
      {children}
    </>
  );
}
