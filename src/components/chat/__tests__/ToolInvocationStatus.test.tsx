import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationStatus } from "../ToolInvocationStatus";

afterEach(() => {
  cleanup();
});

// str_replace_editor - view command
test("displays 'Viewing' for pending view command", () => {
  const toolInvocation = {
    toolCallId: "test-1",
    toolName: "str_replace_editor",
    state: "call" as const,
    args: { command: "view", path: "/src/App.tsx" },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Viewing/)).toBeDefined();
  expect(screen.getByText("App.tsx")).toBeDefined();
});

test("displays 'Viewed' for completed view command", () => {
  const toolInvocation = {
    toolCallId: "test-1",
    toolName: "str_replace_editor",
    state: "result" as const,
    args: { command: "view", path: "/src/App.tsx" },
    result: "file contents...",
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Viewed/)).toBeDefined();
  expect(screen.getByText("App.tsx")).toBeDefined();
});

// str_replace_editor - create command
test("displays 'Creating' for pending create command", () => {
  const toolInvocation = {
    toolCallId: "test-2",
    toolName: "str_replace_editor",
    state: "call" as const,
    args: { command: "create", path: "/src/components/Button.tsx" },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Creating/)).toBeDefined();
  expect(screen.getByText("Button.tsx")).toBeDefined();
});

test("displays 'Created' for completed create command", () => {
  const toolInvocation = {
    toolCallId: "test-2",
    toolName: "str_replace_editor",
    state: "result" as const,
    args: { command: "create", path: "/src/components/Button.tsx", file_text: "..." },
    result: "success",
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Created/)).toBeDefined();
  expect(screen.getByText("Button.tsx")).toBeDefined();
});

// str_replace_editor - str_replace command
test("displays 'Editing' for pending str_replace command", () => {
  const toolInvocation = {
    toolCallId: "test-3",
    toolName: "str_replace_editor",
    state: "call" as const,
    args: { command: "str_replace", path: "/src/App.tsx", old_str: "old", new_str: "new" },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Editing/)).toBeDefined();
  expect(screen.getByText("App.tsx")).toBeDefined();
});

test("displays 'Edited' for completed str_replace command", () => {
  const toolInvocation = {
    toolCallId: "test-3",
    toolName: "str_replace_editor",
    state: "result" as const,
    args: { command: "str_replace", path: "/src/App.tsx", old_str: "old", new_str: "new" },
    result: "success",
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Edited/)).toBeDefined();
});

// str_replace_editor - insert command
test("displays 'Editing' for pending insert command", () => {
  const toolInvocation = {
    toolCallId: "test-4",
    toolName: "str_replace_editor",
    state: "call" as const,
    args: { command: "insert", path: "/src/App.tsx", insert_line: 10, new_str: "new line" },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Editing/)).toBeDefined();
});

test("displays 'Edited' for completed insert command", () => {
  const toolInvocation = {
    toolCallId: "test-4",
    toolName: "str_replace_editor",
    state: "result" as const,
    args: { command: "insert", path: "/src/App.tsx", insert_line: 10, new_str: "new line" },
    result: "success",
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Edited/)).toBeDefined();
});

// file_manager - rename command
test("displays 'Renaming' for pending rename command", () => {
  const toolInvocation = {
    toolCallId: "test-5",
    toolName: "file_manager",
    state: "call" as const,
    args: { command: "rename", path: "/src/old.tsx", new_path: "/src/new.tsx" },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Renaming/)).toBeDefined();
  expect(screen.getByText("old.tsx")).toBeDefined();
});

test("displays 'Renamed' for completed rename command", () => {
  const toolInvocation = {
    toolCallId: "test-5",
    toolName: "file_manager",
    state: "result" as const,
    args: { command: "rename", path: "/src/old.tsx", new_path: "/src/new.tsx" },
    result: { success: true },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Renamed/)).toBeDefined();
});

// file_manager - delete command
test("displays 'Deleting' for pending delete command", () => {
  const toolInvocation = {
    toolCallId: "test-6",
    toolName: "file_manager",
    state: "call" as const,
    args: { command: "delete", path: "/src/unused.tsx" },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Deleting/)).toBeDefined();
  expect(screen.getByText("unused.tsx")).toBeDefined();
});

test("displays 'Deleted' for completed delete command", () => {
  const toolInvocation = {
    toolCallId: "test-6",
    toolName: "file_manager",
    state: "result" as const,
    args: { command: "delete", path: "/src/unused.tsx" },
    result: { success: true },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Deleted/)).toBeDefined();
});

// Edge cases - Unknown tool names
test("displays raw tool name for unknown tools", () => {
  const toolInvocation = {
    toolCallId: "test-7",
    toolName: "unknown_tool",
    state: "call" as const,
    args: { some: "arg" },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/unknown_tool/)).toBeDefined();
});

// Edge cases - Missing args
test("handles missing command gracefully", () => {
  const toolInvocation = {
    toolCallId: "test-8",
    toolName: "str_replace_editor",
    state: "call" as const,
    args: {},
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/str_replace_editor/)).toBeDefined();
});

// Edge cases - Missing path
test("handles missing path gracefully", () => {
  const toolInvocation = {
    toolCallId: "test-10",
    toolName: "str_replace_editor",
    state: "call" as const,
    args: { command: "create" },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText(/Creating/)).toBeDefined();
  expect(screen.getByText("file")).toBeDefined();
});

// Edge cases - partial-call state
test("shows spinner for partial-call state", () => {
  const toolInvocation = {
    toolCallId: "test-11",
    toolName: "str_replace_editor",
    state: "partial-call" as const,
    args: { command: "create", path: "/src/App.tsx" },
  };

  const { container } = render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  const spinner = container.querySelector(".animate-spin");
  expect(spinner).not.toBeNull();
});

test("shows green dot for result state", () => {
  const toolInvocation = {
    toolCallId: "test-12",
    toolName: "str_replace_editor",
    state: "result" as const,
    args: { command: "create", path: "/src/App.tsx" },
    result: "success",
  };

  const { container } = render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  const greenDot = container.querySelector(".bg-emerald-500");
  expect(greenDot).not.toBeNull();
});

// Visual styling tests
test("applies correct base styling", () => {
  const toolInvocation = {
    toolCallId: "test-13",
    toolName: "str_replace_editor",
    state: "call" as const,
    args: { command: "view", path: "/src/App.tsx" },
  };

  const { container } = render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  const wrapper = container.firstChild as HTMLElement;

  expect(wrapper.className).toContain("inline-flex");
  expect(wrapper.className).toContain("bg-neutral-50");
  expect(wrapper.className).toContain("rounded-lg");
  expect(wrapper.className).toContain("border");
});

// Path parsing tests
test("extracts filename from complex paths", () => {
  const toolInvocation = {
    toolCallId: "test-14",
    toolName: "str_replace_editor",
    state: "call" as const,
    args: { command: "view", path: "/src/components/ui/forms/Input.tsx" },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText("Input.tsx")).toBeDefined();
});

test("handles empty path string", () => {
  const toolInvocation = {
    toolCallId: "test-16",
    toolName: "str_replace_editor",
    state: "call" as const,
    args: { command: "view", path: "" },
  };

  render(<ToolInvocationStatus toolInvocation={toolInvocation} />);
  expect(screen.getByText("file")).toBeDefined();
});
