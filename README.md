# Simple Database

## Overview
This Store is able to save, read, delete, and update data as JSON files in a specified directory. You can also retrieve all the saved data as an array of objects. Files are saved with a randomly generated id of 10 characters.

## How to Use
In your .js, type:

```
const Store = require('./**path to Store**/Store');
```
 
Initialize your store:
```
const store = new Store(**path to your directory**);
```

now you can use the following methods:
```
getAll()

store.save({ key: value });
store.get(id);
store.delete(id);
store.update(id, { key: newValue })
```