import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    
    // In production, this would call your Laravel API
    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: {
        token: 'mock_jwt_token',
        user: {
          id: 2,
          name: name,
          email: email,
          role: 'user'
        }
      }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Registration failed',
      error: error.message
    }, { status: 500 });
  }
}