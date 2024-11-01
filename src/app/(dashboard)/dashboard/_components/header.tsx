import { ToggleTheme } from '@/components/toggle-theme';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';

function Header(props: { title?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b px-6 py-2">
      <Breadcrumb>
        <BreadcrumbList>
          {props.title ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            </>
          ) : null}
          <BreadcrumbItem>
            <BreadcrumbPage>{props.title || 'Dashboard'}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ToggleTheme />
    </div>
  );
}

export default Header;
