const express = require('express');

//importing body-parser
var bodyParser = require("body-parser");

//Daatbase
const database = require('./database');

const booky = express();

//to initialize body-parser
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

// booky.use(express.json());

/*
Route             /
Description       Get all the books
Access            Public
Parameter         None
Methods           Get
*/
booky.get("/",(req,res) =>{
    return res.json({books: database.books});
});

/*
Route             /is
Description       Get specific book based on ISBN No.
Access            Public
Parameter         isbn
Methods           Get
*/

booky.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`})
    } 

    return res.json({book: getSpecificBook})
})

/*
Route             /c
Description       Get specific book based on Category.
Access            Public
Parameter         category
Methods           Get
*/

booky.get("/c/:category", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for category of ${req.params.categpry}`})
    }

    return res.json({book: getSpecificBook})
});


/*
Route             /l
Description       Get specific book based on languages.
Access            Public
Parameter         Language
Methods           Get
*/

booky.get("/l/:language", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)
    );

    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for the category of ${req.params.language}`})
    }

    return res.json({book: getSpecificBook})
});

/*
Route             /author
Description       Get all authors.
Access            Public
Parameter         None
Methods           Get
*/

booky.get("/author",(req,res) => {
    return res.json({authors: database.author})
});



/*
Route             /author/id
Description       Get all specific author based on id.
Access            Public
Parameter         id
Methods           Get
*/

booky.get("/author/id/:id", (req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    );

    if(getSpecificAuthor.length === 0) {
        return res.json({error: `No author found for the ID of ${req.params.id}`})
    } 

    return res.json({authors: getSpecificAuthor})
})

/*
Route             /author/book
Description       Get all specific author based on books.
Access            Public
Parameter         isbn
Methods           Get
*/

booky.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthor.length === 0) {
        return res.json({error: `No author found for the ISBN of ${req.params.isbn}`})
    } 

    return res.json({authors: getSpecificAuthor})
})

/*
Route             /author/name
Description       Get all specific author based on name.
Access            Public
Parameter         name
Methods           Get
*/

booky.get("/author/name/:name", (req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.name.includes(req.params.name)
    );

    if(getSpecificAuthor.length === 0) {
        return res.json({error: `No author found for the name of ${req.params.name}`})
    } 

    return res.json({authors: getSpecificAuthor})
})

/*
Route             /publication
Description       Get all publicatons
Access            Public
Parameter         none
Methods           Get
*/

booky.get("/publication",(req,res) => {
    return res.json({publ: database.publication})
})

/*
Route             /book/new
Description       Add New books
Access            Public
Parameter         none
Methods           POST
*/

booky.post("/book/new",(req,res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});
});

/*
Route             /author/new
Description       Add New Authors
Access            Public
Parameter         none
Methods           POST
*/

booky.post("/author/new",(req,res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({updatedAuthors: database.author});
});

/*
Route             /publication/new
Description       Add New Publications
Access            Public
Parameter         none
Methods           POST
*/

booky.post("/publication/new",(req,res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json({updatedPublications: database.publication});
});

/*PUT Method*/

/*
Route             /publication/update/book
Description       Update or Add New Publications
Access            Public
Parameter         isbn
Methods           PUT
*/

booky.put("/publication/update/book/:isbn", (req,res) => {
    //Update the publication database
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubId) {
            return pub.books.push(req.params.isbn)
        }
    });
        
    //Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publications = req.body.pubId;
            return;
        }
    });

    return res.json (
        {
            books: database.books,
            publication: database.publication,
            message: "Successfully updates pubications"
        }
    );

});

/*DELETE Method*/

/*
Route             /book/delete
Description       Delete a Book
Access            Public
Parameter         isbn
Methods           DELETE
*/

booky.delete("/book/delete/:isbn", (req,res) => {
    //whichever book that doesn't match  with the isbn, just send it to an udatedBookDatabase array
    //and rest will be filtered out
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updatedBookDatabase;

    return res.json({books: database.books});
});



/*
Route             /book/delete/author
Description       Delete a Book
Access            Public
Parameter         isbn , authorId
Methods           DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId",(req,res) =>{
    //Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }
    });

    //Update the author database
    database.author.forEach((eachAuthor) => {
        if(eachAuthor.id === parseInt(req.params.authorId)) {
            const newBookList = eachAuthor.books.filter(
                (book) => book !== req.params.isbn
            );
            eachAuthor.books = newBookList;
            return;
        }
    });

    return res.json({
        book: database.books,
        author: database.author,
        message: "Author was deleted!!"
    });
});

/*
Route             /publication/id
Description       Get all publicatons
Access            Public
Parameter         none
Methods           Get
*/

booky.get("/publication/id/:id", (req,res) => {
    const getSpecificPubl = database.publication.filter(
        (publ) => publ.id === parseInt(req.params.id)
    );

    if(getSpecificPubl.length === 0) {
        return res.json({error: `No Publication found for the ID of ${req.params.id}`})
    } 

    return res.json({authors: getSpecificPubl})
})


/*
Route             /publication/name
Description       Get all specific publication based on name.
Access            Public
Parameter         name
Methods           Get
*/

booky.get("/publication/name/:name", (req,res) => {
    const getSpecificPubl = database.publication.filter(
        (publ) => publ.name.includes(req.params.name)
    );

    if(getSpecificPubl.length === 0) {
        return res.json({error: `No publication found for the name of ${req.params.name}`})
    } 

    return res.json({authors: getSpecificPubl})
})


/*
Route             /publication/book
Description       Get all specific publication based on books.
Access            Public
Parameter         name
Methods           Get
*/

booky.get("/publication/book/:book", (req,res) => {
    const getSpecificPubl = database.publication.filter(
        (publ) => publ.books.includes(req.params.book)
    );

    if(getSpecificPubl.length === 0) {
        return res.json({error: `No publication found for the name of ${req.params.book}`})
    } 

    return res.json({authors: getSpecificPubl})
})


booky.listen(3000,() => {
    console.log("Server is up and running on Port No. 3000")
});