const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json ({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, '/public')))


// express settings
app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname, '/views'))


let toDoList = [
    {
        listName: 'groceries',
        listId: uuid(),
        listItems: ['milk', 'grapes', 'fair life'],
    },
    {
        listName: 'supplies',
        listId: uuid(),
        listItems: ['drywall tape', 'sand paper', 'screws', 'ladder', 'grout'],
    },
    {
        listName: 'clothes',
        listId: uuid(),
        listItems: ['shirts', 'pants', 'shoes', 'socks'],
    },
    {
        listName: 'paint',
        listId: uuid(),
        listItems: ['flat white', 'classic sand', 'rollers', 'masking tape', 'scraper', 'fresh gray'],
    },
]


//routes
//render index page
app.get('/lists', (req,res) => {
    res.render('lists', { toDoList })
})

//render new page
//needs styling
app.get('/lists/new', (req,res) => {
    res.render('lists/new', { toDoList })
})

//adds items to list
//need to add new input field on enter, formatting needs repair...
app.post('/lists', (req,res) => {
    const { listName, listItems } = req.body;
    toDoList.push({ listName, listId: uuid(), listItems });
    res.redirect('/lists')
})

//shows full list
//only works with UUID
app.get('/lists/:id', (req,res) => {
    const { id } = req.params;
    const list = toDoList.find( c => c.listId === id);
    console.log( list.listName )
    res.render('lists/show', { list, toDoList });
})

//f
app.get('/lists/:id/edit', (req,res) => {
    const { id } = req.params;
    const list = toDoList.find( c => c.listId === id);
    res.render('lists/edit', { list, toDoList });
})

//updating list item 
app.patch('/lists/:id', (req,res) => {
    res.send('updating something')
    // const { id } = req.params;
    // const newListText = req.body.listItems;
    // const foundList = toDoList.find( c => c.id === id);
    // foundList.listItems = newListText;
    // res.redirect('/lists');
})

app.delete('/lists/:id', (req,res) => {
    const { id } = req.params;
    listId = listId.filter( c => c.id !== id );
    res.redirect('/lists', { toDoList });
})

app.listen(3030, () => {
    console.log('ON PORT 3030!')
})