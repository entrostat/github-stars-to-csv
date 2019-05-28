export class ProgressTracker {
    total: number;
    current: number;
    onChange: () => void;

    constructor(obj: ProgressTracker | any = {}) {
        this.total = obj.total || 0;
        this.current = obj.current || 0;
        this.onChange = obj.onChange || (() => {});
    }

    increase() {
        this.current++;
        this.onChange();
    }

    progress() {
        return this.total === 0
            ? this.total
            : Math.round((this.current / this.total) * 1000) / 10;
    }

    setTotal(total: number) {
        this.total = total;
    }
}
