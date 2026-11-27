import React, { useEffect, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

type IconName =
  | 'dashboard'
  | 'chart'
  | 'inbox'
  | 'home'
  | 'folder'
  | 'file-text'
  | 'mail'
  | 'copy'
  | 'tag'
  | 'zap'
  | 'clock'
  | 'quote'
  | 'users'
  | 'link'
  | 'image'
  | 'settings'
  | 'external-link'
  | 'menu'
  | 'x'
  | 'chevron-down'
  | 'user'
  | 'logout'
  | 'sun'
  | 'moon';

interface NavItem {
  label: string;
  url: string;
  icon: IconName;
  exact?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface AdminLayoutProps {
  title?: string | null;
  description?: string | null;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const SITE_SHORT_NAME = 'S';

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', url: '/admin', icon: 'dashboard', exact: true },
      { label: 'Messages', url: '/admin/contacts', icon: 'inbox' },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      { label: 'Projects', url: '/admin/projects', icon: 'folder' },
      { label: 'Project categories', url: '/admin/project-categories', icon: 'tag' },
      { label: 'Services', url: '/admin/services', icon: 'zap' },
    ],
  },
  {
    label: 'Profile',
    items: [
      { label: 'Skills', url: '/admin/skills', icon: 'zap' },
      { label: 'Experience', url: '/admin/experiences', icon: 'clock' },
      { label: 'Testimonials', url: '/admin/testimonials', icon: 'quote' },
      { label: 'Clients', url: '/admin/clients', icon: 'users' },
    ],
  },
  {
    label: 'Site',
    items: [
      { label: 'Sections', url: '/admin/sections', icon: 'home' },
    ],
  },
];

function ManualIcon({
  name,
  size = 16,
  className = '',
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const props = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (name) {
    case 'dashboard':
      return (
        <svg {...props}>
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...props}>
          <line x1="18" x2="18" y1="20" y2="10" />
          <line x1="12" x2="12" y1="20" y2="4" />
          <line x1="6" x2="6" y1="20" y2="14" />
        </svg>
      );
    case 'inbox':
      return (
        <svg {...props}>
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      );
    case 'home':
      return (
        <svg {...props}>
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'folder':
      return (
        <svg {...props}>
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
      );
    case 'file-text':
      return (
        <svg {...props}>
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...props}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case 'copy':
      return (
        <svg {...props}>
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      );
    case 'tag':
      return (
        <svg {...props}>
          <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
          <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
        </svg>
      );
    case 'zap':
      return (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'quote':
      return (
        <svg {...props}>
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      );
    case 'users':
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'link':
      return (
        <svg {...props}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case 'image':
      return (
        <svg {...props}>
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 'external-link':
      return (
        <svg {...props}>
          <path d="M15 3h6v6" />
          <path d="M10 14 21 3" />
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...props}>
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      );
    case 'x':
      return (
        <svg {...props}>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...props}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'user':
      return (
        <svg {...props}>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'logout':
      return (
        <svg {...props}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
      );
    case 'sun':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      );
    case 'moon':
      return (
        <svg {...props}>
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      );
  }
}

function ManualThemeToggle() {
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="grid h-8 w-8 place-items-center rounded-[var(--radius-base)] text-muted transition-colors hover:bg-elevated hover:text-ink"
    >
      <ManualIcon name={dark ? 'sun' : 'moon'} size={16} />
    </button>
  );
}

function ManualFlashToast() {
  const page = usePage();
  const [dismissed, setDismissed] = useState(false);
  const message = page.props.flash.success;

  useEffect(() => {
    setDismissed(false);
  }, [message]);

  if (!message || dismissed) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-[var(--radius-base)] border border-line bg-elevated px-4 py-3 text-sm text-ink shadow-lg">
      <span>{message}</span>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => setDismissed(true)}
        className="text-muted hover:text-ink"
      >
        <ManualIcon name="x" size={14} />
      </button>
    </div>
  );
}

export default function AdminLayout({
  title = null,
  description = null,
  actions = null,
  children = null,
}: AdminLayoutProps) {
  const page = usePage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const user = page.props.auth.user;

  const currentPath = page.url.split('?')[0];

  useEffect(() => {
    setSidebarOpen(false);
    setUserMenuOpen(false);
  }, [page.url]);

  function isActive(item: NavItem) {
    return item.exact ? currentPath === item.url : currentPath.startsWith(item.url);
  }

  function logout() {
    router.post('/logout');
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 -translate-x-full border-r border-line bg-surface transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : ''
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-[calc(var(--radius-base)*0.6)] bg-ink text-xs font-semibold text-bg">
                {SITE_SHORT_NAME.charAt(0)}
              </span>
              <span className="text-sm font-semibold text-ink">Dashboard</span>
            </Link>

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
              className="text-muted lg:hidden"
            >
              <ManualIcon name="x" size={18} />
            </button>
          </div>

          <nav aria-label="Dashboard" className="hide-scrollbar flex-1 space-y-6 overflow-y-auto px-3 py-5">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-subtle">
                  {group.label}
                </p>

                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isActive(item);
                    return (
                      <li key={item.url} className="group/nav relative">
                        <Link
                          href={item.url}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-center gap-2.5 rounded-[var(--radius-base)] px-3 py-2 text-[13px] font-medium transition-colors ${
                            active
                              ? 'bg-accent-soft text-accent'
                              : 'text-muted hover:bg-elevated hover:text-ink'
                          }`}
                        >
                          <ManualIcon name={item.icon} size={16} />
                          <span className="flex-1">{item.label}</span>

                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="shrink-0 border-t border-line p-3">
            <a
              href="/"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2.5 rounded-[var(--radius-base)] px-3 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-elevated hover:text-ink"
            >
              <ManualIcon name="external-link" size={16} />
              View site
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-5 sm:px-7">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="text-muted hover:text-ink lg:hidden"
            >
              <ManualIcon name="menu" size={19} />
            </button>

            <div className="min-w-0 flex-1">
              {title && (
                <h1 className="truncate text-[15px] font-semibold text-ink">
                  {title}
                </h1>
              )}
            </div>

            <ManualThemeToggle />

            <div className="relative">
              <button
                type="button"
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-[var(--radius-base)] p-1 pr-2 transition-colors hover:bg-elevated"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                  {(user?.name ?? 'Admin').charAt(0)}
                </span>
                <ManualIcon name="chevron-down" size={14} className="text-muted" />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-1.5 w-52 rounded-[var(--radius-base)] border border-line bg-elevated p-1 shadow-lg"
                >
                  <div className="border-b border-line px-3 py-2.5">
                    <p className="truncate text-sm font-medium text-ink">
                      {user?.name ?? 'Admin'}
                    </p>
                    <p className="truncate text-xs text-subtle">
                      {user?.email ?? ''}
                    </p>
                  </div>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={logout}
                    className="flex w-full items-center gap-2.5 rounded-[calc(var(--radius-base)*0.7)] px-3 py-2 text-[13px] text-muted transition-colors hover:bg-surface hover:text-ink"
                  >
                    <ManualIcon name="logout" size={15} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="px-5 py-7 sm:px-7">
          {(description || actions) && (
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              {description && (
                <p className="max-w-2xl text-sm leading-relaxed text-muted">
                  {description}
                </p>
              )}

              {actions && (
                <div className="flex shrink-0 flex-wrap gap-2">
                  {actions}
                </div>
              )}
            </div>
          )}

          {children}
        </main>
      </div>

      <ManualFlashToast />
    </div>
  );
}
