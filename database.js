const books = [
    {
        ISBN: "1234Book",
        title: "Tesla",
        pubDate: "2021-08-23",
        language: "English",
        numPage: "250",
        author: [1,2],
        publications: [1],
        category:["tech", "space","sci-fi"]
    }
]

const author = [
    {
        id: 1,
        name: "Chithra",
        books: ["1234Book","SecretBook"]
    },
    {
        id: 2,
        name: "Micheal Faraday",
        books: ["1234Book"]
    }
]

const publication = [
    {
        id: 1,
        name: "Writex",
        books: ["Secret Book"]
    },
    {
        id: 2,
        name: "Sonal",
        books: ["Love is Eternal"]
    },
    {
        id: 3,
        name: "Yashvardhan",
        books: ["Bad Girl"]
    },
    {
        id: 4,
        name: "Pentex",
        books: [""]
    }
]

module.exports = {books,author,publication};