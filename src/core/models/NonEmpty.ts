import * as Immutable from 'immutable';

export class NonEmpty<A> {
    readonly items: Immutable.List<A>;

    constructor(items: [A] | Immutable.List<A>) {
        let list = Immutable.List(items);
        if (list.isEmpty()) {
            throw new Error("non-empty list required");
        }
        this.items = list;
    }

    size() {
        return this.items.size;
    }

    head(): A {
        return <A>this.items.get(0);
    }

    tail(): Immutable.List<A> {
        return this.items.shift();
    }

    get(index: number): A | undefined {
        return this.items.get(index);
    }

    map<B>(f: (x: A) => B): NonEmpty<B> {
        return new NonEmpty<B>(this.items.map(f));
    }

    static singleton<A>(message: A): NonEmpty<A> {
        return new NonEmpty<A>(Immutable.List.of(message));
    }
}
