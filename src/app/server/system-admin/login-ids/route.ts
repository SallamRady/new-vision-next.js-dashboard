'use server'
import { NextResponse } from 'next/server'
import { LoginIDType } from '@/types/system-admin/login-ids'
import axios from 'axios'
import { Api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'

export async function GET() {
  try {
    // ** fetch data from back-end
    const response = await axiosInstance.get<{ identifiers: LoginIDType[] }>(Api(`identifiers`))

    // ** Return the fetched data as JSON
    return NextResponse.json(response.data.identifiers)
  } catch (error) {
    console.log('Error:::', error)
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // ** Get the identifier id from the request body
    const { id }: { id: number } = await request.json()

    // ** Send the POST request to the back-end API
    const response = await axiosInstance.post(Api(`active-inactive-identifier`), {
      identifier_id: id
    })

    // ** Return the fetched data as JSON
    return NextResponse.json('success')
  } catch (error) {
    console.log('Error:::', error)
    return NextResponse.json({ message: 'Failed to switch identifier status' }, { status: 500 })
  }
}
