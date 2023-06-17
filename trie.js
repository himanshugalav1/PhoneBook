const dictname = new Map()
const dictnum = new Map()

class NameNode {
  constructor() {
    this.links = new Array(26)
    this.flag = false
  }
}

class NameTrie {
  constructor() {
    this.root = new NameNode()
  }

  insert(name) {
    let node = this.root
    for (let i = 0; i < name.length; i++) {
      const index = name.charCodeAt(i) - 'a'.charCodeAt(0)
      if (node.links[index] === undefined) {
        node.links[index] = new NameNode()
      }
      node = node.links[index]
    }
    if (node.flag) {
      return -1
    }
    node.flag = true
    return 1
  }

  search(name) {
    let node = this.root
    for (let i = 0; i < name.length; i++) {
      const index = name.charCodeAt(i) - 'a'.charCodeAt(0)
      if (node.links[index] === undefined) {
        return false
      }
      node = node.links[index]
    }
    return node.flag
  }

  isLastNode(node) {
    for (let i = 0; i < 26; i++) {
      if (node.links[i] !== undefined) {
        return false
      }
    }
    return true
  }

  rec(node, name, store) {
    if (node.flag) {
      store.push(name)
    }
    for (let i = 0; i < 26; i++) {
      if (node.links[i] !== undefined) {
        const nextChar = String.fromCharCode(i + 'a'.charCodeAt(0))
        this.rec(node.links[i], name + nextChar, store)
      }
    }
  }

  print() {
    const node = this.root
    const store = []
    this.rec(node, '', store)
    console.log(store.length)
    for (let i = 0; i < store.length; i++) {
      console.log(store[i] + ': ' + dictname[store[i]])
    }
  }

  printPref(pref) {
    let node = this.root
    for (let i = 0; i < pref.length; i++) {
      const index = pref.charCodeAt(i) - 'a'.charCodeAt(0)
      if (node.links[index] === undefined) {
        console.log('No contact found with the given user input')
        return false
      }
      node = node.links[index]
    }
    if (this.isLastNode(node)) {
      console.log(pref + ':' + dictname[pref])
      return true
    }
    const store = []
    this.rec(node, pref, store)
    console.log(store.length)
    for (let i = 0; i < store.length; i++) {
      console.log(store[i] + ': ' + dictname[store[i]])
    }
    return true
  }
}

class ContactNode {
  constructor() {
    this.links = new Array(10)
    this.flag = false
  }
}

class ContactTrie {
  constructor() {
    this.root = new ContactNode()
  }

  insert(number) {
    let node = this.root
    for (let i = 0; i < number.length; i++) {
      const index = number.charCodeAt(i) - '0'.charCodeAt(0)
      if (node.links[index] === undefined) {
        node.links[index] = new ContactNode()
      }
      node = node.links[index]
    }
    if (node.flag) {
      return -1
    }
    node.flag = true
    return 1
  }

  search(number) {
    let node = this.root
    for (let i = 0; i < number.length; i++) {
      const index = number.charCodeAt(i) - '0'.charCodeAt(0)
      if (node.links[index] === undefined) {
        return false
      }
      node = node.links[index]
    }
    return node.flag
  }

  isLastNode(node) {
    for (let i = 0; i < 10; i++) {
      if (node.links[i] !== undefined) {
        return false
      }
    }
    return true
  }

  rec(node, number, store) {
    if (node.flag) {
      store.push(number)
    }
    for (let i = 0; i < 10; i++) {
      if (node.links[i] !== undefined) {
        const nextDigit = String.fromCharCode(i + '0'.charCodeAt(0))
        this.rec(node.links[i], number + nextDigit, store)
      }
    }
  }

  print() {
    const node = this.root
    const store = []
    this.rec(node, '', store)
    console.log(store.length)
    for (let i = 0; i < store.length; i++) {
      console.log(dictnum[store[i]] + ': ' + store[i])
    }
  }

  printPref(pref) {
    let node = this.root
    for (let i = 0; i < pref.length; i++) {
      const index = pref.charCodeAt(i) - '0'.charCodeAt(0)
      if (node.links[index] === undefined) {
        console.log('No contact found with the given user input')
        return false
      }
      node = node.links[index]
    }
    if (this.isLastNode(node)) {
      console.log(dictnum[pref] + ':' + pref)
      return true
    }
    const store = []
    this.rec(node, pref, store)
    console.log(store.length)
    for (let i = 0; i < store.length; i++) {
      console.log(dictnum[store[i]] + ': ' + store[i])
    }
    return true
  }
}

const names = new NameTrie();
const numbers = new ContactTrie();

function add() {
  const inpname = document.getElementById('addname');
  const inpnumber = document.getElementById('addcontact');
  const name = inpname.value;
  const number = inpnumber.value;

  dictname[name] = number;
  dictnum[number] = name;
  const nameInsertResult = names.insert(name);
  const numInsertResult = numbers.insert(number);
  if (nameInsertResult === 1 && numInsertResult === 1) {
    console.log('Contact added successfully.');
  } else {
    console.log('Contact already exists.');
  }
}
function searchbyname() {
  const inpsearchName = document.getElementById('getbyname');
  const searchName = inpsearchName.value;
  if (names.search(searchName)) {
    console.log('Name found: ' + searchName + ': ' + dictname[searchName]);
  } else {
    console.log('Name not found.');
  }
}
function searchbycontact() {
  const inpsearchContact = document.getElementById('getbycontact');
  const searchContact = inpsearchContact.value;
  if (numbers.search(searchContact)) {
    console.log(
      'Contact found: ' + dictnum[searchContact] + ': ' + searchContact
    )
  } else {
    console.log('Contact not found.');
  }
}
function printall() {
  console.log('All Contacts:');
  names.print();
}
function printnameinit() {
  const inpsearchInitialName = document.getElementById('initname');
  const searchInitialName = inpsearchInitialName.value;
  names.printPref(searchInitialName);
}
function printcontactinit() {
  const inpsearchInitialContact = document.getElementById('initcontact');
  const searchInitialContact = inpsearchInitialContact.value;
  numbers.printPref(searchInitialContact);
}

function main() {
  var myButton1 = document.getElementById('mybtn1')
  var myButton2 = document.getElementById('mybtn2')
  var myButton3 = document.getElementById('mybtn3')
  var myButton4 = document.getElementById('mybtn4')
  var myButton5 = document.getElementById('mybtn5')
  var myButton6 = document.getElementById('mybtn6')

  myButton1.addEventListener('click', add);
  myButton2.addEventListener('click', searchbyname);
  myButton3.addEventListener('click', searchbycontact);
  myButton4.addEventListener('click', printall);
  myButton5.addEventListener('click', printnameinit);
  myButton6.addEventListener('click', printcontactinit);

}

main()
