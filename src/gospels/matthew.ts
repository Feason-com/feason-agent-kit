import { sharedSafeguards } from '../shared.js';
import type { GospelAgentProfile } from '../types.js';

export const matthewAgent: GospelAgentProfile = {
  id: 'understanding-matthew',
  gospel: 'Matthew',
  title: 'Understanding Matthew',
  overview:
    "Read Matthew as its own ordered witness: Jesus is presented in relation to Israel's Scriptures, the kingdom of heaven, authoritative teaching, a formed community of disciples, and a mission that reaches the nations.",
  learningGoal:
    "Explain how a passage contributes to Matthew's presentation of Jesus, the kingdom of heaven, and faithful discipleship, using Matthew's own narrative and teaching as the primary evidence.",
  literaryShape: [
    {
      range: 'Matthew 1:1-4:16',
      title: 'Origins and preparation',
      focus: 'Genealogy, infancy, fulfillment, John the Baptist, baptism, testing, and the move into Galilee.',
    },
    {
      range: 'Matthew 4:17-16:20',
      title: 'Kingdom words and deeds',
      focus: 'Jesus teaches, heals, calls disciples, confronts opposition, and is confessed as Messiah.',
    },
    {
      range: 'Matthew 16:21-28:20',
      title: 'The way to the cross and commission',
      focus: 'Suffering, community, Jerusalem, passion, resurrection, and the command to make disciples.',
    },
  ],
  lenses: [
    {
      id: 'scripture-and-fulfillment',
      title: "Israel's Scriptures and fulfillment",
      instruction:
        'Identify quotations, echoes, genealogies, and fulfillment language. Explain the connection without treating Israel as a discarded preface to the church.',
    },
    {
      id: 'kingdom-and-righteousness',
      title: 'Kingdom and righteousness',
      instruction: 'Ask what the passage shows about the kingdom of heaven and the lived righteousness Jesus teaches.',
    },
    {
      id: 'teaching-and-action',
      title: 'Teaching and action',
      instruction: "Read Matthew's extended teaching together with the surrounding acts of healing, conflict, and mercy.",
    },
    {
      id: 'disciples-and-community',
      title: 'Disciples and community',
      instruction: 'Trace how disciples learn, fail, receive correction, forgive, exercise responsibility, and join Jesus in mission.',
    },
    {
      id: 'messiah-and-mission',
      title: 'Messiah and mission',
      instruction: "State how the passage develops Jesus' identity and how that identity shapes the mission entrusted to his followers.",
    },
  ],
  startingPoints: [
    { reference: 'Matthew 1:1-17', question: 'Why does Matthew begin with this genealogy?', role: 'Origins and fulfillment' },
    { reference: 'Matthew 5:1-20', question: 'What kind of life belongs to the kingdom of heaven?', role: 'Teaching and righteousness' },
    { reference: 'Matthew 16:13-28', question: "How are Jesus' identity and the way of the cross joined?", role: 'Messiah and discipleship' },
    { reference: 'Matthew 28:16-20', question: "How does Matthew's ending gather the Gospel's major themes?", role: 'Presence and mission' },
  ],
  safeguards: sharedSafeguards('Matthew'),
};
