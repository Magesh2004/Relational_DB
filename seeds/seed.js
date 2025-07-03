const prisma = require('../config/db')

async function seedDB(){
    try{
        await prisma.cart.deleteMany();
        await prisma.user.deleteMany();
        console.log("All data deleted successfully.");
        // const user = await prisma.user.create({
        //         data : {
        //         name:"Zoro"
        //         }
        //     }
        // )
        // let cart = await prisma.cart.create({
        //         data:{
        //             user : {
        //                 connect : {id : user.id}
        //             }
        //         }
        //     }
        // )
        // await prisma.user.update({
        //     where: { id: user.id },
        //     data: { cartId: cart.id },
        // });


        // console.log("Data added successfully");
        // console.log({user,cart})
    }catch(err){
        console.log(err);
    }finally{
        await prisma.$disconnect;
        console.log("DB is disconnected")
    }

}
seedDB()