import { create } from 'zustand'

type Address = string
export interface Course {
  id: string
  name: string
  description: string
  ownerAddress: Address
  profiles: Address[]
}

export interface Society {
  id: string
  name: string
  description: string
  ownerAddress: Address
  courses: Course[]
  profiles?: Profile[]
}

export interface Profile {
  id: Address
  name: string
  description: string
  address: Address
}

interface MainState {
  isLoading: boolean
  profiles: Record<string, Profile>
  societies: Record<string, Society>
}

const initialState: MainState = {
  isLoading: false,
  profiles: {},
  societies: {}
}

interface MainStore {
  data: MainState

  setIsLoading: (isLoading: boolean) => void

  addProfile: (profile: Profile) => void
  updateProfile: (profileId: Address, profile: Profile) => void
  // deleteProfile: (profileId: Address) => void

  addSociety: (society: Society) => void
  updateSociety: (societyId: string, society: Society) => void

  addCourseToSociety: (societyId: string, course: Course) => void
  updateCourse: (societyId: string, courseId: string, course: Course) => void
}

export const useSocieties = create<MainStore>(set => ({
  data: initialState,
  setIsLoading: (isLoading: boolean) => {
    set(state => ({
      ...state,
      isLoading
    }))
  },
  addProfile: (profile: Profile) => {
    set(state => ({
      ...state,
      profiles: {
        ...state.data.profiles,
        [profile.id]: profile
      }
    }))
  },
  updateProfile: (profileId: Address, profile: Profile) => {
    set(state => ({
      ...state,
      profiles: {
        ...state.data.profiles,
        [profileId]: profile
      }
    }))
  },
  addSociety: (society: Society) => {
    set(state => ({
      ...state,
      societies: {
        ...state.data.societies,
        [society.id]: society
      }
    }))
  },
  updateSociety: (societyId: string, society: Society) => {
    set(state => ({
      ...state,
      societies: {
        ...state.data.societies,
        [societyId]: society
      }
    }))
  },
  updateCourse: (societyId: string, courseId: string, course: Course) => {
    set(state => {
      const society = state.data.societies[societyId]
      if (society === undefined) {
        throw new Error(`Society ${societyId} not found`)
      }
      const courses = society.courses.map(c =>
        c.id === courseId ? course : c
      )
      return {
        ...state,
        societies: {
          ...state.data.societies,
          [societyId]: {
            ...society,
            courses
          }
        }
      }
    })
  },
  addCourseToSociety: (societyId: string, course: Course) => {
    set(state => {
      const society = state.data.societies[societyId]
      if (society === undefined) {
        throw new Error(`Society ${societyId} not found`)
      }
      return {
        ...state,
        societies: {
          ...state.data.societies,
          [societyId]: {
            ...society,
            courses: [...society.courses, course]
          }
        }
      }
    })
  }
}))
