export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hide GoHighLevel chat widget on all case study pages */}
      <style>{`chat-widget { display: none !important; }`}</style>
      {children}
    </>
  );
}
