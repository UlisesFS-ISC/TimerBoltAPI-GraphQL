const TimeEntry = require('../models/timer-entry');
const ScheduleEntry = require('../models/schedule-entry');

var uuidv1 = require('uuid/v1');

const resolvers = {
    timeEntry: async (args, context) => {
        return (await TimeEntry.findOne({uuid: args.uuid}));
    },
    timeEntriesByUser: async (args, context) => {
        return (await TimeEntry.find({userName: args.name}));
    },
    addTimeEntry: async (args, context) => {
        var newTimeEntry = new TimeEntry({
            uuid: uuidv1(),
            timeEntryName: args.timeEntryName,
            timeElapsed: args.timeElapsed,
            userName: args.userName,
            activityTag: args.activityTag,
            datePosted: new Date()
        });

        var err = await newTimeEntry.save();

        if (err) return err;
        return newTimeEntry;
    },
    deleteTimeEntry: async (args, context) => {
        console.log(args);
        var doc = await TimeEntry.findOneAndRemove({
            uuid: args.uuid
        });
        return doc
    },
    scheduleEntry: async (args, context) => {
        return (await ScheduleEntry.findOne({uuid: args.uuid}));
    },
    scheduleEntriesByUser: async (args, context) => {
        return (await ScheduleEntry.find({userName: args.name}));
    },
    addScheduleEntry: async (args, context) => {
        var newScheduleEntry = new ScheduleEntry({
            uuid: uuidv1(),
            scheduleEntryName: args.scheduleEntryName,
            scheduledDayTime: args.scheduledDayTime || "",
            userName: args.userName,
            activityTag: args.activityTag,
             //datePosted has to be provided by the client to handle timezone variances- todo
            activeInDays: args.activeInDays || [],
            singleUse: args.singleUse
        });
        var err = await newScheduleEntry.save();
        await console.log('err', err);
        if (err)
        return newScheduleEntry;
    },
    deleteScheduleEntry: async (args, context) => {
        var doc = await ScheduleEntry.findOneAndRemove({
            uuid: args.uuid
        });
        return doc
    }
};

module.exports = resolvers;