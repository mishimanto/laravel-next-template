import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // In production, this would call your Laravel API
    // For now, return mock response
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        token: 'mock_jwt_token',
        user: {
          id: 1,
          name: 'Test User',
          email: email,
          role: 'user'
        }
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Login failed',
      error: error.message
    }, { status: 500 });
  }
}