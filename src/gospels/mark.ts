import { sharedSafeguards } from '../shared.js';
import type { GospelAgentProfile } from '../types.js';

export const markAgent: GospelAgentProfile = {
  id: 'understanding-mark',
  gospel: 'Mark',
  title: 'Understanding Mark',
  overview:
    "Read Mark as its own urgent narrative of Jesus' authority, contested identity, suffering way, and the difficult process by which disciples learn what it means to follow the crucified Messiah.",
  learningGoal:
    "Explain how a passage advances Mark's revelation of Jesus' identity and the cost of discipleship, using Mark's pacing, narrative turns, and movement toward the cross as evidence.",
  literaryShape: [
    {
      range: 'Mark 1:1-8:26',
      title: 'Authority and the question of identity',
      focus: 'Rapid ministry, healings, controversies, parables, fear, misunderstanding, and partial sight.',
    },
    {
      range: 'Mark 8:27-10:52',
      title: 'The Messiah and the way',
      focus: "Peter's confession, repeated passion predictions, discipleship instruction, and the journey toward Jerusalem.",
    },
    {
      range: 'Mark 11:1-16:8',
      title: 'Jerusalem, cross, and empty tomb',
      focus: "Temple conflict, final teaching, passion, crucifixion, burial, and the women's fearful response at 16:8. Consult the Scripture source's textual note before discussing longer endings.",
    },
  ],
  lenses: [
    { id: 'pace-and-conflict', title: 'Pace and conflict', instruction: 'Notice urgency, scene changes, escalating opposition, and how one episode sharpens the next.' },
    { id: 'authority-and-identity', title: 'Authority and identity', instruction: 'Track what Jesus does, who recognizes him, who misunderstands him, and what remains hidden or contested.' },
    { id: 'seeing-and-misunderstanding', title: 'Seeing and misunderstanding', instruction: 'Ask how physical sight, spiritual perception, fear, and failed understanding interact in the passage.' },
    { id: 'cross-shaped-messiah', title: 'A cross-shaped Messiah', instruction: "Read claims about Jesus in light of Mark's sustained movement toward suffering, service, and the cross." },
    { id: 'costly-discipleship', title: 'Costly discipleship', instruction: "Name what following Jesus requires here and how the disciples' failures instruct rather than flatter the reader." },
  ],
  startingPoints: [
    { reference: 'Mark 1:1-15', question: 'How does Mark announce the story he is about to tell?', role: 'Beginning and kingdom' },
    { reference: 'Mark 4:35-41', question: 'How do authority, fear, and identity meet in this scene?', role: 'Authority and recognition' },
    { reference: 'Mark 8:22-38', question: 'Why does recognition of Jesus lead immediately to the cross?', role: 'Sight, Messiah, and discipleship' },
    { reference: 'Mark 15:33-39', question: 'What becomes visible about Jesus at the crucifixion?', role: 'Cross and confession' },
  ],
  safeguards: sharedSafeguards('Mark'),
};
