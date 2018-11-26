class QueueOfInt {
    private queue : number[]= [];

    public Push(value : number) : void {
        this.queue.push(value);
    }

    public Pop() : number | undefined {
        return this.queue.shift();
    }
}

const intQueue : QueueOfInt = new QueueOfInt();
intQueue.Push(10);
intQueue.Push(35);
console.log(intQueue.Pop()); // Prints 10
console.log(intQueue.Pop()); // Prints 35

class QueueOfString {
    private queue : string[]= [];

    public Push(value : string) : void {
        this.queue.push(value);
    }

    public Pop() : string | undefined {
        return this.queue.shift();
    }
}

class Queue<T> {
    private queue : T[]= [];

    public Push(value : T) : void {
        this.queue.push(value);
    }

    public Pop() : T | undefined {
        return this.queue.shift();
    }
}

console.log(`calling generic queue`);
const queue : Queue<number> = new Queue<number>();
const stringQueue : Queue<string> = new Queue<string>();
queue.Push(10);
queue.Push(35);
console.log(queue.Pop());
console.log(queue.Pop());
stringQueue.Push(`Hello`);
stringQueue.Push(`Generics`);
console.log(stringQueue.Pop());
console.log(stringQueue.Pop());
