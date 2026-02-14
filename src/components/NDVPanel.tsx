import { useState } from "react";
import { ChevronRight, ChevronDown, Search, Pencil, X, ExternalLink, TriangleAlert, CircleCheck, Info, Copy, Trash2, GripVertical } from "lucide-react";

interface FieldData {
  name: string;
  type: string;
  expression: string;
  resolvedValue: string;
}

const fields: FieldData[] = [
  {
    name: "user_id",
    type: "String",
    expression: "{{ $json.body.user_id }}",
    resolvedValue: "f0602a9c-010d-4d6b-88f6-fb7a5a512c62",
  },
  {
    name: "creator_id",
    type: "String",
    expression: "{{ $json.body.creator_id }}",
    resolvedValue: "158b0e12-f81a-4390-9c98-5ba23b01b0d0",
  },
  {
    name: "thread_id",
    type: "String",
    expression: "{{ $json.body.thread_id }}",
    resolvedValue: "67d16363-f129-455f-8501-855bb48399dd",
  },
  {
    name: "chat",
    type: "String",
    expression: "{{ $json.body.chat }}",
    resolvedValue: "halo",
  },
];

const outputData = [
  { key: "user_id", value: "f0602a9c-010d-4d6b-88f6-fb7a5a512c62", type: "T" },
  { key: "creator_id", value: "158b0e12-f81a-4390-9c98-5ba23b01b0d0", type: "T" },
  { key: "thread_id", value: "67d16363-f129-455f-8501-855bb48399dd", type: "T" },
  { key: "chat", value: "halo", type: "T" },
];

const NDVPanel = () => {
  const [activeParamTab, setActiveParamTab] = useState<"Parameters" | "Settings">("Parameters");
  const [activeInputView, setActiveInputView] = useState<"Schema" | "Table" | "JSON">("Schema");
  const [activeOutputView, setActiveOutputView] = useState<"Schema" | "Table" | "JSON">("Schema");
  const [inputTreeOpen, setInputTreeOpen] = useState(true);
  const [variablesOpen, setVariablesOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col bg-ndv-bg">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-ndv-panel-border bg-ndv-header px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
          <Pencil className="h-4 w-4 text-muted-foreground" />
        </div>
        <h1 className="text-base font-semibold text-foreground">Data</h1>
        <div className="ml-auto flex items-center gap-2">
          <a href="#" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            Docs <ExternalLink className="h-3 w-3" />
          </a>
          <button className="rounded p-1 hover:bg-muted">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Main 3-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* INPUT Panel */}
        <div className="flex w-[280px] flex-shrink-0 flex-col border-r border-ndv-panel-border bg-ndv-panel">
          <div className="flex items-center justify-between border-b border-ndv-panel-border px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Input</span>
            <div className="flex gap-1">
              {(["Schema", "Table", "JSON"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveInputView(tab)}
                  className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                    activeInputView === tab
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="rounded p-1 hover:bg-muted">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {/* Webhook1 tree item */}
            <div className="mb-1">
              <button
                onClick={() => setInputTreeOpen(!inputTreeOpen)}
                className="flex w-full items-center gap-1 rounded px-1 py-1 text-sm hover:bg-muted"
              >
                {inputTreeOpen ? (
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span className="inline-flex h-5 w-5 items-center justify-center rounded text-ndv-input-icon">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current"><circle cx="8" cy="8" r="6" /></svg>
                </span>
                <span className="font-medium text-foreground">Webhook1</span>
                <span className="ml-1 text-ndv-input-icon">⚡</span>
                <span className="ml-auto text-xs text-muted-foreground">1 item</span>
              </button>
            </div>

            {/* Variables and context */}
            <div>
              <button
                onClick={() => setVariablesOpen(!variablesOpen)}
                className="flex w-full items-center gap-1 rounded px-1 py-1 text-sm hover:bg-muted"
              >
                {variablesOpen ? (
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span className="text-muted-foreground">Variables and context</span>
              </button>
            </div>
          </div>
        </div>

        {/* PARAMETERS Panel (center) */}
        <div className="flex flex-1 flex-col bg-ndv-panel">
          {/* Tabs */}
          <div className="flex items-center border-b border-ndv-panel-border">
            <div className="flex gap-0">
              {(["Parameters", "Settings"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveParamTab(tab)}
                  className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                    activeParamTab === tab
                      ? "text-ndv-tab-active"
                      : "text-ndv-tab-inactive hover:text-foreground"
                  }`}
                >
                  {tab}
                  {activeParamTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ndv-tab-active" />
                  )}
                </button>
              ))}
            </div>
            <div className="ml-auto pr-4">
              <button className="flex items-center gap-1.5 rounded-md bg-ndv-execute px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
                <TriangleAlert className="h-3.5 w-3.5" />
                Execute step
              </button>
            </div>
          </div>

          {/* Parameters content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Mode */}
            <div className="mb-6">
              <label className="mb-1.5 block text-sm text-ndv-field-label">Mode</label>
              <div className="relative">
                <select className="w-full appearance-none rounded-md border border-ndv-panel-border bg-ndv-panel px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring">
                  <option>Manual Mapping</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Fields to Set */}
            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium text-ndv-field-label">Fields to Set</label>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <FieldRow key={index} field={field} />
                ))}
              </div>
            </div>

            {/* Add field area */}
            <div className="mt-4 flex items-center justify-center rounded-lg border-2 border-dashed border-ndv-panel-border py-4 text-sm text-muted-foreground">
              Drag input fields here
              <span className="mx-2">or</span>
              <button className="font-medium text-ndv-tab-active hover:underline">Add Field</button>
            </div>
          </div>
        </div>

        {/* OUTPUT Panel */}
        <div className="flex w-[320px] flex-shrink-0 flex-col border-l border-ndv-panel-border bg-ndv-panel">
          <div className="flex items-center justify-between border-b border-ndv-panel-border px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Output</span>
            <div className="flex items-center gap-1">
              {(["Schema", "Table", "JSON"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveOutputView(tab)}
                  className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                    activeOutputView === tab
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button className="rounded p-1 hover:bg-muted">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <button className="rounded p-1 hover:bg-muted">
                <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <button className="rounded p-1 hover:bg-muted">
                <Info className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="px-4 py-2 text-xs text-muted-foreground">1 item</div>

          <div className="flex-1 overflow-y-auto px-4">
            <div className="space-y-2.5">
              {outputData.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold text-muted-foreground">
                    T
                  </span>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-foreground">{item.key}</span>
                    <p className="truncate text-sm text-ndv-result-value">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Individual field row */
const FieldRow = ({ field }: { field: FieldData }) => {
  return (
    <div className="rounded-lg border border-ndv-panel-border bg-ndv-panel p-4">
      <div className="mb-3 flex items-center gap-2">
        <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
        <input
          type="text"
          defaultValue={field.name}
          className="flex-1 rounded border border-ndv-panel-border bg-transparent px-2 py-1.5 text-sm text-foreground focus:border-ring focus:outline-none"
        />
        <button className="rounded p-1 hover:bg-muted">
          <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>

      {/* Type selector */}
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-muted text-[10px] font-bold text-muted-foreground">T</span>
        <div className="relative flex-1">
          <select className="w-full appearance-none rounded border border-ndv-panel-border bg-transparent px-2 py-1.5 text-sm text-foreground focus:border-ring focus:outline-none">
            <option>String</option>
            <option>Number</option>
            <option>Boolean</option>
            <option>Array</option>
            <option>Object</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Expression input */}
      <div className="mb-1 flex items-center gap-2">
        <span className="text-lg text-muted-foreground">=</span>
        <div className="flex flex-1 items-center rounded border border-ndv-panel-border bg-ndv-expression px-2 py-1.5">
          <span className="text-sm text-ndv-expression-fg">{field.expression}</span>
          <button className="ml-auto rounded p-0.5 hover:bg-muted">
            <Copy className="h-3 w-3 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Resolved value */}
      <p className="pl-6 text-xs text-ndv-result-value">{field.resolvedValue}</p>
    </div>
  );
};

export default NDVPanel;
