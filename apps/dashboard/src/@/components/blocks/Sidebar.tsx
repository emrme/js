import { ExternalLinkIcon } from "lucide-react";
import type React from "react";
import { cn } from "../../lib/utils";
import { NavLink } from "../ui/NavLink";

export type SidebarBaseLink = {
  href: string;
  label: React.ReactNode;
  exactMatch?: boolean;
  hide?: boolean;
  tracking?: {
    category: string;
    action: string;
    label: string;
  };
};

export type SidebarLink =
  | SidebarBaseLink
  | {
      group: string;
      links: SidebarBaseLink[];
      hide?: boolean;
    };

type SidebarContentProps = {
  header?: React.ReactNode;
  links: SidebarLink[];
  className?: string;
};

export function Sidebar(props: SidebarContentProps) {
  // remove groups with no links to show
  const links = props.links.filter((link) => {
    if ("group" in link) {
      return link.links.filter((l) => !l.hide).length > 0;
    }
    return true;
  });

  return (
    <aside
      className={cn(
        "sticky top-0 hidden w-[230px] flex-shrink-0 self-start lg:block",
        props.className,
      )}
    >
      <div className="pt-7">
        {props.header}
        <div className="flex flex-col gap-1">
          <RenderSidebarLinks links={links} />
        </div>
      </div>
    </aside>
  );
}

export function RenderSidebarLinks(props: { links: SidebarLink[] }) {
  return (
    <div className="flex flex-col gap-1">
      {props.links
        .filter((l) => !l.hide)
        .map((link, i) => {
          if ("group" in link) {
            return (
              <div className={cn(i !== 0 && "mt-6")}>
                <p className={cn("px-3 py-2 font-medium text-foreground")}>
                  {link.group}
                </p>
                <RenderSidebarLinks links={link.links} />
              </div>
            );
          }

          const isExternal = link.href.startsWith("http");
          return (
            <NavLink
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground text-sm hover:bg-muted"
              activeClassName="text-foreground"
              exactMatch={link.exactMatch}
            >
              {link.label}
              {isExternal && <ExternalLinkIcon className="size-3" />}
            </NavLink>
          );
        })}
    </div>
  );
}
