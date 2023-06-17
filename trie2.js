const { resolve } = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

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
      console.log(store[i] + ': ' + dictname[store[i]] )
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
      console.log(dictnum[ store[i] ] + ': ' + store[i])
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


const main = async () => {
  const names = new NameTrie()
  const numbers = new ContactTrie()

  let choice = -1

  while (choice !== 0) {
    console.log('1. Add contact')
    console.log('2. Search by name')
    console.log('3. Search by contact')
    console.log('4. Display all name and their contact')
    console.log('5. Display all contacts starting with name initials')
    console.log('6. Display all contacts starting with contact initials')
    console.log('0. Exit')
    // console.log('Enter your choice: ')

    wantChoice = parseInt( await readLine("Enter your choice: ") )

    switch (wantChoice) {
      case 1:
        const name = await readLine("Enter name: ")
        const number = await readLine("Enter number: ")
        dictname[name] = number
        dictnum[number] = name
        const nameInsertResult = names.insert(name)
        const numInsertResult = numbers.insert(number)
        if (nameInsertResult === 1 && numInsertResult === 1) {
          console.log('Contact added successfully.')
        } else {
          console.log('Contact already exists.')
        }
        break
      case 2:
        const searchName = await readLine("Enter name: ")
        if (names.search(searchName)) {
          console.log('Name found: ' + searchName + ': ' + dictname[searchName])
        } else {
          console.log('Name not found.')
        }
        break
      case 3:
        const searchContact = await readLine("Enter contact: ")
        if (numbers.search(searchContact)) {
          console.log(
            'Contact found: ' + dictnum[searchContact] + ': ' + searchContact
          )
        } else {
          console.log('Contact not found.')
        }
        break
      case 4:
        console.log('All Contacts:')
        names.print()
        break
      case 5:
        const searchInitialName = await readLine("Enter the initials of Name: ")
        names.printPref(searchInitialName)
        break
      case 6:
        const searchInitialContact = await readLine("Enter the initials of contact: ")
        numbers.printPref(searchInitialContact)
        break
      case 0:
        console.log('Exiting...')
        rl.close()
        break
      default:
        console.log('Invalid choice. Try again.')
        break
    }
    choice = choice-1;
  }
}

const readLine = msg => new Promise(resolve =>
    rl.question(msg, response => resolve(response))
);

main()
