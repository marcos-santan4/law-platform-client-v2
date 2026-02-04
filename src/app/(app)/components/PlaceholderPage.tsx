type PlaceholderPageProps = {
  title: string;
  description?: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        padding: 18,
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <h1 style={{ margin: 0, fontSize: 24, color: '#0b2f36' }}>{title}</h1>
      <p style={{ marginTop: 8, marginBottom: 0, color: '#4a5568' }}>
        {description ?? 'Página em construção.'}
      </p>
    </div>
  );
}

