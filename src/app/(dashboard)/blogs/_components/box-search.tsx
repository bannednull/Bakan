'use client';

import { useTransition } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useFilteredBlogs } from '@dashboard/blogs/searchParams';

function BoxSearch() {
  const { searchQuery, setSearchQuery, setCurrentPage } = useFilteredBlogs();

  const [isLoading, startTransition] = useTransition();
  const handleSearch = (value: string) => {
    setSearchQuery(value, { startTransition });
    setCurrentPage(1);
  };

  return (
    <div className="relative">
      <Input
        className={cn('w-auto pe-9 ps-9', isLoading && 'animate-pulse')}
        placeholder="Search ...."
        type="text"
        value={searchQuery || ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
        <Search size={16} strokeWidth={2} />
      </div>
    </div>
  );
}

export default BoxSearch;
