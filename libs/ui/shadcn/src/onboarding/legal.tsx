export const LegalHtml: React.FC<{ children: string }> = ({ children }) => {
  return (
    <div
      className="prose prose-sm max-w-none [&_a]:text-blue-500 hover:[&_a]:underline [&_p]:mb-4 [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_li]:ml-6"
      dangerouslySetInnerHTML={{
        __html: children,
      }}
    />
  );
};
