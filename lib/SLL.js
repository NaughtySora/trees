'use strict';

class SLL {
  #head = null;
  #tail = null;

  push(value) {
    const node = { value, next: null };
    if (this.#tail === null) this.#head = node;
    else this.#tail.next = node;
    this.#tail = node;
    return node;
  }

  shift() {
    if (this.#head === null) return null;
    const head = this.#head;
    this.#head = head.next;
    if (this.#head === null) this.#tail = null;
    return head.value;
  }
}

module.exports = SLL;
