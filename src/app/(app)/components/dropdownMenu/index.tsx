'use client';

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.scss';

export type DropdownMenuItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
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
  trigger: (args: { ref: React.RefObject<HTMLButtonElement | null>; open: boolean; toggle: () => void }) => React.ReactNode;
  items: DropdownMenuItem[];
  maxMenuHeight?: number;
  menuAriaLabel?: string;
  minWidth?: number;
};

export function DropdownMenu({ trigger, items, maxMenuHeight = 280, menuAriaLabel, minWidth = 220 }: Props) {
  const listId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<MenuPosition | null>(null);

  const toggle = () => setOpen((v) => !v);

  const effectiveHeight = useMemo(() => Math.max(140, maxMenuHeight), [maxMenuHeight]);

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
    const shouldOpenUp = spaceBelow < effectiveHeight && spaceAbove > spaceBelow;

    let width = Math.max(rect.width, minWidth);
    width = Math.min(width, viewportW - padding * 2);

    let left = rect.left;
    left = Math.min(left, viewportW - padding - width);
    left = Math.max(padding, left);

    const next: MenuPosition = {
      left,
      width,
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
  }, [open, effectiveHeight, items.length]);

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
  }, [open, effectiveHeight]);

  return (
    <>
      {trigger({ ref: triggerRef, open, toggle })}

      {open && pos
        ? createPortal(
            <div
              ref={menuRef}
              id={listId}
              className={`${styles.menu} ${pos.openUp ? styles.menuUp : ''}`}
              role="menu"
              aria-label={menuAriaLabel}
              style={{
                left: pos.left,
                width: pos.width,
                top: pos.top,
                bottom: pos.bottom,
                maxHeight: effectiveHeight,
              }}
            >
              {items.map((it) => (
                <button
                  key={it.key}
                  type="button"
                  role="menuitem"
                  className={styles.item}
                  disabled={it.disabled}
                  onClick={() => {
                    if (it.disabled) return;
                    it.onClick();
                    setOpen(false);
                  }}
                >
                  {it.icon ? <span className={styles.itemIcon}>{it.icon}</span> : null}
                  <span className={styles.itemLabel}>{it.label}</span>
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}


