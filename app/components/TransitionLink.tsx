'use client';

import Link from 'next/link';
import { useTransition } from '../context/TransitionContext';
import { ReactNode, MouseEvent, TouchEvent, useCallback } from 'react';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: unknown;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...props
}: TransitionLinkProps) {
  const { triggerTransition } = useTransition();

  const handleNavigation = useCallback((e: MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>) => {
    // Allow cmd/ctrl click for new tab (mouse only)
    if ('metaKey' in e && (e.metaKey || e.ctrlKey)) return;

    // Allow external links to work normally
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    e.preventDefault();
    e.stopPropagation();

    // Call custom onClick if provided (mouse only)
    if (onClick && 'button' in e) onClick(e as MouseEvent<HTMLAnchorElement>);

    // Trigger the transition
    triggerTransition(href);
  }, [href, onClick, triggerTransition]);

  return (
    <Link
      href={href}
      className={className}
      onClick={handleNavigation}
      {...props}
    >
      {children}
    </Link>
  );
}
