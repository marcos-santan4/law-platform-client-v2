'use client';

import { FiPlus } from 'react-icons/fi';
import { DropdownMenu, type DropdownMenuItem } from '../../../../../components/dropdownMenu';
import styles from './styles.module.scss';

export type AddDataAction = 'movement' | 'coverField' | 'party' | 'document';

type Props = {
  label: string;
  variant?: 'primary' | 'outline';
  onSelect: (action: AddDataAction) => void;
};

export function AddDataMenu({ label, variant = 'outline', onSelect }: Props) {
  const items: DropdownMenuItem[] = [
    { key: 'movement', label: 'Adicionar Movimentação', onClick: () => onSelect('movement') },
    { key: 'coverField', label: 'Adicionar Campo da Capa', onClick: () => onSelect('coverField') },
    { key: 'party', label: 'Adicionar Parte', onClick: () => onSelect('party') },
    { key: 'document', label: 'Adicionar Documento', onClick: () => onSelect('document') },
  ];

  return (
    <DropdownMenu
      items={items}
      menuAriaLabel="Adicionar dados manualmente"
      trigger={({ ref, toggle }) => (
        <button
          ref={ref}
          type="button"
          className={variant === 'primary' ? styles.primaryButton : styles.outlineButton}
          onClick={toggle}
        >
          <FiPlus size={16} aria-hidden="true" />
          <span>{label}</span>
        </button>
      )}
    />
  );
}

