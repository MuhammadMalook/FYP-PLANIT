const PersonSchema = require('../model/Person')
const EventSchema = require('../model/Event')
const bcrypt = require('bcryptjs')
const TasksSchema = require('../model/Task')
const catchAsyncErrors = require('../middlewares/catchAsyncError');

exports.requestsDetailsById = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    const foundPerson = await PersonSchema.findById(userId);
    if (foundPerson) {
        const requestDetailedData = [];
        const requestList = foundPerson.requests;
        if (requestList.length == 0) 
        {
            res.status(401).json({
                success: false,
                msg: "has no requests"

            })
        }
        else {
            const allEvents = await EventSchema.find();
            for (let i = 0; i <allEvents.length; i++) 
            {
                for (let j = 0; j <requestList.length; j++) 
                {
                    if (allEvents[i]._id == requestList[j].id)
                        requestDetailedData.push(allEvents[i])
                }
                    
            }
            res.status(200).json({
                success: true,
                requestList,
                requestDetailedData
            })
        }
    }
    else {
        res.status(402).json({
            success: false

        })
    }


})
exports.getAllNames =  catchAsyncErrors(async (req, res, next) => {
    const persons =  await PersonSchema.find();
    const  namesList =   persons.map(person=> person.name);
    if( namesList.length==0)
    {
        res.status(200).json(
            {
                success : false,
                message: "Not Person"
            }
        )
    }
    else
    {
        
        res.status(200).json(
            {
                success : true,
                namesList
            }
        )
    }

})
exports.myEvents = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;
    const events = await EventSchema.find();
    const updateList = [];
    const eventsByUserId = events.filter(item => {
        if (item.userId == id) {
            updateList.push(item)
            return item;
        }
    });
    if (eventsByUserId.length != 0) {

        res.status(200).json({
            success: true,
            list: eventsByUserId
        })
    }
    else
        res.status(404).json({
            success: false,
            message: "Not Found Admin of Any Event"
        })
})
exports.getEventByUserId = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;
    const events = await EventSchema.find();
    const teamsLists = events.filter(event => 
    {
        const listofOneTeam = event.team;
        if(event.userId== id)
            return event;
        console.log(listofOneTeam)  
        for(let i=0; i<listofOneTeam.length; i++)
        {
            if(id == listofOneTeam[i].id)
            return event;
        }
    });
    if (teamsLists.length == 0)
        res.status(404).json({
            success: false,
            message: "not found the user in any team"
        })
    else
        res.status(200).json({
            success: true,
            events: teamsLists
        })
})




exports.getEventsInfo = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;
    const events = await EventSchema.find();
    let obj = {"totalEvents":0, "myEvents":0, "completed":0, "tasksAssigned":0,"pendingEvents":0, "totalNotes":0, "requests":0};
    const allEvents = events.filter(event => 
    {
        const listofOneTeam = event.team;
        if(event.userId == id)
            return event;
        console.log(listofOneTeam, "hello")  
        for(let i=0; i<listofOneTeam.length; i++)
        {
            if(id == listofOneTeam[i].id)
            return event;
        }
    });

    if (allEvents.length == 0){
    res.status(404).json({
        success: false,
        message: "not found the user in any team"
    })
    return
}
    const myEvents = events.filter(event=>{
        if(event.userId == id)
            return event;
        
    })
    let completedEvents =0;
    let pendingEvents = 0;
    let totalNotes=0
    for (let i=0; i<allEvents.length; i++)
    {
        totalNotes+=allEvents[i].notes.length
        if(allEvents[i].eventStatus)
        {
            completedEvents++
        }
        else
            pendingEvents++;
    }

    let reqs=0, tasksAs=0;
     PersonSchema.findOne({_id:id}).then(async user=>{
        if(user){
    
                tasksAs= await user.tasks.length
                reqs = await user.requests.length
                console.log(reqs);  
                obj.requests = reqs;
                obj.tasksAssigned = tasksAs;
            

                obj.pendingEvents = pendingEvents
                obj.completed = completedEvents;
                obj.myEvents = myEvents.length;
                obj.totalEvents=allEvents.length;
                obj.totalNotes = totalNotes;

                res.status(200).json({success:true,obj})

        }
        else
            res.status(402).json(
            {
                success: false,
                msg: "userNotFound"
            }
        )
    }).catch(err => {
        console.log('error', err);
    });
   
   


   
    // if (teamsLists.length == 0)
    //     res.status(404).json({
    //         success: false,
    //         message: "not found the user in any team"
    //     })
    // else
    //     res.status(200).json({
    //         success: true,
    //         events: teamsLists
    //     })
})


exports.deletePerson = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;
    const deletedPerson = await PersonSchema.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        deletedPerson
    })
})
exports.findByName = catchAsyncErrors(async (req, res, next) => {

    const name = req.params.name;
    const listUsers = await PersonSchema.find();
    const foundUser = listUsers.find((user) => {
        if (user.name == name) {
            return user;
        }
        else return null;
    })
    if (foundUser)
        res.status(200).json(
            {
                success: true,
                foundUser
            }
        )
    else {
        res.status(402).json(
            {
                success: false,
                msg: "userNotFound"
            }
        )

    }
})
exports.login = catchAsyncErrors(async (req, res, next) => {
   // console.log("hello inot login")
    let { email, password } = req.body
    email = email.trim()
    PersonSchema.findOne({email}).
    then(user => {
        if(!user){ return res.status(404).json({message: "user not found"});}
        else{
            bcrypt.compare(password, user.password, (err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "error while checking user password"});
                } 
                else if (compareRes) 
                { // password match
                    
                    res.status(200).json({
                                success: true,
                                user
                            })
                } 
                else { // password doesnt match
                    res.status(401).json({message: "invalid credentials"+ user + " "+compareRes});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });

    // const listUsers = await PersonSchema.find();
    // console.log(listUsers +" hello ")

    // const users = listUsers.find((user) => {
    //     //const passwordMatch = await bcrypt.compare(password,user.password);
    //     if (user.name == name && user.password == password) {
    //         console.log('hello, '+user)
    //         return user;
    //     }
    //     else return null;
    // })
    // console.log(users)
    // if (users) {

    //     res.status(200).json({
    //         success: true,
    //         users
    //     })

    // }
    // else
    // {
    //     res.status(200).json({
    //         success:false,
    //         message: "Incorrect Email or Password"
    //     })
    // }
})
exports.getAllpersons = catchAsyncErrors(async (req, res, next) => {
    const allPerons = await PersonSchema.find();
    if (allPerons) {
        res.status(200).json({
            success: true,
            persons: allPerons
        })
    }
    else {
        res.status(402).json({
            success: false,
        })
    }
})
exports.updatePerson = catchAsyncErrors(async (req, res, next) => {
    const { id, name, email, number, imageUrl } = req.body;
    console.log(id,name)
    const updateUserData =
    {
        name, email, number, imageUrl
    };
    const updated = await PersonSchema.findByIdAndUpdate(id, updateUserData,{new:true})
    console.log(updated)
    if (updated) {
        res.status(200).json({
            success: true,
            updated
        })
    }
    else {
        res.status(402).json({
            success: false,
        })

    }
})
exports.getPersonByID = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const personFetched = await PersonSchema.findById(id);
    if (personFetched)
        res.status(200).json({
            success: true,
            personFetched
        })
    else
        res.status(401).json({
            success: false,
        })
})

exports.addPerson = catchAsyncErrors(async (req, res, next) => {
    const { name, email, number, password } = req.body;
    const passwordHash = await bcrypt.hash(password,10);
    const personCreated = await PersonSchema.create({
        name, password:passwordHash, email, number
    });
    res.status(200).json({
        success: true,
        personCreated
    })
})


// exports.updatePerson = catchAsyncErrors(async (req, res, next) => {
//     const data = req.body;
//     const {id} = req.body;
//     PersonSchema.updateOne(id,data, (err , collection) => {
// 		if(err) throw err;
// 		console.log("Record updated successfully");
// 		console.log(collection);
// 	})
    
//     res.status(200).json({
//         success: true,
//         personCreated
//     })
// })


exports.getTasksByUser = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    const allTasks = await TasksSchema.find();
    const filteredById = allTasks.filter((item) => {

        if (item.assignTo == userId) {
            return item;
        }

    }
    );
    res.status(200).json({
        success: true,
        filteredById,

    })
})


exports.getUnCompletedTasksByUser = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    const allTasks = await TasksSchema.find();
    const filteredById = allTasks.filter((item) => {
        if (item.assignTo == userId) {
            if (!item.taskStatus)
                return item;
        }

    }
    );
    res.status(200).json({
        success: true,
        filteredById,
    })
})
exports.getCompletedTasksByUser = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    const allTasks = await TasksSchema.find();
    const filteredById = allTasks.filter((item) => {


        if (item.assignTo == userId) {
            if (item.taskStatus)
                return item;
        }

    }
    );
    res.status(200).json({
        success: true,
        filteredById,

    })
})

exports.completeTasks = catchAsyncErrors(async (req, res, next) => {
    const { taskId, userId } = req.body;
    const foundTask = await TasksSchema.findById(taskId);
    foundTask.taskStatus = true;
    await TasksSchema.updateOne({ _id: taskId }, { taskStatus: true });

    res.status(200).json({
        success: true,
        foundTask

    })
})
exports.requestsById = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    const foundPerson = await PersonSchema.findById(userId);
    if (foundPerson) {
        const requestList = foundPerson.requests;

        res.status(200).json({
            success: true,
            requestList
        })
    }
    else {
        res.status(402).json({
            success: false

        })
    }


})
exports.cancelRequest = catchAsyncErrors(async (req, res, next) => {
    const { userId, eventId } = req.body;
    const foundPerson = await PersonSchema.findById(userId);
    if(foundPerson)
    {
        const requestList = foundPerson.requests;
        const index = searchIndex(requestList, eventId);
        if (index != -1) 
        {
            foundPerson.requests.splice(index, 1);
            const updatedPerson = await PersonSchema.updateOne({ _id: foundPerson._id }, { member: [...foundPerson.member], requests: [...requestList] });
            res.status(200).json({
                success: true,
            })

        }
        else {

            res.status(402).json({
                success: false,
                msg: "Not Found The Event",
                requestList,
                index
            })
        }

    }
    else
    {
        res.status(400).json({
            success:false,
            message: "Person Not Found"
        })
    }
    

    

})

exports.acceptRequest = catchAsyncErrors(async (req, res, next) => {
    const { userId, eventId, eventName } = req.body;
    const foundPerson = await PersonSchema.findById(userId);
    if (foundPerson) {
        const requestList = foundPerson.requests;

        const index = searchIndex(requestList, eventId);

        if (index != -1) {

            const addingToEvent = foundPerson.requests.splice(index, 1);

            foundPerson.member.push(addingToEvent[0])
            


            const eventByID = await EventSchema.findById(eventId);

            eventByID.team.push({ id: foundPerson._id, name: foundPerson.name })

            requestList.splice(index, 1);

            // const UpdatedEvent = await EventSchema.updateOne(eventByID);
            // const updatedPerson = await PersonSchema.updateOne(foundPerson);

            const UpdatedEvent = await EventSchema.updateOne({ _id: eventByID._id }, { team: [...eventByID.team] });
            const updatedPerson = await PersonSchema.updateOne({ _id: foundPerson._id }, { member: [...foundPerson.member], requests: [...requestList] });
            res.status(200).json({
                success: true,
            })
        }
        else {

            res.status(402).json({
                success: false,
                msg: "Not Found The Event",
                requestList,
                index
            })
        }
    }
    else {
        res.status(402).json({
            success: false,
            msg: "User  Not Found"
        })
    }
})
const searchIndex = (list, id) => {
    let boolean = false;
    list.forEach((element, i) => {
        console.log(element.id == id)
        if (element.id == id) {
            boolean = true;
            return i;
        }
    });
    if (!boolean) {
        return -1;
    }
}
