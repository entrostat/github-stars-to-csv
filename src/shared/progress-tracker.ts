export class ProgressTracker {
    total: number;
    current: number;

    constructor(obj: ProgressTracker | any = {}) {
        this.total = obj.total || 0;
        this.current = obj.current || 0;
    }

    increase() {
        this.current++;
    }

    progress() {
        return this.total === 0
            ? this.total
            : Math.round((this.current / this.total) * 1000) / 10;
    }
}
