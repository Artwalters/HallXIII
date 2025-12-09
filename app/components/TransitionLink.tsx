'use client';

import Link from 'next/link';
import { useTransition } from '../context/TransitionContext';
import { ReactNode, MouseEvent } from 'react';

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

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Allow cmd/ctrl click for new tab
    if (e.metaKey || e.ctrlKey) return;

    // Allow external links to work normally
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    e.preventDefault();

    // Call custom onClick if provided
    if (onClick) onClick(e);

    // Trigger the transition
    triggerTransition(href);
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
