import SiteHeader from "../components/public/SiteHeader";
import SiteFooter from "../components/public/SiteFooter";
import type { ReactNode } from "react";
const PublicPanel = ({ children }: { children: ReactNode }) => {
    return (
    <div className="flex min-h-screen flex-col">
        <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-base)] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-fg"
        >
            Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="flex-1">
            {children}
        </main>

        <SiteFooter />
        {/* <ChatBubble />
        <FlashToast /> */}
    </div>
    );
};

export default PublicPanel;
