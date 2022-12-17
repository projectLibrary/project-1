const {Books} = require('../../data/models');
const ResponseModel = require('../../utilities/responseModel');
const tokenHandlers = require('../../utilities/tokenHandlers');
const {Authors} = require('../../data/models');
const {Categories} = require('../../data/models');



// Get all books
getAllBooks = async (req, res) => {
    const books = await Books.findAll( );
    res.json(new ResponseModel(books));
}

//add books
addBook = async (req, res) => {
    try{
        const {bookname, summary} = req.body;
        const firstname = req.body.firstname;
        const lastname =req.body.lastname;
        const categoryname=req.body.categoryname

    

    
        const bookExists = await Books.findOne({where: {bookname: bookname}});

        if(bookExists){
            return res.status(400)
                .json(new ResponseModel(null, null, ['Book already exists.']));
        }

        else{
         var author = await Authors.findOne({where: {firstname:firstname,lastname:lastname}})
         if(!author){
             // create author.
             author = await Authors.create({
                firstname:firstname,
                lastname:lastname

             })
         }
        const category = await Categories.findOne({where:{name:categoryname}})
        console.log(category);
        var books = await Books.create({
            bookname: bookname,
            summary: summary,
            availability:'Available',
            authorId: author.dataValues.id,
            categoryId:category.dataValues.id
            

        });
        res.json(new ResponseModel(Books));

    }


}
    catch(err){
        console.log(err);
        res.status(500).json(new ResponseModel(null, null, ['Unable to create book.']));
    }
}


deleteBook = async (req, res, next) => {
    let id = req.params.id;
    let bookFromDb = await Books.findByPk(id);
    if (bookFromDb != null) {
        await Books.destroy({
            where: {
                id:id
            }
        });
        res.json(new ResponseModel(bookFromDb));
    }
}

module.exports={ addBook, deleteBook,getAllBooks}