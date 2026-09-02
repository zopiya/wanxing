/*
 * Page-local behaviour for the archetype-E component contract finder.
 * The finder deliberately reads the published kit/wenxin.json contract instead
 * of carrying a hand-maintained demo dataset. It is not a reusable component
 * runtime: adopting a wx-tool still means supplying domain data and behaviour.
 */

const contractUrl = new URL("../../kit/wenxin.json", import.meta.url);

export function flattenContracts(bundle) {
  const families = Array.isArray(bundle?.components) ? bundle.components : [];
  return families.flatMap(({ family, slug, items }) => {
    if (!Array.isArray(items)) return [];
    return items.map((item) => {
      const classes = Array.isArray(item.classes) ? item.classes.map(String) : [];
      const contract = {
        family: String(family ?? ""),
        slug: String(slug ?? ""),
        name: String(item.name ?? ""),
        classes,
        base: String(item.base ?? ""),
        state: String(item.state ?? ""),
        behaviour: String(item.behaviour ?? ""),
      };
      return {
        ...contract,
        searchText: [
          contract.family,
          contract.name,
          contract.classes.join(" "),
          contract.base,
          contract.state,
          contract.behaviour,
        ].join("\n").toLocaleLowerCase("zh-CN"),
      };
    });
  });
}

export function filterContracts(contracts, value) {
  const terms = String(value ?? "").trim().toLocaleLowerCase("zh-CN").split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return contracts.filter((contract) => terms.every((term) => contract.searchText.includes(term)));
}

export function initComponentFinder(root) {
  const form = root.querySelector("[data-component-finder-form]");
  const input = root.querySelector("[data-component-finder-query]");
  const submit = root.querySelector("[data-component-finder-submit]");
  const inputError = root.querySelector("[data-component-finder-error]");
  const status = root.querySelector("[data-component-finder-status]");
  const result = root.querySelector("[data-component-finder-output]");
  const idle = root.querySelector("[data-component-finder-idle]");
  const list = root.querySelector("[data-component-finder-list]");
  const empty = root.querySelector("[data-component-finder-empty]");
  const failure = root.querySelector("[data-component-finder-failure]");
  const reset = root.querySelector("[data-component-finder-reset]");
  const retry = root.querySelector("[data-component-finder-retry]");

  if (!form || !input || !submit || !inputError || !status || !result || !idle || !list || !empty || !failure) return;

  let contracts = null;
  let controller = null;
  let touched = false;

  function setStatus(message) {
    status.textContent = message;
    status.hidden = !message;
  }

  function setPending(pending) {
    result.setAttribute("aria-busy", String(pending));
    submit.disabled = pending;
    submit.textContent = pending ? "正在查询…" : "查询";
  }

  function clearInputError() {
    input.removeAttribute("aria-invalid");
    inputError.hidden = true;
  }

  function showInputError() {
    input.setAttribute("aria-invalid", "true");
    inputError.hidden = false;
    inputError.textContent = "请输入一个查询关键词。";
  }

  function clearOutput() {
    idle.hidden = true;
    list.hidden = true;
    empty.hidden = true;
    failure.hidden = true;
    list.replaceChildren();
  }

  function showIdle(message = "输入关键词后开始查询。") {
    clearOutput();
    idle.textContent = message;
    idle.hidden = false;
  }

  function cancelActiveRequest() {
    if (controller) controller.abort();
    controller = null;
    setPending(false);
  }

  function currentQuery({ focus = false } = {}) {
    const query = input.value.trim();
    if (query) {
      clearInputError();
      return query;
    }
    showInputError();
    if (focus) input.focus();
    return null;
  }

  async function loadContracts(signal) {
    if (contracts) return contracts;
    const response = await fetch(contractUrl, {
      signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`contract request failed with ${response.status}`);
    const bundle = await response.json();
    const loaded = flattenContracts(bundle);
    if (!loaded.length) throw new Error("contract did not contain component entries");
    contracts = loaded;
    return contracts;
  }

  function renderResults(matches) {
    clearOutput();
    for (const match of matches) list.append(createResultEntry(root.ownerDocument, match));
    list.hidden = false;
  }

  function renderEmpty() {
    clearOutput();
    empty.hidden = false;
  }

  function renderFailure() {
    clearOutput();
    failure.hidden = false;
  }

  async function search() {
    const query = currentQuery({ focus: true });
    if (!query) return;

    cancelActiveRequest();
    const nextController = new AbortController();
    controller = nextController;
    clearOutput();
    setPending(true);
    setStatus("正在读取组件契约…");

    try {
      const loaded = await loadContracts(nextController.signal);
      if (controller !== nextController || nextController.signal.aborted) return;
      const matches = filterContracts(loaded, query);
      setPending(false);
      if (matches.length) {
        renderResults(matches);
        setStatus(`找到 ${matches.length} 个匹配组件。`);
      } else {
        renderEmpty();
        setStatus("没有匹配的组件。可以换一个 CSS 类、英文名或契约关键词。");
      }
    } catch (error) {
      if (nextController.signal.aborted || controller !== nextController) return;
      setPending(false);
      renderFailure();
      setStatus("组件契约暂时不可用。请检查本地 HTTP 服务后重试。");
    } finally {
      if (controller === nextController) controller = null;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    touched = true;
    search();
  });

  input.addEventListener("blur", () => {
    touched = true;
    if (!input.value.trim()) showInputError();
  });

  input.addEventListener("input", () => {
    if (!touched) return;
    clearInputError();
    cancelActiveRequest();
    showIdle("关键词已修改，提交后更新结果。");
    setStatus("");
  });

  reset?.addEventListener("click", () => {
    cancelActiveRequest();
    input.value = "";
    clearInputError();
    showIdle();
    setStatus("");
    input.focus();
  });

  retry?.addEventListener("click", search);
  showIdle();
}

function createResultEntry(documentRef, contract) {
  const item = documentRef.createElement("li");
  const entry = documentRef.createElement("article");
  entry.className = "wx-entry wx-entry--ruled";

  const identity = documentRef.createElement("p");
  identity.className = "wx-entry__meta";
  identity.append(`${contract.family} · `);
  const code = documentRef.createElement("code");
  code.textContent = contract.classes.join(" ");
  identity.append(code);

  const title = documentRef.createElement("p");
  title.className = "wx-entry__title";
  const link = documentRef.createElement("a");
  link.href = `./${contract.slug}.html`;
  link.textContent = contract.name;
  title.append(link);

  const base = documentRef.createElement("p");
  base.className = "wx-entry__desc";
  base.textContent = contract.base;

  const detail = documentRef.createElement("p");
  detail.className = "wx-entry__meta";
  detail.textContent = `状态：${contract.state} · 行为：${contract.behaviour}`;

  entry.append(identity, title, base, detail);
  item.append(entry);
  return item;
}

if (typeof document !== "undefined") {
  const boot = () => document.querySelectorAll("[data-component-finder]").forEach(initComponentFinder);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
}
