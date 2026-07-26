import type {ComponentType} from 'react';

export type ModuleInput =
  | {id: string; type: 'number'; default: number; min?: number; max?: number; realtime?: boolean}
  | {id: string; type: 'boolean'; default: boolean}
  | {id: string; type: 'string'; default: string}
  | {id: string; type: 'color'; default: string}
  | {id: string; type: 'vector2'; default: readonly [number, number]; realtime?: boolean}
  | {id: string; type: 'enum'; default: string; options: readonly string[]}
  | {id: string; type: 'trigger'}
  | {id: string; type: 'asset'; accepts: readonly ('image' | 'video' | 'audio' | 'svg')[]};

export interface ModuleRuntime {
  readonly mode: 'live' | 'preview' | 'replay' | 'render';
  readonly frame: number;
  readonly fps: number;
  readonly timeSeconds: number;
  getNumber(signalId: string): number;
  getVector2(signalId: string): readonly [number, number];
}

export interface VisualModuleProps<TInputs extends Record<string, unknown>> {
  readonly inputs: Readonly<TInputs>;
  readonly runtime: ModuleRuntime;
  emit(eventName: string, payload?: unknown): void;
}

export interface VisualModuleDefinition<TInputs extends Record<string, unknown>> {
  readonly id: string;
  readonly version: `${number}.${number}.${number}`;
  readonly title: string;
  readonly component: ComponentType<VisualModuleProps<TInputs>>;
  readonly inputs: readonly ModuleInput[];
  readonly defaultInputs: Readonly<TInputs>;
  readonly capabilities: {
    readonly live: boolean;
    readonly deterministic: boolean;
    readonly offlineRender: boolean;
    readonly transparent: boolean;
  };
}

export interface ModuleInstance {
  readonly instanceId: string;
  readonly moduleId: string;
  readonly moduleVersion: string;
  readonly layer: number;
  readonly initialInputs: Readonly<Record<string, unknown>>;
}

export const defineVisualModule = <TInputs extends Record<string, unknown>>(
  definition: VisualModuleDefinition<TInputs>,
): VisualModuleDefinition<TInputs> => definition;

export class ModuleRegistry {
  readonly #definitions = new Map<string, VisualModuleDefinition<Record<string, unknown>>>();

  register<TInputs extends Record<string, unknown>>(definition: VisualModuleDefinition<TInputs>): void {
    const key = `${definition.id}@${definition.version}`;
    if (this.#definitions.has(key)) throw new Error(`Visual Module already registered: ${key}`);
    this.#definitions.set(key, definition as VisualModuleDefinition<Record<string, unknown>>);
  }

  resolve(moduleId: string, version: string): VisualModuleDefinition<Record<string, unknown>> {
    const key = `${moduleId}@${version}`;
    const definition = this.#definitions.get(key);
    if (!definition) throw new Error(`Visual Module not found: ${key}`);
    return definition;
  }
}
