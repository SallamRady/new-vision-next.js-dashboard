'use client'

import useCorrespondenceSettings from '@/hooks/useCorrespondenceSettings'
import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

export const CorrespondenceSettingsCxt = createContext<CorrespondenceSettingsType>({})

export const CorrespondenceSettingsCxtProvider = (props: PropsType) => {
  // ** declare and define component state and variables
  const { children } = props
  const { data: correspondenceData, isLoading, error } = useCorrespondenceSettings()

  // ** handle side effects

  // ** declare and define component helper methods

  // ** return component ui
  return <CorrespondenceSettingsCxt.Provider value={{}}>{children}</CorrespondenceSettingsCxt.Provider>
}

export type CorrespondenceSettingsType = {}

type PropsType = {
  children: ReactNode
}
