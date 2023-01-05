import React from 'react';

// this is how watcher saga works:
function* testing() {
  // it uses an infinite loop and as a result never yields { done: true, value: undefined }
  while (true) {
    // some code here (PART1)
    // ...
    yield 1;
    // some code here (PART2)
    // ...
    yield 2;
    // some code here (PART3)
    // ...
    yield 3;
    // some code here (PART4)
    // ...
  }
}

function App() {
  // in order to execute generator we first need iterator:
  const iterator = testing();
  // after calling "next" here PART1 code will be executed
  // and { done: false, value: 1 } object yielded (returned)
  console.log(iterator.next());
  // after calling "next" here PART2 code will be executed
  // and { done: false, value: 2 } object yielded (returned)
  console.log(iterator.next());
  // after calling "next" here PART3 code will be executed
  // and { done: false, value: 3 } object yielded (returned)
  console.log(iterator.next());
  // after calling "next" here PART4 code will be executed
  // and { done: true, value: undefined } object yielded (returned)
  // BUT! If we are using watcher saga then we'll get a different result:
  // after calling "next" here PART4 and PART1 code will be executed
  // and { done: false, value: 1 } object yielded (returned) AGAIN
  console.log(iterator.next());

  return <div>Hello!</div>;
}

export default App;
