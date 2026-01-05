"use client";

import { ToolInvocation } from "ai";
import {
  Loader2,
  Eye,
  FilePlus,
  Pencil,
  FileEdit,
  Trash2,
  Wrench,
  LucideIcon,
} from "lucide-react";

interface ToolInvocationStatusProps {
  toolInvocation: ToolInvocation;
}

interface ActionConfig {
  pendingLabel: string;
  completedLabel: string;
  icon: LucideIcon;
}

const ACTION_CONFIGS: Record<string, Record<string, ActionConfig>> = {
  str_replace_editor: {
    view: { pendingLabel: "Viewing", completedLabel: "Viewed", icon: Eye },
    create: { pendingLabel: "Creating", completedLabel: "Created", icon: FilePlus },
    str_replace: { pendingLabel: "Editing", completedLabel: "Edited", icon: Pencil },
    insert: { pendingLabel: "Editing", completedLabel: "Edited", icon: Pencil },
  },
  file_manager: {
    rename: { pendingLabel: "Renaming", completedLabel: "Renamed", icon: FileEdit },
    delete: { pendingLabel: "Deleting", completedLabel: "Deleted", icon: Trash2 },
  },
};

function getFilename(path: string | undefined): string {
  if (!path) return "file";
  const parts = path.split("/");
  const filename = parts[parts.length - 1];
  return filename || "file";
}

function getActionConfig(toolName: string, command?: string): ActionConfig {
  const toolConfig = ACTION_CONFIGS[toolName];
  if (toolConfig && command && toolConfig[command]) {
    return toolConfig[command];
  }
  return {
    pendingLabel: toolName,
    completedLabel: toolName,
    icon: Wrench,
  };
}

export function ToolInvocationStatus({ toolInvocation }: ToolInvocationStatusProps) {
  const { toolName, state, args } = toolInvocation;
  const isComplete = state === "result";

  const command = (args as Record<string, unknown>)?.command as string | undefined;
  const path = (args as Record<string, unknown>)?.path as string | undefined;

  const config = getActionConfig(toolName, command);
  const Icon = config.icon;
  const label = isComplete ? config.completedLabel : config.pendingLabel;
  const filename = getFilename(path);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      <Icon className="w-3.5 h-3.5 text-neutral-500" />
      {isComplete ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">
        {label} <code className="text-neutral-600">{filename}</code>
      </span>
    </div>
  );
}
