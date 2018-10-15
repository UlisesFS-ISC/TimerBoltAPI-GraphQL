const { buildSchema } = require('graphql');

module.exports = new buildSchema(`
  type TimeEntry {
    uuid: String
    timeEntryName: String!
    timeElapsed: String!
    userName: String!
    datePosted: String!
    activityTag: String!
  }
   type ScheduleEntry {
    uuid: String
    scheduleEntryName: String!
    scheduledDayTime: String
    userName: String!
    activityTag: String!
    datePosted: String
    activeInDays: [String]
    singleUse: Boolean!
  }

  type Query { 
    timeEntry(uuid: String!): TimeEntry!
    timeEntriesByUser(name: String!): [TimeEntry!]!
    scheduleEntry(uuid: String!): ScheduleEntry!
    scheduleEntriesByUser(name: String!): [ScheduleEntry!]!
  }
  type Mutation {
    addTimeEntry(timeEntryName: String!, timeElapsed: String!, userName: String!, activityTag: String!): TimeEntry!
    deleteTimeEntry(uuid: String!): TimeEntry!
    addScheduleEntry(scheduleEntryName: String!, scheduledDayTime: String, userName: String!, activityTag: String!, activeInDays: [String!], singleUse: Boolean!): ScheduleEntry!
    deleteScheduleEntry(uuid: String!): ScheduleEntry!
  }
`);