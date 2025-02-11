export const LdJsonScript: React.FC<{ json: object }> = ({ json }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
};
