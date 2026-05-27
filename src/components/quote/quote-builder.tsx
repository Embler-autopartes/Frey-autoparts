'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useQuote, type QuoteItem } from '@/lib/quote-context';
import { Plus, Trash2, Send, Eraser, CheckCircle2, ArrowUpRight } from 'lucide-react';

const RECIPIENT = 'info@frey-autoparts.com';

type Customer = {
  company: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  vin: string;
  comments: string;
};

const emptyCustomer: Customer = {
  company: '',
  name: '',
  email: '',
  phone: '',
  country: '',
  vin: '',
  comments: '',
};

export function QuoteBuilder() {
  const t = useTranslations('quote');
  const { items, hydrated, add, remove, updateQty, clear } = useQuote();
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [submitInfo, setSubmitInfo] = useState<{ ok: boolean; msg: string } | null>(null);

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const partNumber = String(data.get('partNumber') || '').trim();
    const description = String(data.get('description') || '').trim();
    const brand = String(data.get('brand') || '').trim();
    const qty = Math.max(1, Number(data.get('qty')) || 1);
    const notes = String(data.get('notes') || '').trim();

    if (!partNumber && !description) {
      setSubmitInfo({ ok: false, msg: t('addPart.errorRequired') });
      return;
    }
    add({ partNumber, description, brand, qty, notes });
    form.reset();
    (form.querySelector('input[name="qty"]') as HTMLInputElement | null)?.setAttribute(
      'value',
      '1',
    );
    setSubmitInfo(null);
  }

  function onSubmit() {
    if (items.length === 0) {
      setSubmitInfo({ ok: false, msg: t('submit.emptyMessage') });
      return;
    }
    if (!customer.company || !customer.name || !customer.email) {
      setSubmitInfo({ ok: false, msg: t('submit.noCustomer') });
      return;
    }
    const subject = `[FREY Quote] ${customer.company} — ${items.length} parts`;
    const body = buildMailBody(items, customer);
    const url = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSubmitInfo({ ok: true, msg: t('submit.sentBody') });
  }

  return (
    <div className="space-y-10">
      {/* Add part form */}
      <Card title={t('addPart.title')} step="01">
        <form onSubmit={onAdd} className="grid gap-4 sm:grid-cols-12">
          <Field
            className="sm:col-span-4"
            name="partNumber"
            label={t('addPart.partNumber')}
            placeholder={t('addPart.partNumberPh')}
          />
          <Field
            className="sm:col-span-5"
            name="description"
            label={t('addPart.description')}
            placeholder={t('addPart.descriptionPh')}
          />
          <Field
            className="sm:col-span-2"
            name="brand"
            label={t('addPart.brand')}
            placeholder={t('addPart.brandPh')}
          />
          <Field
            className="sm:col-span-1"
            name="qty"
            label={t('addPart.qty')}
            type="number"
            min={1}
            defaultValue="1"
          />
          <Field
            className="sm:col-span-9"
            name="notes"
            label={t('addPart.notes')}
            placeholder={t('addPart.notesPh')}
          />
          <div className="flex items-end sm:col-span-3">
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 border border-acid-2 bg-acid-2 px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white transition-all hover:bg-acid-3"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
              {t('addPart.add')}
            </button>
          </div>
        </form>
      </Card>

      {/* List */}
      <Card
        title={t('list.title')}
        step="02"
        right={
          items.length > 0 ? (
            <div className="flex items-center gap-4 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-1">
              <span>
                {t('list.count', { n: items.length })}
              </span>
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1.5 text-mist-2 transition-colors hover:text-acid-2"
              >
                <Eraser className="h-3 w-3" />
                {t('list.clear')}
              </button>
            </div>
          ) : null
        }
      >
        {!hydrated ? (
          <div className="h-12 animate-pulse rounded bg-ink-2/60" />
        ) : items.length === 0 ? (
          <p className="border-dashed border border-ink-4 bg-ink-3 px-6 py-12 text-center text-sm text-mist-2">
            {t('list.empty')}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-1">
                  <th className="px-3 py-3 text-left">{t('list.colPart')}</th>
                  <th className="px-3 py-3 text-left">{t('list.colBrand')}</th>
                  <th className="px-3 py-3 text-left">{t('list.colNotes')}</th>
                  <th className="px-3 py-3 text-right">{t('list.colQty')}</th>
                  <th className="px-3 py-3 text-right" />
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-b border-ink-4/70 last:border-0">
                    <td className="px-3 py-4 align-top">
                      {it.partNumber && (
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-mist-3">
                          {it.partNumber}
                        </p>
                      )}
                      {it.description && (
                        <p className="mt-1 text-sm text-mist-4">{it.description}</p>
                      )}
                    </td>
                    <td className="px-3 py-4 align-top text-sm text-mist-2">
                      {it.brand || '—'}
                    </td>
                    <td className="px-3 py-4 align-top text-sm text-mist-2">
                      {it.notes || '—'}
                    </td>
                    <td className="px-3 py-4 align-top text-right">
                      <input
                        type="number"
                        min={1}
                        value={it.qty}
                        onChange={(e) =>
                          updateQty(it.id, Number(e.target.value) || 1)
                        }
                        className="w-20 border border-ink-4 bg-ink-3 px-3 py-2 text-right font-mono text-sm text-mist-4 focus:border-acid-2 focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-4 align-top text-right">
                      <button
                        type="button"
                        onClick={() => remove(it.id)}
                        aria-label={t('list.remove')}
                        className="inline-flex h-9 w-9 items-center justify-center text-mist-1 transition-colors hover:text-acid-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Customer info */}
      <Card title={t('customer.title')} step="03" subtitle={t('customer.subtitle')}>
        <div className="grid gap-4 sm:grid-cols-2">
          <ControlledField
            label={t('customer.company')}
            value={customer.company}
            onChange={(v) => setCustomer({ ...customer, company: v })}
          />
          <ControlledField
            label={t('customer.name')}
            value={customer.name}
            onChange={(v) => setCustomer({ ...customer, name: v })}
          />
          <ControlledField
            label={t('customer.email')}
            type="email"
            value={customer.email}
            onChange={(v) => setCustomer({ ...customer, email: v })}
          />
          <ControlledField
            label={t('customer.phone')}
            value={customer.phone}
            onChange={(v) => setCustomer({ ...customer, phone: v })}
          />
          <ControlledField
            label={t('customer.country')}
            value={customer.country}
            onChange={(v) => setCustomer({ ...customer, country: v })}
          />
          <ControlledField
            label={t('customer.vin')}
            placeholder={t('customer.vinPh')}
            value={customer.vin}
            onChange={(v) => setCustomer({ ...customer, vin: v })}
          />
          <div className="sm:col-span-2">
            <label className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-1">
              {t('customer.comments')}
            </label>
            <textarea
              rows={4}
              value={customer.comments}
              placeholder={t('customer.commentsPh')}
              onChange={(e) =>
                setCustomer({ ...customer, comments: e.target.value })
              }
              className="mt-2 w-full resize-none border border-ink-4 bg-ink-3 px-4 py-3 text-sm text-mist-4 focus:border-acid-2 focus:outline-none"
            />
          </div>
        </div>
      </Card>

      {/* Submit */}
      <Card title={t('submit.title')} step="04" subtitle={t('submit.subtitle')}>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onSubmit}
            className="group inline-flex items-center gap-3 border border-acid-2 bg-acid-2 px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition-all hover:bg-acid-3"
          >
            <Send className="h-4 w-4" strokeWidth={2.4} />
            {t('submit.button')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.4} />
          </button>

          {submitInfo && (
            <div
              className={`flex items-start gap-2 border px-4 py-3 text-sm ${
                submitInfo.ok
                  ? 'border-acid-2/50 bg-acid-2/10 text-acid-2'
                  : 'border-amber-1/50 bg-amber-1/10 text-amber-1'
              }`}
            >
              {submitInfo.ok && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
              <span>{submitInfo.msg}</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ---------------- helpers ---------------- */

function Card({
  title,
  subtitle,
  step,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  step: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="relative border border-ink-4 bg-ink-3 p-8 lg:p-10">
      <header className="mb-8 flex flex-col gap-3 border-b border-ink-4 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-5xl text-acid-2/40">{step}</span>
          <div>
            <h2 className="font-display text-2xl uppercase tracking-tight text-mist-4 sm:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 max-w-xl text-sm text-mist-2">{subtitle}</p>
            )}
          </div>
        </div>
        {right}
      </header>
      {children}
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = 'text',
  min,
  defaultValue,
  className = '',
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  min?: number;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        min={min}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-2 w-full border border-ink-4 bg-ink-1 px-4 py-3 text-sm text-mist-4 placeholder:text-mist-1 focus:border-acid-2 focus:outline-none"
      />
    </div>
  );
}

function ControlledField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-ink-4 bg-ink-1 px-4 py-3 text-sm text-mist-4 placeholder:text-mist-1 focus:border-acid-2 focus:outline-none"
      />
    </div>
  );
}

function buildMailBody(items: QuoteItem[], c: Customer) {
  const sep = '\n----------------------------------------\n';
  const parts = items
    .map(
      (it, i) =>
        `${String(i + 1).padStart(2, '0')}. ${it.partNumber || '—'}
    Descripcion: ${it.description || '—'}
    Marca:       ${it.brand || '—'}
    Cantidad:    ${it.qty}
    Notas:       ${it.notes || '—'}`,
    )
    .join('\n\n');
  return `FREY · Solicitud de cotizacion B2B${sep}DATOS DEL SOLICITANTE
Empresa:     ${c.company}
Contacto:    ${c.name}
Correo:      ${c.email}
Telefono:    ${c.phone || '—'}
Pais:        ${c.country || '—'}
VIN:         ${c.vin || '—'}
${sep}LISTA DE PIEZAS (${items.length})

${parts}
${sep}COMENTARIOS
${c.comments || '—'}
${sep}Generado desde frey-autoparts.com / ${new Date().toISOString()}`;
}
