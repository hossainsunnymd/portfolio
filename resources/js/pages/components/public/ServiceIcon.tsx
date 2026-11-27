import type { ReactNode } from "react";

const icons: Record<string, ReactNode> = {
    monitor: (
        <>
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
        </>
    ),
    code: (
        <>
            <path d="m16 18 6-6-6-6" />
            <path d="m8 6-6 6 6 6" />
            <path d="m14 4-4 16" />
        </>
    ),
    sparkles: (
        <>
            <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
            <path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" />
        </>
    ),
    "shopping-cart": (
        <>
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2 2h2l3 12h12l3-9H5" />
        </>
    ),
    settings: (
        <>
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="m4.93 4.93 2.83 2.83" />
            <path d="m16.24 16.24 2.83 2.83" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <circle cx="12" cy="12" r="4" />
        </>
    ),
    clock: (
        <>
            <path d="M12 8v4l3 3" />
            <circle cx="12" cy="12" r="10" />
        </>
    ),
};

export default function ServiceIcon({ name }: { name: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {icons[name] ?? icons.sparkles}
        </svg>
    );
}
