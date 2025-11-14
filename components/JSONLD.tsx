interface JSONLDProps {
  data: Record<string, any>;
}

export default function JSONLD({ data }: JSONLDProps) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

