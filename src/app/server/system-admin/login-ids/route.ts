'use server'
import { NextResponse } from 'next/server'
import { LoginIDType } from '@/types/system-admin/login-ids'
import axios from 'axios'
import { Api } from '@/Constants/Api'

export async function GET() {
  try {
    // ** fetch data from back-end
    const response = await axios.get<{ identifiers: LoginIDType[] }>(Api(`identifiers`))

    // ** Return the fetched data as JSON
    return NextResponse.json(response.data.identifiers)
  } catch (error) {
    console.log('Error:::', error)
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 })
  }
}
