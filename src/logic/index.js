// Demo state and values for this page's interactive parts.
// renderVals() returns the values its templates in src/templates/index/ read.
import { DCLogic } from '../lib/dc';
import { useCases } from '../data/usecases.js';
import { benchmark } from '../data/benchmark.js';
import { languages } from '../data/languages.js';

export class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { lang: 'hi', langProt: true, uc: 'all' };
  }
  renderVals() {
    const s = this.state;
    const segOn = 'font: inherit; font-size: 14px; font-weight: 600; padding: 9px 14px; min-height: 40px; border: 0; border-radius: 5px; cursor: pointer; background: var(--kv-indigo); color: var(--kv-paper); transition: background-color .2s ease-out, color .2s ease-out';
    const segOff = 'font: inherit; font-size: 14px; font-weight: 500; padding: 9px 14px; min-height: 40px; border: 0; border-radius: 5px; cursor: pointer; background: transparent; color: var(--kv-ink-2); transition: background-color .2s ease-out, color .2s ease-out';
    const ucOn = 'font: inherit; font-size: 14px; font-weight: 600; padding: 9px 14px; min-height: 40px; border: 0; border-radius: 5px; cursor: pointer; background: var(--kv-indigo); color: var(--kv-paper); transition: background-color .2s ease-out, color .2s ease-out';
    const ucOff = 'font: inherit; font-size: 14px; font-weight: 500; padding: 9px 14px; min-height: 40px; border: 0; border-radius: 5px; cursor: pointer; background: transparent; color: var(--kv-ink-2); transition: background-color .2s ease-out, color .2s ease-out';
    const tagName = { relay: 'Relay · AI agents', voice: 'Voice · audio', vision: 'Vision · documents', core: 'Core · text and data' };
    const all = useCases;
    const uf = s.uc || 'all';
    const cases = all.filter((c) => uf === 'all' || c[0] === uf).map((c) => ({ tag: tagName[c[0]], title: c[1], body: c[2] }));
    const filters = [['all', 'All ' + all.length], ['relay', 'AI agents'], ['voice', 'Voice'], ['vision', 'Vision'], ['core', 'Core']].map((f) => ({
      label: f[1], on: uf === f[0], style: uf === f[0] ? ucOn : ucOff, pick: () => this.setState({ uc: f[0] })
    }));
    const H = [18,30,44,26,52,38,22,48,58,34,28,50,42,20,36,54,40,30,46,56,36,50,42,58,30,48,38,24,34,50,28,44,20,36,52,32,42,54,34,48,30,56,40,26,44,50,34,22,38,46,28,42,32,18,26,14];
    const wave = H.map((h, i) => {
      const r = (i >= 14 && i <= 22) || (i >= 31 && i <= 37);
      return { style: 'flex: 1 1 0; max-width: 6px; height: ' + (r ? 8 : h) + 'px; border-radius: 3px; background: ' + (r ? 'var(--kv-indigo)' : 'var(--kv-stone)') + '; animation-delay: -' + ((i * 0.137) % 1.1).toFixed(2) + 's' };
    });
    const mini = H.slice(0, 30).map((h, i) => {
      const r = i >= 11 && i <= 18;
      return { style: 'display: block; flex: 1 1 0; height: ' + (r ? 6 : Math.round(h * 0.8)) + 'px; border-radius: 2px; background: ' + (r ? 'var(--kv-indigo)' : 'var(--kv-stone)') + '; animation-delay: -' + ((i * 0.19) % 1.1).toFixed(2) + 's' };
    });
    const rows = benchmark;
    const bench = rows.map((r) => ({
      name: r[0], all: r[1].toFixed(1), indic: r[2], fa: r[3],
      nameStyle: 'text-align: left; padding: 16px 12px 16px 0; border-bottom: 1px solid var(--kv-line); font-weight: ' + (r[4] ? '700; color: var(--kv-indigo)' : '500; color: var(--kv-ink)'),
      barStyle: 'width: ' + r[1] + '%; height: 10px; transform-origin: 0 50%; background: ' + (r[4] ? 'var(--kv-indigo)' : '#9C9585')
    }));
    const L = languages;
    const lBase = 'font: inherit; display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 10px 12px; min-height: 64px; border-radius: 6px; cursor: pointer; text-align: left; transition: background-color .2s ease-out, border-color .2s ease-out, color .2s ease-out; ';
    const langs = L.map((l) => {
      const on = s.lang === l[0];
      return {
        native: l[1], en: l[2], on: on,
        style: lBase + (on ? 'background: var(--kv-indigo); color: var(--kv-paper); border: 1px solid var(--kv-indigo)' : 'background: var(--kv-paper); color: var(--kv-ink); border: 1px solid var(--kv-line)'),
        subStyle: 'font-size: 13px; color: ' + (on ? 'var(--kv-on-dark-2)' : 'var(--kv-muted)'),
        pick: () => this.setState({ lang: l[0] })
      };
    });
    const cur = L.find((l) => l[0] === s.lang) || L[0];
    const sample = cur[3].map((p) => {
      if (typeof p === 'string') return { text: p, style: '' };
      if (s.langProt) return { text: p[1], style: 'background: var(--kv-indigo); color: var(--kv-khadi); padding: 3px 9px; border-radius: 3px; font-family: "JetBrains Mono Variable", monospace; font-size: 17px; white-space: nowrap' };
      return { text: p[0], style: 'background: rgba(194, 65, 12, 0.12); border-bottom: 2px solid var(--kv-vermilion); padding: 0 3px' };
    });
    return {
      cases: cases, filters: filters, wave: wave, mini: mini, bench: bench, langs: langs, sample: sample,
      sampleDir: cur[0] === 'ur' ? 'rtl' : 'ltr',
      langLabel: cur[2] === cur[1] ? cur[2] : cur[2] + ' · ' + cur[1],
      langRaw: !s.langProt, langProt: s.langProt,
      langRawBtn: s.langProt ? segOff : segOn, langProtBtn: s.langProt ? segOn : segOff,
      langNote: s.langProt ? 'Indigo marks what Kavach masked. Tokens stay consistent, so PERSON_1 is the same person everywhere it appears.' : 'Vermilion marks the PII Kavach detected in the original text.',
      showLangRaw: () => this.setState({ langProt: false }),
      showLangProt: () => this.setState({ langProt: true })
    };
  }
}
