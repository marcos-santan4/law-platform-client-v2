'use client';

type Props = {
  open: boolean;
  onClose: () => void;
  caseId: string;
};

export function AddPartyModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Adicionar parte"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 1000,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          width: 'min(560px, 100%)',
          padding: 16,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: 0, marginBottom: 8 }}>Adicionar parte</h2>
        <p style={{ margin: 0, marginBottom: 16, opacity: 0.75 }}>
          Modal placeholder (implementação pendente).
        </p>
        <button type="button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

