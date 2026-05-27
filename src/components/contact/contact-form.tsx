'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2 } from 'lucide-react';

const RECIPIENT = 'info@frey-autoparts.com';

const subjects = ['quote', 'distributor', 'warranty', 'tech', 'other'] as const;
type SubjectKey = (typeof subjects)[number];

type Data = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  subject: SubjectKey;
  message: string;
};

const empty: Data = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  subject: 'quote',
  message: '',
};

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [data, setData] = useState<Data>(empty);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data.name || !data.email || !data.message) {
      setStatus({ ok: false, msg: t('errorRequired') });
      return;
    }
    const subjectLabel = t(`subjects.${data.subject}`);
    const subject = `[FREY Contact] ${subjectLabel} — ${data.company || data.name}`;
    const body = buildBody(data, subjectLabel);
    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ ok: true, msg: t('sent') });
  }

  return (
    <form onSubmit={handle} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={t('name')}
          value={data.name}
          onChange={(v) => setData({ ...data, name: v })}
        />
        <Field
          label={t('company')}
          value={data.company}
          onChange={(v) => setData({ ...data, company: v })}
        />
        <Field
          label={t('email')}
          type="email"
          value={data.email}
          onChange={(v) => setData({ ...data, email: v })}
        />
        <Field
          label={t('phone')}
          value={data.phone}
          onChange={(v) => setData({ ...data, phone: v })}
        />
        <Field
          label={t('country')}
          value={data.country}
          onChange={(v) => setData({ ...data, country: v })}
        />
        <div>
          <label className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-1">
            {t('subject')}
          </label>
          <select
            value={data.subject}
            onChange={(e) => setData({ ...data, subject: e.target.value as SubjectKey })}
            className="mt-2 w-full border border-ink-4 bg-ink-1 px-4 py-3 text-sm text-mist-4 focus:border-acid-2 focus:outline-none"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {t(`subjects.${s}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-1">
          {t('message')}
        </label>
        <textarea
          rows={6}
          value={data.message}
          placeholder={t('messagePh')}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          className="mt-2 w-full resize-none border border-ink-4 bg-ink-1 px-4 py-3 text-sm text-mist-4 placeholder:text-mist-1 focus:border-acid-2 focus:outline-none"
        />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex items-center gap-3 border border-acid-2 bg-acid-2 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition-all hover:bg-acid-3"
        >
          <Send className="h-4 w-4" strokeWidth={2.4} />
          {t('submit')}
        </button>

        {status && (
          <div
            className={`flex items-start gap-2 border px-4 py-3 text-sm ${
              status.ok
                ? 'border-acid-2/50 bg-acid-2/10 text-acid-2'
                : 'border-amber-1/50 bg-amber-1/10 text-amber-1'
            }`}
          >
            {status.ok && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
            <span>{status.msg}</span>
          </div>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
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
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-ink-4 bg-ink-1 px-4 py-3 text-sm text-mist-4 placeholder:text-mist-1 focus:border-acid-2 focus:outline-none"
      />
    </div>
  );
}

function buildBody(d: Data, subjectLabel: string) {
  const sep = '\n----------------------------------------\n';
  return `FREY · Mensaje de contacto B2B${sep}DATOS DEL SOLICITANTE
Nombre:    ${d.name}
Empresa:   ${d.company || '—'}
Correo:    ${d.email}
Telefono:  ${d.phone || '—'}
Pais:      ${d.country || '—'}
Asunto:    ${subjectLabel}
${sep}MENSAJE
${d.message}
${sep}Generado desde frey-autoparts.com / ${new Date().toISOString()}`;
}
