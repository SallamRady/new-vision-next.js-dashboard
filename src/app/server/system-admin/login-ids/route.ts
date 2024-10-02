import { NextResponse } from 'next/server'
import { LoginIDType } from '@/types/system-admin/login-ids'

// Mock data or replace this with actual database fetching logic
const mockData: LoginIDType[] = [
  {
    id: 1,
    name: 'البريد الألكتروني',
    jointCompanies: ['أبعاد الرؤية', 'أركان'],
    serviceProviders: [],
    usersNumber: 127,
    isActive: true
  },
  {
    id: 2,
    name: 'رقم الهوية',
    jointCompanies: ['النور الساطع'],
    serviceProviders: ['نفاذ'],
    usersNumber: 50,
    isActive: false
  },
  {
    id: 3,
    name: 'رقم الجوال',
    jointCompanies: ['عابر'],
    serviceProviders: ['Mora'],
    usersNumber: 85,
    isActive: false
  },
  {
    id: 4,
    name: 'أسم المستخدم',
    jointCompanies: [],
    serviceProviders: [],
    usersNumber: 0,
    isActive: false
  }
]

export async function GET() {
  return NextResponse.json(mockData)
}
