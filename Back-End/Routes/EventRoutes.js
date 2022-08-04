const express = require('express');
const { createEvent,removeMember,getGuestByEvent,removeGuest,assignTask,changeDesc,getMembersByEvent,removeNote,assignTaskByName,
    sendRequestByName,changeStatus,getTasksByEventId,getEventByID,addGuest,sendRequest,addNotes,getAllEvents,getNotesOfEvent, 
    addNotification, 
    getNotifications,
    removeNotification} = require('../controllers/EventController');
    
const router = express.Router();
router.route('/getMembers/:eventId').get(getMembersByEvent)
router.route('/event/:eventId').get(getEventByID);
router.route('/addGuest').post(addGuest)
router.route('/getEventGuest/:id').get(getGuestByEvent)

router.route('/removeGuest').post(removeGuest)

router.route('/event').post(createEvent);
router.route('/addNote').post(addNotes);
router.route('/removeNote').post(removeNote);
router.route('/getEvents').get(getAllEvents);
router.route('/notesOfEvent').post(getNotesOfEvent);
router.route('/sendRequest').post(sendRequest);
router.route('/assignTask').post(assignTask);
router.route('/getEventTasks/:eventId').get(getTasksByEventId);
router.route('/changeStatus').post(changeStatus);
router.route('/changeDesc').post(changeDesc);
router.route('/sendReqByName').post(sendRequestByName);
router.route('/assignTaskByName').post(assignTaskByName);
router.route('/removeMember').post(removeMember);
router.route('/addNotification').post(addNotification)
router.route('/getNotifications/:userId').get(getNotifications)
router.route('/removeNotification').post(removeNotification)

module.exports = router;