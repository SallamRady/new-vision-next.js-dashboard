'use server'
import { NextResponse } from 'next/server'

import type { LoginIDType } from '@/types/system-admin/login-ids'

import axiosInstance from '@/libs/axiosConfig'
import { api } from '@/Constants/Api'

export async function GET() {
  try {
    // ** fetch data from back-end
    const response = await axiosInstance.get<{ identifiers: LoginIDType[] }>(api`identifiers`)

    // ** Return the fetched data as JSON
    return NextResponse.json(response.data.identifiers)
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // ** Get the identifier id from the request body
    const { id }: { id: number } = await request.json()

    // ** Send the POST request to the back-end API
    await axiosInstance.post(api`active-inactive-identifier`, {
      identifier_id: id
    })

    // ** Return the fetched data as JSON
    return NextResponse.json('success')
  } catch (error) {
    return NextResponse.json({ message: 'Failed to switch identifier status' }, { status: 500 })
  }
}
