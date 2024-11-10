'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function ActivateLink(props: { path: string; children: React.ReactNode; className?: string }) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(props.className, {
        'bg-accent/50 font-bold text-blue-500': pathname === props.path,
      })}
      href={props.path}
    >
      {props.children}
    </Link>
  );
}

export default ActivateLink;
