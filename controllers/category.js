//db
const prisma = require('../config/db');
const ExpressError = require('../utils/ExpressError');
//utils
const sendResponse = require('../utils/sendResponse')

module.exports.FetchAllCategory = async(req,res)=>{
    const category = await prisma.category.findMany();
    sendResponse(res,200,true,"Successfully fetched",{category})
}

module.exports.CreateNewCategory = async(req,res)=>{
    const {name} = req.body
    const newCategory  = await prisma.category.create({
        data:{
            name:name
        }
    })
    sendResponse(res,201,true,"Succesfully created",{newCategory})
}
module.exports.FetchSpecificCategory = async(req,res)=>{
    const {catId} = req.params;
    const id = parseInt(catId)
    const category = await prisma.category.findUnique({
        where:{
            id:id
        },include:{
            books:{
                include:{
                    book:true
                }
            }
        }
    })
    if(!category)throw new ExpressError(404,"Category doesn't exist")
    sendResponse(res,200,true,"Successfully fetched",{category})
}
module.exports.UpdateCategory = async(req,res)=>{
    const {catId} = req.params;
    const {name} = req.body
    const id = parseInt(catId)
    const existingCategory = await prisma.category.findUnique({
        where:{
            id
        }
    })
    if(!existingCategory)throw new ExpressError(400,"Category doesn't exist")
    const category = await prisma.category.update({
        where:{
            id
        },data:{
            name
        }
    })
    sendResponse(res,200,true,"Successfully updated",{category})
}


module.exports.AddBookToCategory = async (req, res) => {
    const { catid, bookid } = req.params;
    const cId = parseInt(catid);
    const bId = parseInt(bookid);
    const book = await prisma.book.findUnique({
        where:{
            id:bId
        }
    })
    if(!book)throw new ExpressError(400,"Book doesn't exist")
    const category = await prisma.category.findUnique({
        where:{
            id:cId
        }
    })
    if(!category)throw new ExpressError(400,"Category doesn't exist")

    const existingCategory = await prisma.bookCategory.findUnique({
        where:{
            bookId: bId,
            categoryId: cId
        }
    })
    if(!existingCategory)throw new ExpressError(400,"The Book is already in the category")
    const bookCategory = await prisma.bookCategory.create({
        data: {
        book: { connect: { id: bId } },
        category: { connect: { id: cId } }
        }
    });
    sendResponse(res, 200, true, "Successfully added book to category", { bookCategory });
};