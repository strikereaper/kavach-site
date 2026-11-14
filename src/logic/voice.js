// Demo state and values for this page's interactive parts.
// renderVals() returns the values its templates in src/templates/voice/ read.
import { DCLogic } from '../lib/dc';

export class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { prot: true, sound: 'beep' };
  }
  renderVals() {
    const s = this.state;
    const segOn = 'font: inherit; font-size: 14px; font-weight: 600; padding: 9px 14px; min-height: 40px; border: 0; border-radius: 5px; cursor: pointer; background: var(--kv-indigo); color: var(--kv-paper); transition: background-color .2s ease-out, color .2s ease-out';
    const segOff = 'font: inherit; font-size: 14px; font-weight: 500; padding: 9px 14px; min-height: 40px; border: 0; border-radius: 5px; cursor: pointer; background: transparent; color: var(--kv-ink-2); transition: background-color .2s ease-out, color .2s ease-out';
    const m = s.prot ? s.sound : 'original';
    const bars = [];
    for (let i = 0; i < 80; i++) {
      const h = 14 + Math.round(Math.abs(Math.sin(i * 1.7) * 44 + Math.cos(i * 0.6) * 24));
      const r = (i >= 22 && i <= 36) || (i >= 52 && i <= 61);
      let hh = h;
      let c = 'var(--kv-stone)';
      if (r) {
        if (m === 'original') { c = 'var(--kv-vermilion)'; }
        else if (m === 'beep') { hh = 12; c = 'var(--kv-indigo)'; }
        else if (m === 'silence') { hh = 2; c = 'var(--kv-indigo)'; }
        else { hh = Math.round(h * 0.5); c = 'var(--kv-indigo)'; }
      }
      bars.push({ style: 'flex: 1 1 0; max-width: 7px; height: ' + hh + 'px; border-radius: 3px; background: ' + c + '; transition: height .3s ease-out, background-color .3s ease-out; animation-delay: -' + ((i * 0.137) % 1.1).toFixed(2) + 's' });
    }
    const sounds = [['beep', 'Beep'], ['silence', 'Silence'], ['voice', 'Voice-over']].map((o) => ({
      label: o[1], on: s.sound === o[0], style: s.sound === o[0] ? segOn : segOff, pick: () => this.setState({ sound: o[0] })
    }));
    const spoken = { original: 'paanch shoonya ek, zero zero two three', beep: '[tone]', silence: '[silence]', voice: '“number withheld”' }[m];
    const spoken2 = { original: 'A B C P K one two three four F', beep: '[tone]', silence: '[silence]', voice: '“ID withheld”' }[m];
    const notes = {
      original: 'The raw call. Vermilion marks what Kavach detected: an account number read out in Hindi digits and a PAN spelled letter by letter.',
      beep: 'A steady tone covers each sensitive word. Listeners know something was removed and the call keeps its rhythm.',
      silence: 'The words are muted. Best for archives that will be transcribed again or fed into speech analytics.',
      voice: 'A neutral synthetic voice says what was removed, in the language of the call. Natural for listeners and for voice-bot training.'
    };
    return {
      prot: s.prot, raw: !s.prot,
      rawBtn: s.prot ? segOff : segOn, protBtn: s.prot ? segOn : segOff,
      showRaw: () => this.setState({ prot: false }),
      showProt: () => this.setState({ prot: true }),
      sounds: sounds, bars: bars, spoken: spoken, spoken2: spoken2, note: notes[m],
      spanStyle: s.prot ? 'background: var(--kv-indigo); color: var(--kv-khadi); padding: 3px 9px; border-radius: 3px; font-family: "JetBrains Mono Variable", monospace; font-size: 15px; white-space: nowrap' : 'background: rgba(194, 65, 12, 0.12); border-bottom: 2px solid var(--kv-vermilion); padding: 0 3px'
    };
  }
}
