import {fold as foldOption, Option} from "fp-ts/lib/Option";
import {OutboundMessage} from "./OutboundMessage";
import {OutboundMessageList} from "./OutboundMessageList";

export class Action<S> {
    private readonly runFn: (incoming: S) => Promise<[OutboundMessageList, S]>;

    constructor(runFn: (incoming: S) => Promise<[OutboundMessageList, S]>) {
        this.runFn = runFn;
    }

    run(incoming: S): Promise<[OutboundMessageList, S]> {
        return this.runFn(incoming);
    }

    andThen(other: Action<S>): Action<S> {
        let first = this.runFn;
        let second = other.runFn;

        return new Action(state0 =>
            first(state0)
                .then(([outbound0, state1]) =>
                    second(state1)
                        .then(([outbound1, state2]: [OutboundMessageList, S]) =>
                            [outbound0.concat(outbound1), state2])));
    }

    andThenMaybe<A>(a: Option<A>, f: (a: A) => Action<S>): Action<S> {
        return foldOption<A, Action<S>>(() => this, x => this.andThen(f(x)))(a);
    }

    // TODO: better name for flatMap
    flatMap(f: (incoming: S) => Action<S>): Action<S> {
        let first = this.runFn;
        return new Action(state0 => {
            let second = f(state0).runFn;
            return first(state0)
                .then(([outbound0, state1]) =>
                    second(state1)
                        .then(([outbound1, state2]: [OutboundMessageList, S]) =>
                            [outbound0.concat(outbound1), state2]));
        });
    }

    static compound<S>(f: (incoming: S) => Action<S>): Action<S> {
        return new Action(state0 => {
            return f(state0).run(state0);
        });
    }

    static messagesFromState<S>(f: (incoming: S) => OutboundMessageList): Action<S> {
        return new Action(incoming => Promise.resolve([f(incoming), incoming]));
    }

    static messageFromState<S>(f: (incoming: S) => OutboundMessage): Action<S> {
        return new Action(incoming => Promise.resolve([OutboundMessageList.singleton(f(incoming)), incoming]));
    }

    static modifyState<S>(f: (incoming: S) => S): Action<S> {
        return new Action(incoming => Promise.resolve([OutboundMessageList.empty(), f(incoming)]));
    }

    static sendMessages<S>(messages: OutboundMessageList): Action<S> {
        return new Action(incoming => Promise.resolve([messages, incoming]));
    }

    static sendMessage<S>(message: OutboundMessage): Action<S> {
        return new Action(incoming => Promise.resolve([OutboundMessageList.singleton(message), incoming]));
    }

    static asyncMessagesFromState<S>(f: (incoming: S) => Promise<OutboundMessageList>): Action<S> {
        return new Action(incoming => f(incoming).then(messages => [messages, incoming]));
    }

    static asyncMessageFromState<S>(f: (incoming: S) => Promise<OutboundMessage>): Action<S> {
        return new Action(incoming => f(incoming).then(message => [OutboundMessageList.singleton(message), incoming]));
    }

    static asyncModifyState<S>(f: (incoming: S) => Promise<S>): Action<S> {
        return new Action(incoming => f(incoming).then(newState => [OutboundMessageList.empty(), newState]));
    }

    static noop<S>(): Action<S> {
        return NOOP;
    }

}

const NOOP = new Action<any>(incoming => Promise.resolve([OutboundMessageList.empty(), incoming]));
