# @freshts/state

My take on state management.

## Introduction

I have seen a good number of redux stores in my history - and each one is vastly different from the previous one. On one hand, this kind of development & competition can be good - it can foster potentially great ideas by having more developers working on the problem. That's effectively how I see [`redux-toolkit`] fitting into that - it takes popular tools from the industry and puts them together as a "opinion of best practice" riding on top of Redux.

The problem, however, is that not everyone uses redux toolkit, and not every one of [`redux-toolkit`]'s opinions are in agreement with my own. Additionally, any solution involves bolting on additional features to redux that redux did not originally have. For example, it was not designed to have an effect system from the ground up.

In making FreshTS State, I took some ideas from redux, some ideas from [`redux-observable`], and [`ngrx`]. Like the latter, it is based heavily on [`rxjs`]. I primarily develop using React & (hopefully soon) SolidJS, however, so Angular bindings are not here yet on account of my lack of familiarity (also doesn't solve a problem I have...PRs welcome!)

## Basics

This documentation assumes some knowledge of [`rxjs`] - mainly the concepts `Observable` and `BehaviorSubject`.

Like Redux, FreshTS State assumes a singular flow of data - we dispatch **actions**, which get seen by **reducer** functions, which in turn generate the next state. The details are different but the concept is the same as that in Redux. However, after the reducers have seen and reacted to the dispatched action(s), effects are run against the action(s) and new state. Effects are functions that can emit more actions (via an observable - so they may be asynchronous) as necessary.

Another big difference between Redux and FreshTS State is that while in Redux, the primary way to manage larger state is to divide the state into "slices" which is considered a chunk of state (a top-level property with a key and a value) that gets managed separately. In FreshTS State, we instead have what we call **Reactive States**, which are a similar concept, but unlike slices, they don't know nor care where they are within the whole state of the app, and can be arbitrarily nested. It's an important distinction, however, as it allows multiple Reactive States to exist in the same store in different places, and allows much better scaling as you can nest reactive states (they're a concept, not really a specific feature - you could do this in Redux too; it just isn't conventionally done.)

[`rxjs`]: https://rxjs.dev/
[`redux-toolkit`]: https://redux-toolkit.js.org/
[`redux-observable`]: https://redux-observable.js.org/
[`ngrx`]: https://ngrx.io/
