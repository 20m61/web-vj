export type SignalKind = 'continuous' | 'event' | 'state' | 'text' | 'asset';

export interface Signal<T = unknown> {
  readonly id: string;
  readonly kind: SignalKind;
  readonly value: T;
  readonly timestamp: number;
  readonly sequence: number;
  readonly source: string;
}

export interface PerformanceLogEntry<T = unknown> extends Signal<T> {}

export class RealtimeBuffer {
  readonly #numbers = new Map<string, number>();
  readonly #vectors = new Map<string, readonly [number, number]>();

  setNumber(id: string, value: number): void {
    if (!Number.isFinite(value)) throw new TypeError(`Signal ${id} must be finite`);
    this.#numbers.set(id, value);
  }

  getNumber(id: string, fallback = 0): number {
    return this.#numbers.get(id) ?? fallback;
  }

  setVector2(id: string, value: readonly [number, number]): void {
    if (!value.every(Number.isFinite)) throw new TypeError(`Signal ${id} must be a finite vector`);
    this.#vectors.set(id, value);
  }

  getVector2(id: string, fallback: readonly [number, number] = [0, 0]): readonly [number, number] {
    return this.#vectors.get(id) ?? fallback;
  }
}

export class SignalStore {
  readonly realtime = new RealtimeBuffer();
  readonly #latest = new Map<string, Signal>();
  readonly #events: Signal[] = [];
  readonly #subscribers = new Set<(signal: Signal) => void>();

  publish<T>(signal: Signal<T>): void {
    const previous = this.#latest.get(signal.id);
    if (previous && signal.sequence <= previous.sequence) return;

    this.#latest.set(signal.id, signal as Signal);
    if (signal.kind === 'event') this.#events.push(signal as Signal);
    for (const subscriber of this.#subscribers) subscriber(signal as Signal);
  }

  latest<T = unknown>(id: string): Signal<T> | undefined {
    return this.#latest.get(id) as Signal<T> | undefined;
  }

  drainEvents(): Signal[] {
    return this.#events.splice(0, this.#events.length);
  }

  subscribe(subscriber: (signal: Signal) => void): () => void {
    this.#subscribers.add(subscriber);
    return () => this.#subscribers.delete(subscriber);
  }
}

export class PerformanceLog {
  readonly #entries: PerformanceLogEntry[] = [];

  append(entry: PerformanceLogEntry): void {
    this.#entries.push(entry);
  }

  snapshot(): readonly PerformanceLogEntry[] {
    return [...this.#entries].sort((a, b) => a.timestamp - b.timestamp || a.sequence - b.sequence);
  }
}
