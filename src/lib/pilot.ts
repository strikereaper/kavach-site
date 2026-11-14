import { config } from '../config';

/** Pilot booking form: choice buttons, submit to an endpoint or fall back to email. */
export function initPilotForm() {
  const form = document.getElementById('pilot-form') as HTMLFormElement | null;
  const done = document.getElementById('pilot-done');
  const doneText = document.getElementById('pilot-done-text');
  const error = document.getElementById('pilot-error');
  if (!form || !done) return;

  let need = 'AI agent and LLM traffic';
  form.querySelectorAll<HTMLButtonElement>('.kv-choice').forEach((btn) => {
    btn.addEventListener('click', () => {
      need = btn.dataset.need || need;
      form.querySelectorAll('.kv-choice').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    });
  });

  const show = (sent: boolean) => {
    form.hidden = sent;
    done.hidden = !sent;
    done.style.display = sent ? 'flex' : 'none';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (error) error.hidden = true;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const payload = { ...data, need };

    if (config.formEndpoint) {
      try {
        const res = await fetch(config.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
      } catch {
        if (error) error.hidden = false;
        return;
      }
    } else {
      const body = `Name: ${payload.name}\nWork email: ${payload.email}\nCompany: ${payload.company}\nNeeds: ${need}`;
      window.location.href = `mailto:${config.contactEmail}?subject=${encodeURIComponent('Kavach pilot request')}&body=${encodeURIComponent(body)}`;
    }
    if (doneText) doneText.textContent = `We’ll write to ${payload.email} to plan the install. Pilot scope: ${need.toLowerCase()}.`;
    show(true);
  });

  document.getElementById('pilot-reset')?.addEventListener('click', () => show(false));
}
