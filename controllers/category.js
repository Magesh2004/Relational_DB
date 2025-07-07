//db
const prisma = require('../config/db');
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
    sendResponse(res,201,true,"Succesfully created")
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
    sendResponse(res,200,true,"Successfully fetched",{category})
}
module.exports.UpdateCategory = async(req,res)=>{
    const {catId} = req.params;
    const {name} = req.body
    const id = parseInt(catId)
    const category = await prisma.category.update({
        where:{
            id:id
        },data:{
            name:name
        }
    })
    sendResponse(res,200,true,"Successfully updated",{category})
}

// module.exports.AddBookToCategory = async(req,res)=>{
//     const {catid,bookid} = req.params
//     const cId = parseInt(catid)
//     const bId = parseInt(bookid)
//     const book = await prisma.book.update({
//         where:{
//             id:bId
//         },
//         data:{
//             categories:{
//                 create:[
//                     {
//                         category:{
//                             connect:{
//                                 id:cId
//                             }
//                         }
//                     }
//                 ]
//             }
//         }
//     })
//     sendResponse(res,200,true,"Successfully added to categoty",{book})
// }

module.exports.AddBookToCategory = async (req, res) => {
  const { catid, bookid } = req.params;
  const cId = parseInt(catid);
  const bId = parseInt(bookid);

  const bookCategory = await prisma.bookCategory.create({
    data: {
      book: { connect: { id: bId } },
      category: { connect: { id: cId } }
    }
  });

  sendResponse(res, 200, true, "Successfully added book to category", { bookCategory });
};