import { sharedSafeguards } from '../shared.js';
import type { GospelAgentProfile } from '../types.js';

export const lukeAgent: GospelAgentProfile = {
  id: 'understanding-luke',
  gospel: 'Luke',
  title: 'Understanding Luke',
  overview:
    "Read Luke as its own carefully arranged account of God's saving purpose in Jesus, marked by the Holy Spirit, prayer, reversal, table fellowship, mercy, and the long journey toward Jerusalem.",
  learningGoal:
    "Explain how a passage contributes to Luke's account of God's saving purpose in Jesus, attending to the Spirit, prayer, reversal, welcome, and the narrative journey to Jerusalem.",
  literaryShape: [
    { range: 'Luke 1:1-4:13', title: 'Promise and preparation', focus: 'Ordered purpose, paired birth narratives, songs, Scripture, baptism, genealogy, and testing.' },
    { range: 'Luke 4:14-9:50', title: 'Ministry in Galilee', focus: 'Jesus announces good news, teaches, heals, gathers disciples, and reveals his identity and mission.' },
    { range: 'Luke 9:51-19:27', title: 'The journey to Jerusalem', focus: 'Travel, discipleship, prayer, parables, hospitality, possessions, reversal, and the seeking of the lost.' },
    { range: 'Luke 19:28-24:53', title: 'Jerusalem, passion, and resurrection', focus: 'Temple, final teaching, meal, cross, empty tomb, opened Scriptures, and promised witness.' },
  ],
  lenses: [
    { id: 'spirit-and-prayer', title: 'Spirit and prayer', instruction: "Notice the work of the Holy Spirit, scenes of prayer, and moments when God's purpose is announced or discerned." },
    { id: 'scripture-and-purpose', title: 'Scripture and saving purpose', instruction: "Trace how Israel's Scriptures, promises, and hopes are heard within Luke's account of God's saving action." },
    { id: 'reversal-and-mercy', title: 'Reversal and mercy', instruction: 'Ask who is lifted up, brought low, restored, forgiven, found, or invited to respond differently.' },
    { id: 'table-and-neighbor', title: 'Table and neighbor', instruction: 'Attend to meals, hospitality, wealth, poverty, social boundaries, and the identities of hosts, guests, and neighbors.' },
    { id: 'journey-and-witness', title: 'Journey and witness', instruction: 'Locate the passage on the road to Jerusalem and ask how it prepares disciples to become witnesses after the resurrection.' },
  ],
  startingPoints: [
    { reference: 'Luke 1:1-4', question: 'What does Luke say he is trying to provide?', role: 'Purpose and method' },
    { reference: 'Luke 4:16-30', question: 'How does Jesus describe his Spirit-anointed mission?', role: 'Programmatic mission' },
    { reference: 'Luke 10:25-37', question: 'How does the parable redefine the question of the neighbor?', role: 'Mercy and discipleship' },
    { reference: 'Luke 24:13-35', question: 'How are Scripture, recognition, and witness joined?', role: 'Resurrection and opened understanding' },
  ],
  safeguards: sharedSafeguards('Luke'),
};
