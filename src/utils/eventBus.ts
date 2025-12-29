type EventCallback = (...args: any[]) => void;

type EventListeners = {
  [event: string]: EventCallback[];
};

class EventBus {
  private listeners: EventListeners;

  constructor() {
    this.listeners = {};
  }

  private _check(event: string): void {
    if (!(event in this.listeners)) {
      throw new Error(`Нет события ${event}`);
    }
  }

  on(event: string, callback: EventCallback): void {
    if (!(event in this.listeners)) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventCallback): void {
    this._check(event);
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    if (this.listeners[event].length === 0) {
      delete this.listeners[event];
    }
  }

  emit(event: string, ...args: any[]): void {
    if (!(event in this.listeners)) {
      return;
    }
    this.listeners[event].forEach((callback) => { callback(...args); });
  }
}

export default EventBus;
