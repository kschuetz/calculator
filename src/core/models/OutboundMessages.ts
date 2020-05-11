import {NonEmptyArray} from "fp-ts/lib/NonEmptyArray";
import {fold as foldOption, Option} from "fp-ts/lib/Option";
import * as Immutable from "immutable";
import {OutboundMessage} from "./OutboundMessage";

export class OutboundMessages {
    readonly items: Immutable.List<OutboundMessage>;

    constructor(items: NonEmptyArray<OutboundMessage> | Immutable.List<OutboundMessage>) {
        let list = Immutable.List(items);
        if (list.isEmpty()) {
            throw new Error("non-empty list required");
        }
        this.items = list;
    }

    size() {
        return this.items.size;
    }

    head(): OutboundMessage {
        return <OutboundMessage>this.items.get(0);
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
}