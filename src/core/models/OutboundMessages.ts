import {fold as foldOption, Option} from "fp-ts/lib/Option";
import * as Immutable from "immutable";
import {OutboundMessage} from "./OutboundMessage";

export class OutboundMessages {
    readonly items: Immutable.List<OutboundMessage>;

    constructor(items: OutboundMessage[] | Immutable.List<OutboundMessage>) {
        this.items = Immutable.List(items);
    }

    size() {
        return this.items.size;
    }

    head(): OutboundMessage | null {
        return <OutboundMessage>this.items.get(0, null);
    }

    tail(): Immutable.List<OutboundMessage> {
        return this.items.shift();
    }

    get(index: number): OutboundMessage | undefined {
        return this.items.get(index);
    }

    add(message: OutboundMessage): OutboundMessages {
        return new OutboundMessages(this.items.push(message))
    }

    concat(other: OutboundMessages): OutboundMessages {
        return new OutboundMessages(this.items.concat(other.items));
    }

    maybeAdd(message: Option<OutboundMessage>): OutboundMessages {
        return foldOption(() => this, (m: OutboundMessage) => this.add(m))(message);
    }

    static singleton(message: OutboundMessage): OutboundMessages {
        return new OutboundMessages(Immutable.List.of(message));
    }

    static empty(): OutboundMessages {
        return EMPTY;
    }
}

const EMPTY = new OutboundMessages([]);