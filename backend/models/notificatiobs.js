const mongoose = require('mongoose');

async function main(){
    await mongoose.connect(
        "mongodb+srv://govindanipiyush:AyO5vhqyUBTisU0E@fairshare.4tlnw.mongodb.net/?retryWrites=true&w=majority&appName=fairshare"
    );
}
main()
.then(()=>{
    console.log("Notifications connected");
})
.catch((err)=>{
    console.error("Problem connecting notifications");
})

const notificationsSchema = new mongoose.Schema({
    
})