import { useState } from 'react';
import {
  LayoutGrid,
  BarChart2,
  DollarSign,
  User,
  Clock,
  History,
  Settings,
  ChevronDown,
  FileText,
} from 'lucide-react';

export function Sidebar() {
  const [active, setActive] = useState('Overview');

  return (
    <div
      className="fixed left-0 top-0 h-full w-[280px] bg-white border-r border-[#e8eaed] flex flex-col"
      style={{ fontFamily: 'Satoshi, sans-serif' }}
    >
      {/* ── Logo ─────────────────────────────────────── */}
      <div className="flex items-center gap-[10px] px-[20px] pt-[20px] pb-[16px]">
        <div
          className="w-[32px] h-[32px] rounded-[8px] bg-[#3262ff] flex items-center justify-center flex-shrink-0"
        >
          <span
            className="text-white text-[16px]"
            style={{ fontFamily: 'Satoshi', fontWeight: 500, lineHeight: 1 }}
          >
            m
          </span>
        </div>
        <span
          className="text-[#1d1e2c] text-[16px]"
          style={{ fontFamily: 'Satoshi', fontWeight: 700 }}
        >
          maestro
        </span>
      </div>

      {/* ── Client Selector ──────────────────────────── */}
      <div className="px-[16px] mb-[4px]">
        <button className="w-full h-[40px] flex items-center gap-[8px] px-[12px] rounded-[8px] border border-[#e2e5eb] bg-white hover:bg-[#f8f9fa] transition-colors">
          <FileText size={15} className="text-[#6b7280] flex-shrink-0" />
          <span
            className="flex-1 text-left text-[#1d1e2c] text-[13px] truncate"
            style={{ fontFamily: 'Satoshi', fontWeight: 500 }}
          >
            Health Care Brand
          </span>
          <ChevronDown size={14} className="text-[#9ca3af] flex-shrink-0" />
        </button>

        {/* Sub-links */}
        <div className="flex items-center gap-[2px] mt-[8px] px-[2px]">
          <button
            className="text-[#3262ff] text-[12px] hover:underline"
            style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
          >
            View client
          </button>
          <span className="text-[#d1d5db] text-[12px] mx-[6px]">·</span>
          <button
            className="text-[#3262ff] text-[12px] hover:underline"
            style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
          >
            New client +
          </button>
        </div>
      </div>

      {/* ── WORKSPACE ────────────────────────────────── */}
      <div className="px-[16px] mt-[16px]">
        <p
          className="text-[#9ca3af] text-[11px] uppercase tracking-[0.8px] px-[8px] mb-[4px]"
          style={{ fontFamily: 'Satoshi', fontWeight: 500 }}
        >
          Workspace
        </p>
        <NavItem
          icon={<LayoutGrid size={15} />}
          label="Overview"
          active={active === 'Overview'}
          onClick={() => setActive('Overview')}
        />
        <NavItem
          icon={<BarChart2 size={15} />}
          label="Dashboard"
          active={active === 'Dashboard'}
          onClick={() => setActive('Dashboard')}
        />
        <NavItem
          icon={<DollarSign size={15} />}
          label="Finance"
          active={active === 'Finance'}
          onClick={() => setActive('Finance')}
        />
      </div>

      {/* ── QUICK FILTERS ────────────────────────────── */}
      <div className="px-[16px] mt-[16px]">
        <p
          className="text-[#9ca3af] text-[11px] uppercase tracking-[0.8px] px-[8px] mb-[4px]"
          style={{ fontFamily: 'Satoshi', fontWeight: 500 }}
        >
          Quick Filters
        </p>
        <NavItem
          icon={<User size={15} />}
          label="My plans"
          active={active === 'My plans'}
          onClick={() => setActive('My plans')}
        />
        <NavItem
          icon={<Clock size={15} />}
          label="Pending approval"
          badge={3}
          active={active === 'Pending approval'}
          onClick={() => setActive('Pending approval')}
        />
        <NavItem
          icon={<History size={15} />}
          label="Recently modified"
          active={active === 'Recently modified'}
          onClick={() => setActive('Recently modified')}
        />
      </div>

      {/* ── Spacer ───────────────────────────────────── */}
      <div className="flex-1" />

      {/* ── Footer ───────────────────────────────────── */}
      <div className="px-[20px] pb-[16px]">
        <p
          className="text-[#b0b5bf] text-[11px] mb-[12px]"
          style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
        >
          © Eurekads Pte. Ltd.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div
              className="w-[32px] h-[32px] rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#3b9bdc' }}
            >
              <span
                className="text-white text-[12px]"
                style={{ fontFamily: 'Satoshi', fontWeight: 700 }}
              >
                JA
              </span>
            </div>
            <span
              className="text-[#1d1e2c] text-[13px]"
              style={{ fontFamily: 'Satoshi', fontWeight: 500 }}
            >
              Julien Admin
            </span>
          </div>
          <button className="w-[28px] h-[28px] flex items-center justify-center rounded-[6px] hover:bg-[#f4f5f7] transition-colors">
            <Settings size={15} className="text-[#9ca3af]" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Nav Item ─────────────────────────────────────────── */
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

function NavItem({ icon, label, active, badge, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-full h-[38px] flex items-center gap-[10px] px-[12px] rounded-[8px]
        text-[14px] transition-colors text-left
        ${active ? 'bg-[#eef2ff] text-[#3262ff]' : 'text-[#6b7280] hover:bg-[#f8f9fa]'}
      `}
      style={{ fontFamily: 'Satoshi', fontWeight: active ? 500 : 400 }}
    >
      {/* Left active indicator */}
      {active && (
        <div className="absolute left-0 top-[5px] bottom-[5px] w-[3px] rounded-r-full bg-[#3262ff]" />
      )}
      <span className={active ? 'text-[#3262ff]' : 'text-[#9ca3af]'}>{icon}</span>
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span
          className="min-w-[20px] h-[20px] px-[5px] rounded-full bg-[#3262ff] text-white text-[11px] flex items-center justify-center"
          style={{ fontFamily: 'Satoshi', fontWeight: 600 }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
