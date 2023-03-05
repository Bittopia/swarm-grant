import { create } from 'zustand'

export interface Society {
  name: string
  description: string
}

export type SocietiesState = Record<string, Society>

const initialState: SocietiesState = {
  mathematics: {
    name: 'Mathematics DAS',
    description:
      'the study of numbers, shapes, and patterns, and their relationships.'
  },
  chemistry: {
    name: 'Chemistry DAS',
    description:
      'the study of the composition, structure, properties, and reactions of matter.'
  },
  biology: {
    name: 'Biology DAS',
    description:
      'the study of living organisms and their interactions with each other and the environment.'
  },
  'computer-science': {
    name: 'Computer Science DAS',
    description:
      'the study of computing, programming, and computational systems.'
  },
  psychology: {
    name: 'Psychology DAS',
    description: 'the study of the mind and behavior.'
  },
  sociology: {
    name: 'Sociology DAS',
    description:
      'the study of human social behavior and its origins, development, organization, and institutions.'
  },
  anthropology: {
    name: 'Anthropology DAS',
    description:
      'the study of human societies and cultures and their development.'
  },
  economics: {
    name: 'Economics DAS',
    description:
      'the study of how individuals, organizations, and societies allocate scarce resources.'
  },
  philosophy: {
    name: 'Philosophy DAS',
    description:
      'the study of the fundamental nature of knowledge, reality, and existence.'
  },
  history: {
    name: 'History DAS',
    description: 'the study of the past and its significance.'
  },
  linguistics: {
    name: 'Linguistics DAS',
    description:
      'the study of language, including its structure, use, and evolution.'
  },
  'political-science': {
    name: 'Political Science DAS',
    description: 'the study of government, politics, and public policies.'
  },
  'environmental-science': {
    name: 'Environmental Science DAS',
    description:
      'the study of the natural environment and how humans interact with it.'
  }
}

interface SocietiesStore {
  societies: SocietiesState
  setSocieties: (societies: SocietiesState) => void
  addSociety: ({ slug, society }: { slug: string, society: Society }) => void
}

export const useSocieties = create<SocietiesStore>(set => ({
  societies: initialState,
  setSocieties: (societies: SocietiesState) => {
    set({ societies })
  },
  addSociety: ({ slug, society }: { slug: string, society: Society }) => {
    set(state => ({
      ...state,
      [slug]: society
    }))
  }
}))
