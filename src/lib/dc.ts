/**
 * A very small template runtime for the interactive demos.
 *
 * Templates live in src/templates/<page>/<name>.html and use three things:
 *   {{ path }}                         a value from renderVals(), HTML-escaped
 *   <sc-for list="{{ xs }}" as="x">    repeat for each item, with {{ x.field }} inside
 *   <sc-if value="{{ flag }}">         render only when the value is truthy
 *   onClick="{{ handler }}"            call a function from renderVals() on click
 *
 * Each page has a logic class in src/logic/<page>.js. Its renderVals() returns
 * the values the templates read. At build time every template is rendered to
 * static HTML (good for search engines and first paint). In the browser, mount()
 * re-renders the elements marked data-island="<name>" whenever setState() runs.
 */

type Node = string | { kind: 'for' | 'if'; path: string; as?: string; children: Node[] };
type Handler = () => void;

export class DCLogic {
  props: Record<string, unknown>;
  state: Record<string, unknown> = {};
  constructor(props: Record<string, unknown> = {}) {
    this.props = props;
  }
  setState(patch: Record<string, unknown>) {
    Object.assign(this.state, patch);
  }
  renderVals(): Record<string, unknown> {
    return {};
  }
}

const BLOCK = /<(\/?)sc-(for|if)\b([^>]*)>/g;

export function parse(src: string): Node[] {
  const root: Node[] = [];
  const stack: { children: Node[] }[] = [{ children: root }];
  let last = 0;
  BLOCK.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = BLOCK.exec(src))) {
    const top = stack[stack.length - 1];
    if (m.index > last) top.children.push(src.slice(last, m.index));
    last = BLOCK.lastIndex;
    if (m[1]) {
      stack.pop();
      continue;
    }
    const attrs = m[3];
    const hole = (name: string) => (attrs.match(new RegExp(name + '="\\{\\{\\s*([^}]+?)\\s*\\}\\}"')) || [])[1] || '';
    const node =
      m[2] === 'for'
        ? { kind: 'for' as const, path: hole('list'), as: (attrs.match(/as="(\w+)"/) || [])[1], children: [] as Node[] }
        : { kind: 'if' as const, path: hole('value'), children: [] as Node[] };
    top.children.push(node);
    stack.push(node);
  }
  stack[stack.length - 1].children.push(src.slice(last));
  return root;
}

const escapeHtml = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function lookup(scope: any, path: string): any {
  if (path === 'true') return true;
  if (path === 'false') return false;
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), scope);
}

function fill(text: string, scope: any, register: (fn: Handler) => number) {
  return text
    .replace(/onClick="\{\{\s*([^}]+?)\s*\}\}"/g, (_, p) => `data-h="${register(lookup(scope, p))}"`)
    .replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, p) => escapeHtml(lookup(scope, p)));
}

export function render(nodes: Node[], scope: any, register: (fn: Handler) => number): string {
  return nodes
    .map((n) => {
      if (typeof n === 'string') return fill(n, scope, register);
      const value = lookup(scope, n.path);
      if (n.kind === 'if') return value ? render(n.children, scope, register) : '';
      return ((value as unknown[]) || [])
        .map((item) => render(n.children, Object.assign(Object.create(scope), { [n.as as string]: item }), register))
        .join('');
    })
    .join('');
}

const nameOf = (key: string) => key.replace(/^.*\//, '').replace(/\.html$/, '');

/** Build time: render every template of a page to plain HTML. */
export function renderAll(component: DCLogic, templates: Record<string, string>) {
  const values = component.renderVals();
  const out: Record<string, string> = {};
  for (const [key, src] of Object.entries(templates)) out[nameOf(key)] = render(parse(src), values, () => -1);
  return out;
}

/** Browser: wire up clicks and re-render the islands when state changes. */
export function mount(component: DCLogic, templates: Record<string, string>) {
  const parsed: Record<string, Node[]> = {};
  for (const [key, src] of Object.entries(templates)) parsed[nameOf(key)] = parse(src);
  const islands = Array.from(document.querySelectorAll<HTMLElement>('[data-island]'));
  let handlers: Handler[] = [];

  const draw = () => {
    const active = document.activeElement as HTMLElement | null;
    const activeIndex = active?.getAttribute('data-h');
    const activeIsland = active?.closest('[data-island]')?.getAttribute('data-island');
    handlers = [];
    const register = (fn: Handler) => (handlers.push(fn), handlers.length - 1);
    const values = component.renderVals();
    for (const el of islands) {
      const nodes = parsed[el.dataset.island as string];
      if (nodes) el.innerHTML = render(nodes, values, register);
    }
    if (activeIndex != null && activeIsland) {
      document.querySelector<HTMLElement>(`[data-island="${activeIsland}"] [data-h="${activeIndex}"]`)?.focus();
    }
  };

  component.setState = (patch) => {
    Object.assign(component.state, patch);
    draw();
  };
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-island] [data-h]');
    if (!target) return;
    const fn = handlers[Number(target.dataset.h)];
    if (typeof fn === 'function') {
      e.preventDefault();
      fn();
    }
  });
  draw();
}
