function map(transformFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function (x) {
        const y = transformFn(x);
        outputObserver.next(y);
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    });
  });
  return outputObservable;
}

function createObservable(subscribe) {
  const observable = {
    subscribe: subscribe,
    map: map
  };

  return observable;
}

const arrayObservable = createObservable(function subscribe(ob) {
  [10, 20, 30].forEach(ob.next);
  ob.complete();
});

const observer = {
  next: function nextCallback(data) {
    console.log(data);
  },
  error: function errorCallback(err) {
    console.log(err);
  },
  complete: function completeCallback() {
    console.log("done");
  }
};

//arrayObservable.subscribe(observer);
// let mapObservable = arrayObservable.map(x => x / 10);
//   mapObservable.subscribe(observer);

arrayObservable.map(x => x / 5).subscribe(observer);