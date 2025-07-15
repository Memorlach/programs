import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { Container } from '@/components/common/container';
import { Breadcrumb } from './breadcrumb';
import {useIsMobile} from "@/hooks/use-mobile";
import {Sheet, SheetBody, SheetContent, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {SidebarMenu} from "@/layout/components/sidebar-menu";

export function Header() {
  const [isSidebarSheetOpen, setIsSidebarSheetOpen] = useState(false);

  const mobileMode = useIsMobile();

  const scrollPosition = useScrollPosition();
  const headerSticky: boolean = scrollPosition > 0;

  return (
    <header
      className={cn(
        'header fixed top-0 z-10 start-0 flex items-stretch shrink-0 border-b border-transparent bg-background end-0 pe-[var(--removed-body-scroll-bar-size,0px)]',
        headerSticky && 'border-b border-border',
      )}
    >
      <Container className="flex justify-between items-stretch lg:gap-4">
        {/* HeaderLogo */}
        <div className="flex gap-1 lg:hidden items-center gap-2.5">
          <Link to="/" className="shrink-0">
            <img
                src="https://mtmedia.b-cdn.net/brand/imagotipo/mt-diamante.svg"
                className="h-[30px] w-full"
                alt="mini-logo"
            /></Link>
            <div className="flex items-center">
              {mobileMode && (
                  <Sheet
                      open={isSidebarSheetOpen}
                      onOpenChange={setIsSidebarSheetOpen}
                  >
                    <SheetTrigger asChild>
                      <Button variant="ghost" mode="icon">
                        <Menu className="text-muted-foreground/70"/>
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                        className="p-0 gap-0 w-[275px]"
                        side="left"
                        close={false}
                    >
                      <SheetHeader className="p-0 space-y-0"/>
                      <SheetBody className="p-0 overflow-y-auto">
                        <SidebarMenu/>
                      </SheetBody>
                    </SheetContent>
                  </Sheet>
              )}
            </div>
        </div>

        <Breadcrumb/>

      </Container>
    </header>
  );
}
