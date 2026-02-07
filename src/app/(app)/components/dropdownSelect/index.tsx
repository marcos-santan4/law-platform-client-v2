'use client';

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown } from 'react-icons/fi';

import styles from './styles.module.scss';

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type MenuPosition = {
  left: number;
  width: number;
  top?: number;
  bottom?: number;
  openUp: boolean;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  maxMenuHeight?: number;
  menuAriaLabel?: string;
};

export function DropdownSelect({
  value,
  onChange,
  options,
  placeholder = 'Selecione',
  disabled,
  maxMenuHeight = 280,
  menuAriaLabel,
}: Props) {
  const listId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<MenuPosition | null>(null);

  const selected = useMemo(() => options.find((o) => o.value === value) ?? null, [options, value]);

  const updatePosition = () => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const padding = 12;
    const gap = 10;
    const viewportH = window.innerHeight;
    const viewportW = window.innerWidth;
    const spaceBelow = viewportH - rect.bottom - padding;
    const spaceAbove = rect.top - padding;
    const shouldOpenUp = spaceBelow < maxMenuHeight && spaceAbove > spaceBelow;

    let left = rect.left;
    left = Math.min(left, viewportW - padding - rect.width);
    left = Math.max(padding, left);

    const next: MenuPosition = {
      left,
      width: rect.width,
      openUp: shouldOpenUp,
      ...(shouldOpenUp
        ? { bottom: viewportH - rect.top + gap, top: undefined }
        : { top: rect.bottom + gap, bottom: undefined }),
    };
    setPos(next);
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, maxMenuHeight, options.length]);

  useEffect(() => {
    if (!open) return;

    const onMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t)) return;
      if (menuRef.current?.contains(t)) return;
      setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    const onScrollOrResize = () => updatePosition();

    document.addEventListener('mousedown', onMouseDown, true);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('scroll', onScrollOrResize, true);

    return () => {
      document.removeEventListener('mousedown', onMouseDown, true);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('scroll', onScrollOrResize, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, maxMenuHeight]);

  return (
    <div className={styles.wrapper}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.button}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        disabled={disabled}
      >
        <span className={`${styles.value} ${!selected ? styles.valuePlaceholder : ''}`}>
          {selected?.label ?? placeholder}
        </span>
        <FiChevronDown
          size={16}
          className={`${styles.icon} ${open ? styles.iconOpen : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && pos
        ? createPortal(
            <div
              ref={menuRef}
              id={listId}
              className={`${styles.menu} ${pos.openUp ? styles.menuUp : ''}`}
              role="listbox"
              aria-label={menuAriaLabel}
              style={{
                left: pos.left,
                width: pos.width,
                top: pos.top,
                bottom: pos.bottom,
                maxHeight: maxMenuHeight,
              }}
            >
              {options.map((opt) => {
                const active = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={active}
                    disabled={opt.disabled}
                    className={`${styles.option} ${active ? styles.optionActive : ''}`}
                    onClick={() => {
                      if (opt.disabled) return;
                      onChange(opt.value);
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}


