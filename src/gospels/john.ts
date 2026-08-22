import { sharedSafeguards } from '../shared.js';
import type { GospelAgentProfile } from '../types.js';

export const johnAgent: GospelAgentProfile = {
  id: 'understanding-john',
  gospel: 'John',
  title: 'Understanding John',
  overview:
    "Read John as its own reflective witness to Jesus through signs, testimony, symbolic language, misunderstanding, Israel's feasts and Scriptures, the hour of glory, and the stated purpose that readers may believe and have life.",
  learningGoal:
    "Explain how a passage contributes to John's witness to Jesus' identity and life-giving mission, using signs, testimony, literary context, Scripture echoes, and John's stated purpose as evidence.",
  literaryShape: [
    { range: 'John 1:1-18', title: 'Prologue', focus: 'Word, creation, life, light, witness, incarnation, glory, grace, and the revelation of God.' },
    { range: 'John 1:19-12:50', title: 'Signs and public witness', focus: "Testimony, signs, feasts, symbolic teaching, conflict, belief, unbelief, and the approach of Jesus' hour." },
    { range: 'John 13:1-20:31', title: 'Love, glory, cross, and resurrection', focus: "Footwashing, farewell teaching, prayer, passion, resurrection appearances, and the Gospel's stated purpose." },
    { range: 'John 21:1-25', title: 'Epilogue', focus: "Recognition, restored vocation, testimony, following, and the continuing abundance of Jesus' works." },
  ],
  lenses: [
    { id: 'signs-and-testimony', title: 'Signs and testimony', instruction: 'Ask what a sign reveals, who bears witness, and how people respond to the testimony they receive.' },
    { id: 'symbol-and-misunderstanding', title: 'Symbol and misunderstanding', instruction: 'Notice words with more than one level of meaning and how misunderstanding opens a deeper claim.' },
    { id: 'scripture-and-feasts', title: 'Scripture and feasts', instruction: "Trace Israel's Scriptures, festivals, places, and symbols without detaching Jesus from Israel's story. Read contested group labels in their local narrative setting rather than generalizing them to Jewish people." },
    { id: 'love-glory-and-the-hour', title: 'Love, glory, and the hour', instruction: "Follow how service, love, glorification, suffering, death, and exaltation converge in Jesus' hour." },
    { id: 'belief-and-life', title: 'Belief and life', instruction: 'Relate the passage to John 20:30-31 and state what kind of recognition, trust, or life the scene places before the reader.' },
  ],
  startingPoints: [
    { reference: 'John 1:1-18', question: 'How does the prologue teach readers to understand Jesus?', role: "The Gospel's opening frame" },
    { reference: 'John 2:1-11', question: 'What does John mean by calling this event a sign?', role: 'Signs and glory' },
    { reference: 'John 13:1-17', question: 'How does Jesus define love and lordship in action?', role: 'Love and service' },
    { reference: 'John 20:24-31', question: "How does this scene serve the Gospel's stated purpose?", role: 'Testimony, belief, and life' },
  ],
  safeguards: sharedSafeguards('John'),
};
