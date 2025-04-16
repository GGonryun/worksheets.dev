import React from 'react';
import { AppSidebar } from '../navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '../ui';
import { ReactNode } from 'react';

export const DashboardLayout: React.FC<{
  children: ReactNode;
  crumbs: {
    label: string;
    href: string;
  }[];
  accent?: ReactNode;
}> = ({ crumbs = [], accent, children }) => {
  const remaining = crumbs.slice(0, -1);
  const [last] = crumbs.slice(-1);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex  items-center justify-between w-full">
              <Breadcrumb>
                <BreadcrumbList>
                  {remaining.map((crumb) => (
                    <React.Fragment key={crumb.href}>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={crumb.href}>
                          {crumb.label}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </React.Fragment>
                  ))}
                  {last && (
                    <BreadcrumbItem>
                      <BreadcrumbPage>{last.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
              {accent}
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
