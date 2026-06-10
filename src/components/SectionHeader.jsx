import Reveal from './Reveal';

export default function SectionHeader({ eyebrow, title, lead, align = 'center', dark = false }) {
  const alignCls = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto';
  return (
    <Reveal className={`mb-12 flex max-w-3xl flex-col gap-4 sm:mb-16 ${alignCls}`}>
      {eyebrow && (
        <p className={`eyebrow ${dark ? 'text-gold-soft' : ''}`}>
          <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-gold-soft/60' : 'bg-leaf/50'}`} />
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl font-extrabold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${dark ? 'text-cream' : 'text-forest-dark'}`}>
        {title}
      </h2>
      {lead && (
        <p className={`text-base leading-relaxed sm:text-lg ${dark ? 'text-cream/70' : 'text-ink-soft'}`}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
