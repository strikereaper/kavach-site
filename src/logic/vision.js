// Demo state and values for this page's interactive parts.
// renderVals() returns the values its templates in src/templates/vision/ read.
import { DCLogic } from '../lib/dc';

export class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { doc: 'id', prot: true };
  }
  renderVals() {
    const s = this.state;
    const segOn = 'font: inherit; font-size: 14px; font-weight: 600; padding: 9px 14px; min-height: 40px; border: 0; border-radius: 5px; cursor: pointer; background: var(--kv-indigo); color: var(--kv-paper); transition: background-color .2s ease-out, color .2s ease-out';
    const segOff = 'font: inherit; font-size: 14px; font-weight: 500; padding: 9px 14px; min-height: 40px; border: 0; border-radius: 5px; cursor: pointer; background: transparent; color: var(--kv-ink-2); transition: background-color .2s ease-out, color .2s ease-out';
    const docs = [['id', 'ID card'], ['cheque', 'Cheque'], ['rx', 'Prescription']].map((d) => ({
      label: d[1], on: s.doc === d[0], style: s.doc === d[0] ? segOn : segOff, pick: () => this.setState({ doc: d[0] })
    }));
    const p = s.prot;
    const t = '; transition: background-color .3s ease-out, color .3s ease-out';
    const found = 'background: rgba(194, 65, 12, 0.12); border-bottom: 2px solid var(--kv-vermilion); padding: 0 2px' + t;
    const box = 'background: var(--kv-indigo); color: transparent; border-radius: 2px; padding: 0 4px' + t;
    const f = p ? box : found;
    const idLast4 = p ? 'background: transparent; color: var(--kv-ink)' + t : found;
    const notes = {
      id: p ? 'Photo blurred, name and date of birth boxed, QR code covered. The ID number keeps its last four digits.' : 'A sample identity card in Hindi and English. Vermilion marks what Vision detected.',
      cheque: p ? 'Payee, account number, signature and MICR line covered. Amount and date stay readable for reconciliation.' : 'A sample cheque image from a payments archive.',
      rx: p ? 'Patient name, phone and ABHA ID covered. Medicines and dosage stay intact for clinical review.' : 'A sample prescription from a clinic.'
    };
    return {
      docs: docs,
      isId: s.doc === 'id', isCheque: s.doc === 'cheque', isRx: s.doc === 'rx',
      prot: p, raw: !p,
      rawBtn: p ? segOff : segOn, protBtn: p ? segOn : segOff,
      showRaw: () => this.setState({ prot: false }),
      showProt: () => this.setState({ prot: true }),
      f1: f, f2: f, f3: s.doc === 'id' ? idLast4 : f,
      idNum: p ? 'XXXX XXXX 4417' : '5821 0937 4417',
      photo: 'flex: 0 0 96px; height: 116px; border-radius: 4px; ' + (p ? 'background: repeating-linear-gradient(45deg, var(--kv-indigo) 0 8px, #2E3C7E 8px 16px)' : 'background: radial-gradient(circle at 50% 38%, #C89F7E 0 22px, transparent 23px), radial-gradient(ellipse at 50% 100%, #556B8D 0 44px, transparent 45px), #D9D3C6; outline: 2px solid var(--kv-vermilion); outline-offset: 2px'),
      qr: 'flex: 0 0 72px; height: 72px; border-radius: 3px; align-self: flex-end; ' + (p ? 'background: var(--kv-indigo)' : 'background: repeating-linear-gradient(90deg, var(--kv-ink) 0 5px, #FDFCF8 5px 9px); outline: 2px solid var(--kv-vermilion); outline-offset: 2px'),
      sign: p ? 'display: inline-block; width: 110px; height: 24px; background: var(--kv-indigo); border-radius: 2px; color: transparent; overflow: hidden' : 'font-family: cursive; font-size: 19px; color: #1F3A8A; border-bottom: 2px solid var(--kv-vermilion)',
      docNote: notes[s.doc]
    };
  }
}
