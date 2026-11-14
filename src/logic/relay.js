// Demo state and values for this page's interactive parts.
// renderVals() returns the values its templates in src/templates/relay/ read.
import { DCLogic } from '../lib/dc';

export class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { dest: 'llm' };
  }
  renderVals() {
    const d = this.state.dest;
    const segOn = 'font: inherit; font-size: 14px; font-weight: 600; padding: 9px 14px; min-height: 40px; border: 0; border-radius: 5px; cursor: pointer; background: var(--kv-indigo); color: var(--kv-paper); transition: background-color .2s ease-out, color .2s ease-out';
    const segOff = 'font: inherit; font-size: 14px; font-weight: 500; padding: 9px 14px; min-height: 40px; border: 0; border-radius: 5px; cursor: pointer; background: transparent; color: var(--kv-ink-2); transition: background-color .2s ease-out, color .2s ease-out';
    const dests = [['llm', 'Frontier LLM'], ['mcp', 'Calendar tool'], ['partner', 'Insurer’s agent'], ['audit', 'Audit log']].map((x) => ({
      label: x[1], on: d === x[0], style: d === x[0] ? segOn : segOff, pick: () => this.setState({ dest: x[0] })
    }));
    const plain = '';
    const tok = 'background: var(--kv-indigo); color: var(--kv-khadi); padding: 2px 7px; border-radius: 3px; font-family: "JetBrains Mono Variable", monospace; font-size: 15px';
    const gone = 'background: var(--kv-line); color: var(--kv-ink-2); padding: 2px 7px; border-radius: 3px; font-family: "JetBrains Mono Variable", monospace; font-size: 15px; text-decoration: line-through';
    const kept = 'border-bottom: 2px dotted var(--kv-indigo)';
    const T = (t, st) => ({ text: t, style: st });
    const msgs = {
      llm: [T('Book a follow-up for ', plain), T('PERSON_1', tok), T(' (PAN ', plain), T('PAN_1', tok), T(', phone ', plain), T('PHONE_1', tok), T(') at the Whitefield branch on Friday. His policy ', plain), T('POLICY_1', tok), T(' renews next month.', plain)],
      mcp: [T('Book a follow-up for ', plain), T('Rohit Sharma', kept), T(' (PAN ', plain), T('removed', gone), T(', phone ', plain), T('98860 22113', kept), T(') at the Whitefield branch on Friday. His policy ', plain), T('POLICY_1', tok), T(' renews next month.', plain)],
      partner: [T('Book a follow-up for ', plain), T('removed', gone), T(' (PAN ', plain), T('removed', gone), T(', phone ', plain), T('removed', gone), T(') at the Whitefield branch on Friday. His policy ', plain), T('HX-55120-90011', kept), T(' renews next month.', plain)],
      audit: [T('2026-11-14T12:41:07Z  agent=support-bot  dest=frontier-llm  entities: PERSON×1, PAN×1, PHONE×1, POLICY×1  action=pseudonymise  restored=true', 'font-family: "JetBrains Mono Variable", monospace; font-size: 14px; color: var(--kv-ink-2)')]
    };
    const titles = { llm: 'what the frontier LLM receives', mcp: 'what your internal calendar tool receives', partner: 'what the insurer’s agent receives', audit: 'what lands in your audit log' };
    const notes = {
      llm: 'Everything personal becomes a reversible token. The model plans the booking, and Relay restores the real values in its reply.',
      mcp: 'A trusted internal tool needs the name and phone to book, so policy lets them through (dotted underline). The PAN is never needed, so it is dropped.',
      partner: 'The insurer needs the policy number and nothing else about the customer. Removed values cannot be restored on their side.',
      audit: 'A record of what crossed, where, and what was done to it. The values themselves are never written down.'
    };
    return { dests: dests, segs: msgs[d], destTitle: titles[d], destNote: notes[d] };
  }
}
