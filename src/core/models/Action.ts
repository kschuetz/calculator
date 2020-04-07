import {noop} from "./OutboundMessage";
import {OutboundMessages} from "./OutboundMessages";

export class Action<S> {
    private readonly runFn: (incoming: S) => Promise<[OutboundMessages, S]>;

    private constructor(runFn: (incoming: S) => Promise<[OutboundMessages, S]>) {
        this.runFn = runFn;
    }

    run(incoming: S): Promise<[OutboundMessages, S]> {
        return this.runFn(incoming);
    }

    andThen(other: Action<S>): Action<S> {
        let first = this.runFn;
        let second = other.runFn;

        return new Action(state0 =>
            first(state0)
                .then(([outbound0, state1]) =>
                    second(state1)
                        .then(([outbound1, state2]: [OutboundMessages, S]) =>
                            [outbound0.concat(outbound1), state2])));
    }

    static read<S>(f: (incoming: S) => OutboundMessages): Action<S> {
        return new Action(incoming => Promise.resolve([f(incoming), incoming]));
    }

    static asyncRead<S>(f: (incoming: S) => Promise<OutboundMessages>): Action<S> {
        return new Action(incoming => f(incoming).then(result => [result, incoming]));
    }

    static modify<S>(f: (incoming: S) => [OutboundMessages, S]): Action<S> {
        return new Action(incoming => Promise.resolve(f(incoming)));
    }

    static asyncModify<S>(f: (incoming: S) => Promise<[OutboundMessages, S]>): Action<S> {
        return new Action(f);
    }

    static constant<S>(result: OutboundMessages): Action<S> {
        return new Action(incoming => Promise.resolve([result, incoming]));
    }

    static noop<S>(): Action<S> {
        return Action.constant(OutboundMessages.singleton(noop()));
    }
}
