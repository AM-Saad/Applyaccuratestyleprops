import { X, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

interface AddClientDialogProps {
  open: boolean;
  onClose: () => void;
}

interface ArchLevel {
  id: number;
  label: string;
  values: string;
}

const DEFAULT_LEVELS: ArchLevel[] = [
  { id: 1, label: 'Market',   values: 'SG, UK, US, DE' },
  { id: 2, label: 'Language', values: 'EN, ES, FR' },
  { id: 3, label: 'Moment',   values: 'Q3_Launch, Easter' },
];

export function AddClientDialog({ open, onClose }: AddClientDialogProps) {
  const [levels, setLevels] = useState<ArchLevel[]>(DEFAULT_LEVELS);

  if (!open) return null;

  const addLevel = () => {
    const nextId = levels.length > 0 ? Math.max(...levels.map((l) => l.id)) + 1 : 1;
    setLevels([...levels, { id: nextId, label: '', values: '' }]);
  };

  const removeLevel = (id: number) => {
    setLevels(levels.filter((l) => l.id !== id));
  };

  const updateLevel = (id: number, field: 'label' | 'values', value: string) => {
    setLevels(levels.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/25" onClick={onClose} />

      {/* Dialog card */}
      <div
        className="relative bg-white rounded-[12px] w-[560px] max-h-[90vh] flex flex-col overflow-hidden"
        style={{
          boxShadow:
            '0px 4px 6px -2px rgba(0,0,0,0.05), 0px 10px 32px -4px rgba(0,0,0,0.12)',
        }}
      >
        {/* ── Header ─────────────────────────────────── */}
        <div className="px-[24px] pt-[24px] pb-[18px] border-b border-[#e8eaed] flex items-start justify-between flex-shrink-0">
          <div>
            <h2
              className="text-[#1d1e2c] text-[18px] leading-[26px]"
              style={{ fontFamily: 'Satoshi', fontWeight: 700 }}
            >
              Add New Client
            </h2>
            <p
              className="text-[#6b7280] text-[13px] leading-[20px] mt-[2px]"
              style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
            >
              Set up a new client workspace in Maestro
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-[28px] h-[28px] flex items-center justify-center rounded-[6px] border border-[#e2e5eb] hover:bg-[#f4f5f7] transition-colors flex-shrink-0 ml-[12px]"
          >
            <X size={14} className="text-[#6b7280]" />
          </button>
        </div>

        {/* ── Scrollable Body ─────────────────────────── */}
        <div className="overflow-y-auto flex-1 px-[24px] py-[20px]">

          {/* BASIC INFORMATION */}
          <p
            className="text-[#9ca3af] text-[11px] uppercase tracking-[0.8px] mb-[14px]"
            style={{ fontFamily: 'Satoshi', fontWeight: 500 }}
          >
            Basic Information
          </p>

          {/* Client name */}
          <div className="mb-[16px]">
            <Label text="Client name" required />
            <input
              type="text"
              placeholder="e.g. Beauty Co International"
              className="w-full h-[38px] px-[12px] rounded-[8px] border border-[#e2e5eb] text-[13px] text-[#1d1e2c] placeholder:text-[#c4c7cc] focus:outline-none focus:border-[#3262ff] focus:ring-1 focus:ring-[#3262ff] transition-colors"
              style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
            />
          </div>

          {/* Industry + Region */}
          <div className="grid grid-cols-2 gap-[12px] mb-[16px]">
            <div>
              <Label text="Industry" required />
              <SelectField />
            </div>
            <div>
              <Label text="Region" required />
              <SelectField />
            </div>
          </div>

          {/* Billing currency + Primary contact email */}
          <div className="grid grid-cols-2 gap-[12px] mb-[24px]">
            <div>
              <Label text="Billing currency" required />
              <SelectField />
            </div>
            <div>
              <Label text="Primary contact email" required={false} />
              <input
                type="email"
                placeholder="contact@client.com"
                className="w-full h-[38px] px-[12px] rounded-[8px] border border-[#e2e5eb] text-[13px] text-[#1d1e2c] placeholder:text-[#c4c7cc] focus:outline-none focus:border-[#3262ff] focus:ring-1 focus:ring-[#3262ff] transition-colors"
                style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
              />
            </div>
          </div>

          {/* ARCHITECTURE LEVELS */}
          <p
            className="text-[#9ca3af] text-[11px] uppercase tracking-[0.8px] mb-[6px]"
            style={{ fontFamily: 'Satoshi', fontWeight: 500 }}
          >
            Architecture Levels
          </p>
          <p
            className="text-[#6b7280] text-[12px] leading-[18px] mb-[12px]"
            style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
          >
            Define the naming structure for media plans (e.g. Market → Language → Moment)
          </p>

          {/* Level rows */}
          <div className="flex flex-col gap-[8px] mb-[10px]">
            {levels.map((level, idx) => (
              <ArchRow
                key={level.id}
                index={idx + 1}
                label={level.label}
                values={level.values}
                onLabelChange={(v) => updateLevel(level.id, 'label', v)}
                onValuesChange={(v) => updateLevel(level.id, 'values', v)}
                onRemove={() => removeLevel(level.id)}
              />
            ))}
          </div>

          {/* Add architecture level */}
          <button
            onClick={addLevel}
            className="w-full h-[38px] flex items-center justify-center gap-[6px] rounded-[8px] border border-dashed border-[#c4c7cc] text-[13px] text-[#6b7280] hover:border-[#3262ff] hover:text-[#3262ff] transition-colors"
            style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
          >
            <Plus size={14} />
            Add architecture level
          </button>
        </div>

        {/* ── Footer ─────────────────────────────────── */}
        <div className="px-[24px] py-[16px] border-t border-[#e8eaed] flex items-center justify-between flex-shrink-0">
          <p
            className="text-[#9ca3af] text-[12px]"
            style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
          >
            Fields marked with{' '}
            <span className="text-[#ef4444]">*</span>{' '}
            are required
          </p>
          <div className="flex items-center gap-[8px]">
            <button
              onClick={onClose}
              className="h-[36px] px-[18px] rounded-[8px] border border-[#e2e5eb] text-[13px] text-[#374151] hover:bg-[#f4f5f7] transition-colors"
              style={{ fontFamily: 'Satoshi', fontWeight: 500 }}
            >
              Cancel
            </button>
            <button
              className="h-[36px] px-[18px] rounded-[8px] bg-[#3262ff] text-[13px] text-white hover:bg-[#2751db] transition-colors flex items-center gap-[6px]"
              style={{
                fontFamily: 'Satoshi',
                fontWeight: 500,
                boxShadow: '0px 1px 4px 0px rgba(50,98,255,0.35)',
              }}
            >
              <Plus size={14} />
              Create client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Label ──────────────────────────────────────────────── */
function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <p
      className="text-[#1d1e2c] text-[13px] leading-[20px] mb-[6px]"
      style={{ fontFamily: 'Satoshi', fontWeight: 500 }}
    >
      {text}
      {required && <span className="text-[#ef4444] ml-[2px]">*</span>}
    </p>
  );
}

/* ── Select Field ───────────────────────────────────────── */
function SelectField() {
  return (
    <div className="relative">
      <select
        className="w-full h-[38px] px-[12px] pr-[32px] rounded-[8px] border border-[#e2e5eb] text-[13px] text-[#c4c7cc] focus:outline-none focus:border-[#3262ff] focus:ring-1 focus:ring-[#3262ff] appearance-none bg-white transition-colors cursor-pointer"
        style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
        defaultValue=""
      >
        <option value="" disabled />
      </select>
      {/* Custom chevron */}
      <div className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
          <path
            d="M1 1L6 6L11 1"
            stroke="#9CA3AF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ── Architecture Row ───────────────────────────────────── */
interface ArchRowProps {
  index: number;
  label: string;
  values: string;
  onLabelChange: (v: string) => void;
  onValuesChange: (v: string) => void;
  onRemove: () => void;
}

function ArchRow({
  index,
  label,
  values,
  onLabelChange,
  onValuesChange,
  onRemove,
}: ArchRowProps) {
  const placeholderLabels = ['Market', 'Language', 'Moment'];
  const placeholderValues = ['SG, UK, US, DE', 'EN, ES, FR', 'Q3_Launch, Easter'];

  return (
    <div className="flex items-center gap-[8px]">
      {/* Badge */}
      <div
        className="w-[28px] h-[28px] rounded-[6px] bg-[#3262ff] flex items-center justify-center flex-shrink-0"
      >
        <span
          className="text-white text-[11px] leading-none"
          style={{ fontFamily: 'Satoshi', fontWeight: 700 }}
        >
          L{index}
        </span>
      </div>

      {/* Label input */}
      <input
        type="text"
        value={label}
        onChange={(e) => onLabelChange(e.target.value)}
        placeholder={placeholderLabels[index - 1] ?? `Level ${index}`}
        className="flex-1 h-[36px] px-[10px] rounded-[6px] border border-[#e2e5eb] text-[13px] text-[#1d1e2c] placeholder:text-[#c4c7cc] focus:outline-none focus:border-[#3262ff] focus:ring-1 focus:ring-[#3262ff] transition-colors"
        style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
      />

      {/* Values input */}
      <input
        type="text"
        value={values}
        onChange={(e) => onValuesChange(e.target.value)}
        placeholder={placeholderValues[index - 1] ?? 'e.g. Value1, Value2'}
        className="flex-1 h-[36px] px-[10px] rounded-[6px] border border-[#e2e5eb] text-[13px] text-[#1d1e2c] placeholder:text-[#c4c7cc] focus:outline-none focus:border-[#3262ff] focus:ring-1 focus:ring-[#3262ff] transition-colors"
        style={{ fontFamily: 'Satoshi', fontWeight: 400 }}
      />

      {/* Delete button */}
      <button
        onClick={onRemove}
        className="w-[28px] h-[28px] flex items-center justify-center rounded-[6px] border border-[#e2e5eb] hover:border-[#f87171] hover:bg-[#fff5f5] transition-colors flex-shrink-0"
      >
        <Trash2 size={13} className="text-[#9ca3af] hover:text-[#ef4444]" />
      </button>
    </div>
  );
}
